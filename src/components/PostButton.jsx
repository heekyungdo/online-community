import React from 'react'
import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid #ccc;

  button {
    padding: 10px 30px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const CancleBtn = styled.button`
  background: fafafa;
  color: #606060;
  border: 1px solid #b1b1;
`;
const UploadBtn = styled.button`
  background: #add8e6;
  border: 1px solid #add8e6;
`;

const PostButton = () => {
  return (
    <>
      <ButtonGroup>
          <CancleBtn>취소</CancleBtn>
          <UploadBtn type="submit">작성완료</UploadBtn>
        </ButtonGroup>
        </>
  )
}

export default PostButton