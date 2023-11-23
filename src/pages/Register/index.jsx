import React from "react";
import styles from "./register.module.css";

const Register = () => {
  return (
    <section>
      <div className={styles.register}>
        <h3>회원가입</h3>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">아이디</label> */}
            <input type="text" placeholder="아이디" />
          </div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">이름</label> */}
            <input type="text" placeholder="이름" />
          </div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">비밀번호</label> */}
            <input type="text" placeholder="비밀번호" />
          </div>
          <div className={styles.button}>
            <button type="submit">회원가입</button>
          </div>
          <p className={styles.goLogin}>
            아이디가 있다면? <a href="/login">로그인</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
