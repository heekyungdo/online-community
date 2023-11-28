import React, { useState } from "react";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";

const Register = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validationEmail = {
    required: "필수 필드입니다.",
  };

  const validationPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 7,
      message: "7자 이상 입력해주세요",
    },
  };

  const onSubmit = ({ email, password }) => {
    const body = {
      email,
      password,
    };

    dispatch(registerUser(body));

    reset();
  };

  return (
    <section>
      <div className={styles.register}>
        <h3>회원가입</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              placeholder="이메일"
              {...register("email", validationEmail)}
            />
            {errors?.email && (
              <div>
                <span className={styles.validationError}>
                  {errors.email.message}
                </span>
              </div>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              {...register("password", validationPassword)}
            />
            {errors?.password && (
              <div>
                <span className={styles.validationError}>
                  {errors.password.message}
                </span>
              </div>
            )}
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
