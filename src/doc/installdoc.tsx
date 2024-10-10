import markdownit from "markdown-it";

import { StringToDomComponent } from "../doc.tsx";

const md = markdownit();

const text = await fetch("./markdowns/Install.md");

const markdown = await text.text();
const result = md.render(markdown);

export default function () {
  return <StringToDomComponent htmlString={result} />;
}
