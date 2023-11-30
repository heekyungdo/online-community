import React from "react";
import NavItems from "./Section/NavItems";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  color: #bf4f74;
`;

const Logo = styled.p`
  font-size: 1.5em;
`;

const Header = () => {
  return (
    <header>
      <Wrapper>
        <div>
          {" "}
          <Logo>
            <Link to="/">GOSSIP</Link>
          </Logo>
        </div>
        <div>
          <NavItems />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
