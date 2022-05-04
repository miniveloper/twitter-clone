import { Link } from "react-router-dom";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  & li {
    list-style: none;
  }
`;

const Name = styled.span`
  margin-top: 10px;
`;

const Nav = ({ userObj }) => (
  <nav>
    <NavList>
      <li>
        <Link to="/" style={{ marginRight: 10 }}>
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <Name>
            {userObj.displayName
              ? `${userObj.displayName}'s Profile`
              : "Profile"}
          </Name>
        </Link>
      </li>
    </NavList>
  </nav>
);

export default Nav;
