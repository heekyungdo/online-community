import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import dayjs from 'dayjs'
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
import iconImage from '../../assets/images/icon_image.png'
import iconText from '../../assets/images/icon_text.png'
import Pagination from "./Section/Pagination";

const MainTable = styled.div`
  margin: 50px 0 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

thead {
  th{
    padding:10px 0;
  border-bottom: 1px solid #404040;
}
}
  tbody{
    text-align:center;
    tr{
      &:hover {
        background:#f5f5f5;
        cursor:pointer;
          }

    td{
      padding:7px 0;
      border-bottom:1px solid #c1c1c1;
  }
`

const WriterTd = styled.td`
color: #374273;
`

const TitleTd = styled.td`
display:flex;
align-items:center;
justify-content:center;
 img{
  margin-right:3px;
 }
`

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

const Community = ({ isAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fireStore = getFirestore(app);
  const perPage= 5;
  const [currentPage, setCurrentPage]=useState(1)
  const [posts, setPosts] = useState([]);
  const indexOfFirst = (currentPage-1)*perPage
  const indexOfLast = indexOfFirst+perPage
  const lastPage = Math.ceil(posts.length/perPage)

  const getData = async () => {
    const valRef = await collection(fireStore, "post");
    const data = await getDocs(query(valRef, orderBy("date")));
    const allData = data.docs.map((val,index) => ({ ...val.data(), id: val.id ,index:index}));
    setPosts(allData)
    dispatch(postData(allData));
  };

  useEffect(()=>{
    getData()
  },[])

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
        return posts.slice(5);
      case 2:
        return posts.slice(10);
      case 3:
        return posts.slice(15);
      case 4:
        return posts.slice(20);
      default:
        return posts;
    }
  };

  const goToDetail = (index) => {
    navigate(`/board/${index}`);
  };

  const updatedDate = (date)=>{
    const now = dayjs()
    const yesterday = now.add(1,'day')
    const updatedDate = dayjs(date)
    const hourDiff = now.diff(updatedDate, 'hour') 

    if(hourDiff>24){
      return updatedDate.format('YY/MM/DD')
    } else {
      return updatedDate.format('HH:mm:ss')
      }
  }

  const setImageType = (images)=>{
    if(images.length===0){
      return iconText
  } else {
      return iconImage
    }
  }

  const renderData = (
   posts?.length>0 && posts?.slice(indexOfFirst,indexOfLast).map((post)=>(
      <tr key={post.id} onClick={()=>goToDetail(post.index)}>
        <td>{(post.index)+1}</td>
        <WriterTd>{post.writer}</WriterTd>
        <TitleTd><img src={setImageType(post.images)} alt='image'/>{post.title}</TitleTd>
        <td>{updatedDate(post.date)}</td>
        <td>조회수</td>
      </tr>
    ))
  )

  return (
    <section>
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
            {renderData}
          </tbody>
        </Table>
      </MainTable>
      <Bottom>
        <div>
          <label htmlFor="listCount">목록수</label>
          <select id="listCount" onChange={handleSelect}>
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
              <Link to={"/board/upload"}>글쓰기</Link>
            </button>
          ) : null}
        </BtnWrapper>
      </Bottom>
      {posts?.length>0? 
    <Pagination postsPerPage={perPage} handleCurrentPage={setCurrentPage} currentPage={currentPage} lastPage={lastPage}/>
    :null}
    </section>
  );
};

Community.propTypes = {
  isAuth: PropTypes.bool,
};

export default Community;
