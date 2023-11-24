import React, { useState } from "react";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validationId = {
    required: "필수 필드입니다.",
  };

  const validationName = {
    required: "필수 필드입니다.",
  };

  const validationPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 7,
      message: "7자 이상 입력해주세요",
    },
  };

  const onSubmit = () => {
    reset();
  };

  return (
    <section>
      <div className={styles.register}>
        <h3>회원가입</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="id"></label>
            <input
              type="text"
              id="id"
              placeholder="아이디"
              {...register("id", validationId)}
            />
            {errors?.id && (
              <div>
                <span className={styles.validationError}>
                  {errors.id.message}
                </span>
              </div>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              placeholder="이름"
              {...register("name", validationName)}
            />
            {errors?.name && (
              <div>
                <span className={styles.validationError}>
                  {errors.name.message}
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
