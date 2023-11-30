import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Notice from "../../components/Notice";

const MainTable = styled.div`
  margin: 50px 0 0;
`;

const Table = styled.table`
  width: 100%;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 40px;

  label {
    margin-right: 7px;
  }
`;

const BtnWrapper = styled.div`
  margin-left: 20px;

  button {
    padding: 5px 10px;
    font-weight: bold;
  }
`;
const Pagination = styled.div`
  text-align: right;
`;
const Community = ({ isAuth }) => {
  const list = [
    { key: 1, value: "5개" },
    { key: 2, value: "10개" },
    { key: 3, value: "15개" },
    { key: 4, value: "20개" },
  ];

  return (
    <div>
      <Notice />
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
      <Bottom>
        <div>
          <label htmlFor="">목록수</label>
          <select>
            {list.map((item) => {
              return (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>
        <BtnWrapper>
          {isAuth ? (
            <button>
              <Link to={"/board/update"}>글쓰기</Link>
            </button>
          ) : null}
        </BtnWrapper>
      </Bottom>
      <Pagination></Pagination>
    </div>
  );
};

Community.propTypes = {
  isAuth: PropTypes.bool,
};

export default Community;
