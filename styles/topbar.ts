import { css } from "hono/css";

const TopBar = css`
  overflow: hidden;
  background-color: #333;
  opacity: 0.8;
  & a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  & a:hover {
    background-color: #ddd;
    color: black;
  }
`;

export default TopBar;
