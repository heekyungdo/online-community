import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid lightgray;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>Copyright © Gossip pan All Rights reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;
