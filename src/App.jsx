import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/Community";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authUser } from "./store/thunkFunctions";

function Layout() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Header />
      <main className="contents">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isAuth = useSelector((state) => state.user?.isAuth);

  useEffect(() => {
    console.log(isAuth);
    if (isAuth) {
      dispatch(authUser());
    }
  }, [dispatch, pathname, isAuth]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
