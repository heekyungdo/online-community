import React from "react";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import { loginUser } from "../../store/thunkFunctions";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

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

    dispatch(loginUser(body));

    reset();
  };

  return (
    <section>
      <div className={styles.login}>
        <h3>로그인</h3>
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
