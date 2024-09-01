import styled from "@nobody/styled-components-deno";

const SideBar = styled.li<{ isOpen?: boolean }>`
  backdrop-filter: blur(10px);
  width: 200px;
  height: 100%;
  background-color: #333330aa;
  position: fixed;
  top: 0;
  z-index: 3;
  visibility: hidden;
  list-style-type: none;
  display: flex;
  /* move flex-items in column */
  flex-direction: column;

  left: ${(props) => props.isOpen ? "0" : "-250px"} ;
  transition: left 0.3s ease-in-out;

  @media screen and (max-width:900px) {
    visibility: visible
  }
  & button {
    background-color: transparent;
    border-width: 0;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  & button:hover {
    background-color: #ddd;
    color: black;
  }
  & a {
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  & a.bottom {
    margin-top: auto;
  }
  & a:hover {
    background-color: #ddd;
    color: black;
  }
`;

const MenuButton = styled.button<{ isOpen?: boolean }>`
  position: fixed;
  top: 20px;
  left: ${(props) => props.isOpen ? "210px" : "20px"} ;
  background-color: white;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  visibility: hidden;
  background-image: url("static/menu.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  transition: left 0.3s ease-in-out;

  & hover {
    background-color: #0056b3;
  }

  @media screen and (max-width:900px) {
    visibility: visible;
  }

`;

export { MenuButton, SideBar };
