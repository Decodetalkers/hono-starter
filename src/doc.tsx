import { render } from "preact";

import InstallDoc from "./doc/installdoc.tsx";
import TitleBar from "~/components/titlebar.tsx";
import styled from "@nobody/styled-components-deno";

const MarkdownArea = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  overflow-wrap: break-word;
  padding-left: 150px;
  padding-right: 5%;
  padding-top: 10px;
`;

const mount = document.getElementById("mount");

const StringToDomComponent = ({ htmlString }: { htmlString: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};
function Header() {
  return (
    <TitleBar>
      <a href="#main">Neocmakelsp</a>
      <a href="#feature">Features</a>
      <a href="#install">Install</a>
      <a class="right" href="https://github.com/neocmakelsp/neocmakelsp">
        Github
      </a>
    </TitleBar>
  );
}
function Doc() {
  return (
    <MarkdownArea>
      <InstallDoc />
    </MarkdownArea>
  );
}

if (mount) {
  render(<Doc />, mount);
}

const header = document.getElementById("header");

if (header) {
  render(<Header />, header);
}

export { StringToDomComponent };
