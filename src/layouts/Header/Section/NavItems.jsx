import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/thunkFunctions";
import styled from "styled-components";

const MenuWrapper = styled.ul`
  display: flex;
`;

const MenuList = styled.li`
  list-style: none;
`;
const Menu = styled.p`
  text-decoration: none;
`;

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
      <MenuWrapper>
        {routes.map((route) => {
          if (isAuth !== route.auth) return null;
          if (route.name === "로그아웃") {
            return (
              <MenuList key={route.name}>
                <Menu>
                  {" "}
                  <Link onClick={handleLogout}>{route.name}</Link>
                </Menu>
              </MenuList>
            );
          } else {
            return (
              <MenuList key={route.name}>
                <Menu>
                  {" "}
                  <Link to={route.to}>{route.name}</Link>
                </Menu>
              </MenuList>
            );
          }
        })}
      </MenuWrapper>
    </div>
  );
};

export default NavItems;
