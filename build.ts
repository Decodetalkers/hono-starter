import { serveDir } from "@std/http";
import { delay } from "@std/async";

import { parseArgs } from "@std/cli";

import { GenWebsite, Route, WebPageUnit } from "@nobody/tananoni";

interface BuildMode {
  debug?: boolean;
  release?: boolean;
}

const input_args = parseArgs(Deno.args) as BuildMode;

const release_mode = input_args.release;

let route_path = "debug";

if (release_mode) {
  route_path = "release";
}

const base_asserts = { path: "static/asserts", alias: "static" };
const css_asserts = { path: "static/styles" };

/**
 * In-memory store of open WebSockets for
 * triggering browser refresh.
 */
const sockets: Set<WebSocket> = new Set();

/**
 * Upgrade a request connection to a WebSocket if
 * the url ends with "/refresh"
 */
function refreshMiddleware(req: Request): Response | null {
  if (req.url.endsWith("/refresh")) {
    const { response, socket } = Deno.upgradeWebSocket(req);

    // Add the new socket to our in-memory store
    // of WebSockets.
    sockets.add(socket);

    // Remove the socket from our in-memory store
    // when the socket closes.
    socket.onclose = () => {
      sockets.delete(socket);
    };

    return response;
  }

  return null;
}

const scripts = ["main.js"];

if (!release_mode) {
  scripts.push("./refresh/client.js");
}

let route = new Route(route_path)
  .append_assert(base_asserts)
  .append_assert(css_asserts)
  .append_webpage(
    new WebPageUnit(
      "./src/main.tsx",
      [
        { type: "main", id: "mount" },
        { type: "header", id: "header" },
      ],
      scripts,
    )
      .with_title("neocmakelsp")
      .with_linkInfos([
        { type: "stylesheet", href: "styles/global.css" },
        { type: "icon", href: "static/favicon.ico" },
      ]),
  );
if (!release_mode) {
  route = route.append_assert({ path: "./static/debug/refresh" });
}

const webgen = new GenWebsite()
  .withLogLevel("info")
  .withImportSource("npm:preact");

await webgen.generate_website(route);

async function watch() {
  let during_wait = false;

  const watcher = Deno.watchFs("./");

  for await (const event of watcher) {
    if (during_wait) {
      continue;
    }
    if (["any", "access"].includes(event.kind)) {
      continue;
    }

    let should_fresh = false;

    for (const pa of event.paths) {
      if (
        pa.includes("./dist") || pa.includes("./build.ts") ||
        (pa.endsWith(".git") || pa.includes(".git/")) ||
        (!pa.endsWith("ts") && !pa.endsWith("tsx") && !pa.endsWith("css") &&
          !pa.endsWith("js") && !pa.endsWith("jsx"))
      ) {
        continue;
      }
      should_fresh = true;
      break;
    }
    if (!should_fresh) {
      continue;
    }

    await webgen.generate_website(route);
    sockets.forEach((socket) => {
      socket.send("refresh");
    });
    during_wait = true;
    delay(1000).then(() => during_wait = false);
  }
}

if (release_mode) {
  Deno.exit(0);
}

const fsRoot = `${Deno.cwd()}/dist/debug`;
Deno.serve({ hostname: "localhost", port: 8000 }, async (req) => {
  const res = refreshMiddleware(req);

  if (res) {
    return res;
  }

  return await serveDir(req, { fsRoot });
});

await watch();
