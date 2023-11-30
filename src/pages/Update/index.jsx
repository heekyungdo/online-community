import React from "react";
import Notice from "../../components/Notice";
import styled from "styled-components";
import ImageUpdate from "../../components/ImageUpdate";

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
  return (
    <div>
      <Notice />
      <form>
        <TitleWrapper>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력해주세요"
          />
        </TitleWrapper>
        <div>
          <label htmlFor="des"></label>
          <TextArea id="des" name="des"></TextArea>
        </div>
        <ImageUpdate />
      </form>
      <ButtonGroup>
        <FirstBtn>취소</FirstBtn>
        <SecondBtn>작성완료</SecondBtn>
      </ButtonGroup>
    </div>
  );
};

export default Update;
