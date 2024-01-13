import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/thunkFunctions";
import styled from "styled-components";

const MenuWrapper = styled.ul`
  display: flex;
  align-items:center;
`

const UserName = styled.p`
margin-right:10px;
border-top: 3px solid lightblue;
border-bottom: 3px solid lightblue;
padding:3px;
`
const MenuList = styled.li`
  list-style: none;
  margin-left:15px;
  &:first-child { 
    margin-left: none;
  }
`
const Menu = styled.p`
  text-decoration: none;
`

const NavItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user?.isAuth);
const user = useSelector((state)=>state.user?.userData)

  const routes = [
    { to: "/", name: "홈", auth: isAuth },
    { to: "/login", name: "로그인", auth: false },
    { to: "/register", name: "회원가입", auth: false },
    { to: "/community", name: "커뮤니티", auth: isAuth },
    { to: "", name: "로그아웃", auth: true },
  ];

  const handleLogout = async () => {
   await dispatch(logoutUser());
   navigate('/')
  };

  return (
    <>
      <MenuWrapper>
        {isAuth ? <UserName>{user?.name}</UserName>
        :null}
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
    </>
  );
};

export default NavItems;
