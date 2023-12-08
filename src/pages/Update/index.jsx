import React, { useState } from "react";
import Notice from "../../components/Notice";
import styled from "styled-components";
import ImageUpdate from "../../components/ImageUpdate";
import { useSelector } from "react-redux";
import app from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const TitleWrapper = styled.div`
  margin: 30px 0 10px;
  input {
    padding: 7px 0;
    width: 100%;
    box-sizing: border-box;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  height: 50vh;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid #ccc;

  button {
    padding: 10px 30px;
  }
`;

const FirstBtn = styled.button`
  background: fafafa;
  color: #606060;
  border: 1px solid #b1b1;
  border-radius: 4px;
  cursor: pointer;
`;
const SecondBtn = styled.button`
  background: #add8e6;
  border: 1px solid #add8e6;
  border-radius: 4px;
  cursor: pointer;
`;

const Update = () => {
  const fireStore = getFirestore(app);
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    images: [],
  });

  const userInfo = useSelector((state) => state.user?.userData);

  // let today = new Date();
  // let today_ts = Date.parse(today);
  // let yesterday_ts = today_ts - 60 * 60 * 24 * 1000;
  // let yesterday = new Date(yesterday_ts);

  // let year = today.getFullYear();
  // let month = today.getMonth() + 1;
  // let date = today.getDate();
  // let past = `${year}/${month < 10 ? "0" + month : month}/${
  //   date < 10 ? "0" + date : date
  // }`;
  // let hour = today.getHours() % 12 || 12;
  // let min = today.getMinutes();
  // let sec = today.getSeconds();
  // let time = `${hour < 10 ? "0" + hour : hour}/${min < 10 ? "0" + min : min}/${
  //   sec < 10 ? "0" + sec : sec
  // }`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postInfo = {
      writer: userInfo.name,
      date: Date.parse(new Date()),
      ...post,
    };

    // fireStore에 db 저장
    const valRef = collection(fireStore, "post");
    await addDoc(valRef, postInfo);

    setPost({
      title: "",
      description: "",
      images: [],
    });
    // navigate("/community");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImages = async (newImages) => {
    await setPost((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  return (
    <div>
      <Notice />
      <form onSubmit={handleSubmit}>
        <TitleWrapper>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력해주세요"
            value={post.title}
            onChange={handleChange}
          />
        </TitleWrapper>
        <div>
          <label htmlFor="description"></label>
          <TextArea
            id="description"
            name="description"
            value={post.description}
            onChange={handleChange}
          />
        </div>
        <ImageUpdate images={post.images} onImageChange={handleImages} />
        <ButtonGroup>
          <FirstBtn>취소</FirstBtn>
          <SecondBtn type="submit">작성완료</SecondBtn>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default Update;
