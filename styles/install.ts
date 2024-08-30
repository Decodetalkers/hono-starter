import styled from "@nobody/styled-components-deno";

const InstallMainCSS = styled.section`
  display: flex;
  flex-direction: column;

  background-color: #071521ff;
  width: 100%;

  & h1 {
    color: white
  }
  & p {
    color: white
  }
`;

const InstallTitleCSS = styled.h1`
  text-align: center;
  font-size: 3em;
  font-weight: 500
`;

const InstallBodyCSS = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  font-size: 30px;
  margin-bottom: 300px;
`;

export { InstallBodyCSS, InstallMainCSS, InstallTitleCSS };
