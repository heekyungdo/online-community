import React from "react";
import styles from "./login.module.css";

const Login = () => {
  return (
    <section>
      <div className={styles.login}>
        <h3>로그인</h3>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">아이디</label> */}
            <input type="text" placeholder="아이디" />
          </div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">비밀번호</label> */}
            <input type="text" placeholder="비밀번호" />
          </div>
          <div className={styles.button}>
            <button type="submit">로그인</button>
          </div>
          <p className={styles.goRegister}>
            회원이 아니라면? <a href="/register">회원가입</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
