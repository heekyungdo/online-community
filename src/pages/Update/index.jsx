import React, { useState } from "react";
import Notice from "../../components/Notice";
import styled from "styled-components";
import ImageUpdate from "../../components/ImageUpdate";
import { useSelector } from "react-redux";
import app from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const fireStore = getFirestore(app);
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    images: [],
  });

  const userInfo = useSelector((state) => state.user?.userData);
  const valRef = collection(fireStore, "post");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postInfo = {
      writer: userInfo.name,
      date: new Date().toISOString(),
      ...post,
    };

    // fireStore에 db 저장
    await addDoc(valRef, postInfo);

    await setPost({
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
