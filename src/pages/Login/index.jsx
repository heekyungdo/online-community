import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../store/thunkFunctions";
import { useDispatch } from "react-redux";
import styled from "styled-components";

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
      <LoginWrapper>
        <h3>로그인</h3>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <LoginInputBox>
            <label htmlFor="email"></label>
            <LoginInput
              type="email"
              id="email"
              placeholder="이메일"
              {...register("email", validationEmail)}
            />
            {errors?.email && (
              <div>
                <ValidationError>{errors.email.message}</ValidationError>
              </div>
            )}
          </LoginInputBox>
          <LoginInputBox>
            <label htmlFor="password"></label>
            <LoginInput
              type="password"
              id="password"
              placeholder="비밀번호"
              {...register("password", validationPassword)}
            />
            {errors?.password && (
              <div>
                <ValidationError>{errors.password.message}</ValidationError>
              </div>
            )}
          </LoginInputBox>
          <BtnWrapper>
            <button type="submit">로그인</button>
          </BtnWrapper>
          <GoRegisterWrapper>
            회원이 아니라면? <a href="/register">회원가입</a>
          </GoRegisterWrapper>
        </LoginForm>
      </LoginWrapper>
    </section>
  );
};

export default Login

const LoginWrapper = styled.div`
  text-align: center;
  border: 1px solid lightgray;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 3px 2px 5px 3px lightgray;
  border-radius: 5px;
  padding: 25px 0;
`

const LoginForm = styled.form`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`

const LoginInputBox = styled.div`
  margin: 30px 0;
  width: 100%;
`

const LoginInput = styled.input`
  border-radius: 4px;
  background-color: #f8f8f8;
  border: none;
  padding: 15px 0 15px 15px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #d2d2d2;
  }
`

const ValidationError = styled.span`
  color: #c63d2f;
  font-size: 13px;
  display: flex;
  margin: 5px 0 0 10px;
`

const BtnWrapper = styled.div`
  margin-top: 40px;

  button {
    background-color: #bca37f;
    color: white;
    cursor: pointer;
    padding: 15px;
    border: 1px solid #bca37f;
    border-radius: 4px;
    width: 100%;
    font-size: 15px;

    &:hover {
      opacity: 0.8;
    }
  }
`

const GoRegisterWrapper = styled.p`
  margin-top: 15px;
  font-size: 13px;

  a {
    color: black;
    opacity: 0.5;
  }
`
