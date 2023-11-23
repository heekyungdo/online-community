import React from "react";
import styles from "./login.module.css";

const Login = () => {
  return (
    <section>
      <div>
        <h3>로그인</h3>
        <form>
          <div>
            <label htmlFor="">아이디</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">비밀번호</label>
            <input type="text" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
