import React from "react";
import NavItems from "./Section/NavItems";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <div>
          {" "}
          <Link to="/">GOSSIP</Link>
        </div>
        <div>
          <NavItems />
        </div>
      </div>
    </header>
  );
};

export default Header;
