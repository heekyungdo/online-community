import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import Notice from "../../components/Notice";
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import app from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { postData } from "../../store/postSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fireStore = getFirestore(app);

  const [posts, setPosts] = useState([]);

  const getData = async () => {
    const valRef = await collection(fireStore, "post");
    const data = await getDocs(query(valRef, orderBy("date", "desc")));
    const allData = data.docs.map((val) => ({ ...val.data(), id: val.id }));
    setPosts(allData);
    dispatch(postData(allData));
  };

  useEffect(() => {
    getData();
  }, []);

  const list = [
    { key: 1, value: "5개" },
    { key: 2, value: "10개" },
    { key: 3, value: "15개" },
    { key: 4, value: "20개" },
  ];

  const [selected, setSelected] = useState(2);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    const newData = [...posts];
    switch (selected) {
      case 1:
        return posts.splice(5);
      case 2:
        return posts.splice(10);
      case 3:
        return posts.splice(15);
      case 4:
        return posts.splice(20);
      default:
        return posts;
    }
  };

  const goToDetail = (index) => {
    navigate(`/board/${index}`);
  };

  const updatedDate = (date)=>{
const now = dayjs()
const updatedDate = dayjs(date)
const hourDiff = now.diff(updatedDate, 'hour') 

if(hourDiff>24){
  return updatedDate.format('YY-MM-DD')
} else {
  return updatedDate.format('HH:mm:ss')
}
  }

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
          {posts?.map((post, index) => (
            <tbody key={post.id}>
              <tr onClick={() => goToDetail(index)}>
                <td>{index + 1}</td>
                <td>{post.writer}</td>
                <td>{post.title}</td>
                <td>{updatedDate(post.date)}</td>
                <td>조회수</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </MainTable>
      <Bottom>
        <div>
          <label htmlFor="">목록수</label>
          <select onChange={handleSelect}>
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
