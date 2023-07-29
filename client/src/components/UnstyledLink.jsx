import { Link } from "react-router-dom";

export default function UnstyledLink(props) {
  return (
    <Link {...props} style={{ textDecoration: "none", color: "inherit" }} />
  );
}
