import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
const MainTable = styled.div`
  margin: 50px 0 0;
`;

const Table = styled.table`
  width: 100%;
`;

const Community = ({ isAuth }) => {
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
      <div>{isAuth ? <button>글쓰기</button> : null}</div>
      <MainTable>
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>글쓴이</th>
              <th>제목</th>
              <th>등록일</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dfsd</td>
            </tr>
          </tbody>
        </Table>
      </MainTable>
    </div>
  );
};

Community.propTypes = {
  isAuth: PropTypes.bool,
};

export default Community;
