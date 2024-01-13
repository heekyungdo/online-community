import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";
import styled from "styled-components";

const RegisterWrapper = styled.div`
  text-align: center;
  border: 1px solid lightgray;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 3px 2px 5px 3px lightgray;
  border-radius: 5px;
  padding: 25px 0;
`

const RegisterForm = styled.form`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`

const RegisterInputBox = styled.div`
  margin: 30px 0;
  width: 100%;
`

const RegisterInput = styled.input`
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

const GoLoginWrapper = styled.p`
  margin-top: 15px;
  font-size: 13px;

  a {
    color: black;
    opacity: 0.5;
  }
`

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

  const onSubmit = ({ email, name, password }) => {
    const body = {
      email,
      password,
      name,
    };

    dispatch(registerUser(body));

    reset();
  };

  return (
    <section>
      <RegisterWrapper>
        <h3>회원가입</h3>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <RegisterInputBox>
            <label htmlFor="email"></label>
            <RegisterInput
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
          </RegisterInputBox>
          <RegisterInputBox>
            <label htmlFor="name"></label>
            <RegisterInput
              type="text"
              id="name"
              placeholder="이름"
              {...register("name", validationName)}
            />
            {errors?.name && (
              <div>
                <ValidationError>{errors.name.message}</ValidationError>
              </div>
            )}
          </RegisterInputBox>
          <RegisterInputBox>
            <label htmlFor="password"></label>
            <RegisterInput
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
          </RegisterInputBox>
          <BtnWrapper>
            <button type="submit">회원가입</button>
          </BtnWrapper>
          <GoLoginWrapper>
            아이디가 있다면? <a href="/login">로그인</a>
          </GoLoginWrapper>
        </RegisterForm>
      </RegisterWrapper>
    </section>
  );
};

export default Register;
