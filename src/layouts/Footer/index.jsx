import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  border-top: 1px solid lightgray;
  text-align: center;
  background: white;
  padding: 20px 0;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>Copyright © Gossip All Rights reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;
