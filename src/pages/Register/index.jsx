import React from "react";
import styles from "./register.module.css";

const Register = () => {
  return (
    <section>
      <div>
        <h3>회원가입</h3>
        <form>
          <div>
            <label htmlFor="">아이디</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">이름</label>
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

export default Register;
