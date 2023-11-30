import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav_items.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/thunkFunctions";

const NavItems = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);

  const routes = [
    { to: "/login", name: "로그인", auth: false },
    { to: "/register", name: "회원가입", auth: false },
    { to: "/community", name: "커뮤니티", auth: false },
    { to: "", name: "로그아웃", auth: true },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <ul className={styles.ul}>
        {routes.map((route) => {
          if (isAuth !== route.auth) return null;
          if (route.name === "로그아웃") {
            return (
              <li key={route.name} className={styles.navItems}>
                <Link onClick={handleLogout} className={styles.navItem}>
                  {route.name}
                </Link>
              </li>
            );
          } else {
            return (
              <li key={route.name} className={styles.navItems}>
                <Link to={route.to} className={styles.navItem}>
                  {route.name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default NavItems;
