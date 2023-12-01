import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Community from "./pages/Community";
import Detail from "./pages/Detail";
import Update from "./pages/Update";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sessionCheck } from "./store/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./utils/firebase";
import styled from "styled-components";
import NotAuthRoutes from "./components/NotAuthRoutes";

const auth = getAuth(app);

const Contents = styled.main`
  max-width: 1420px;
  padding: 70px 50px;
  margin: 0 auto;
`;

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
      <Contents>
        <Outlet />
      </Contents>
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
            name: user.name,
            isAuth: true,
          })
        );
      } else {
        dispatch(
          sessionCheck({
            id: "",
            email: "",
            name: "",
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
          <Route path="/board/update" element={<Update />} />
          <Route element={<NotAuthRoutes isAuth={isAuth} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/community" element={<Community isAuth={isAuth} />} />
          <Route path="/board/:id" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
