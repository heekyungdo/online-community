import React from "react";
import NavItems from "./Section/NavItems";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TopHeader = styled.header`
padding:10px 30px;
border-bottom:1px solid lightgray;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.p`
  font-size: 1.7em;
`;

const Header = () => {
  return (
    <TopHeader>
      <Wrapper>
        <div>
          <Logo>
            <Link to="/">GOSSIP</Link>
          </Logo>
        </div>
        <div>
          <NavItems />
        </div>
      </Wrapper>
    </TopHeader>
  );
};

export default Header;
