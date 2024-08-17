import { delay } from "@std/async";

function start_server() {
  return new Deno.Command(Deno.execPath(), {
    args: ["run", "--allow-net", "--allow-env", "--allow-read", "main.tsx"],
    stdout: "inherit",
  });
}

const watcher = Deno.watchFs("./");

let command = start_server();

let child = command.spawn();
for await (const _event of watcher) {
  try {
    child.kill("SIGINT");
  } catch (_e) {
    console.log("process already killed");
  }
  await delay(100);
  command = start_server();
  child = command.spawn();
}
watcher.close();
