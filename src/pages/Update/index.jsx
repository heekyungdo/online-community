import React, { useState } from "react";
import Notice from "../../components/Notice";
import styled from "styled-components";
import ImageUpdate from "../../components/ImageUpdate";
import { useSelector } from "react-redux";

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
  // color: white;
  border: 1px solid #add8e6;
  border-radius: 4px;
  cursor: pointer;
`;

const Update = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    images: [],
  });
  const [imgUrl, setImgUrl] = useState("");

  const userInfo = useSelector((state) => state.user?.userData);

  let today = new Date();
  let today_ts = Date.parse(today);
  let yesterday_ts = today_ts - 60 * 60 * 24 * 1000;
  let yesterday = new Date(yesterday_ts);

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let past = `${year}/${month < 10 ? "0" + month : month}/${
    date < 10 ? "0" + date : date
  }`;
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let time = `${hour < 10 ? "0" + hour : hour}/${min < 10 ? "0" + min : min}/${
    sec < 10 ? "0" + sec : sec
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      writer: userInfo.name,
      date: yesterday !== today ? past : time,
      ...post,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImages = (newImages) => {
    setPost((prevState) => ({
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
          <label htmlFor="des"></label>
          <TextArea
            id="des"
            name="des"
            value={post.description}
            onChange={handleChange}
          ></TextArea>
        </div>
        <ImageUpdate
          images={post.images}
          onImageChange={handleImages}
          imageUrl={setImgUrl}
        />
      </form>
      <ButtonGroup>
        <FirstBtn>취소</FirstBtn>
        <SecondBtn>작성완료</SecondBtn>
      </ButtonGroup>
    </div>
  );
};

export default Update;
