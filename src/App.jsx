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
import { sessionCheck } from "./store/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./utils/firebase";

const auth = getAuth(app);

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인이 되어 있으면 로그인되어 있는 user정보 담기.
        dispatch(
          sessionCheck({
            id: user.uid,
            email: user.email,
            isAuth: true,
          })
        );
      } else {
        dispatch(
          sessionCheck({
            id: "",
            email: "",
            isAuth: false,
          })
        );
      }
    });
  }, [isAuth, pathname, dispatch]);

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
