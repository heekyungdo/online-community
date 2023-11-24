import React from "react";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validationId = {
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
      <div className={styles.login}>
        <h3>로그인</h3>
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
