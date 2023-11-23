import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav_items.module.css";

const NavItems = () => {
  const routes = [
    { to: "/login", name: "로그인", auth: false },
    { to: "/register", name: "회원가입", auth: false },
    { to: "/community", name: "커뮤니티", auth: true },
    { to: "", name: "로그아웃", auth: true },
  ];

  return (
    <div>
      <ul className={styles.ul}>
        {routes.map((route) => {
          return (
            <li key={route.name} className={styles.navItems}>
              <Link className={styles.navItem}>{route.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavItems;
