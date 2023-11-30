import React from "react";
import styled from "styled-components";

const NoticeWrapper = styled.div`
  border: 1px solid #dbdada;
`;
const NoticeTitle = styled.div`
  border-bottom: 1px solid #dbdada;
  background-color: lightblue;
  padding: 7px;
`;
const NoticeDes = styled.div`
  padding: 7px;
`;

const Notice = () => {
  return (
    <div>
      <NoticeWrapper>
        <NoticeTitle>
          <h5>자유게시판입니다.</h5>
        </NoticeTitle>
        <NoticeDes>
          <p>미풍양속을 해치지 않는 범위 내에서 자유롭게 작성해주세요.</p>
        </NoticeDes>
      </NoticeWrapper>
    </div>
  );
};

export default Notice;
