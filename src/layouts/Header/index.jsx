import React from "react";
import NavItems from "./Section/NavItems";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <div>Gossip pan</div>
        <div>
          <NavItems />
        </div>
      </div>
    </header>
  );
};

export default Header;
