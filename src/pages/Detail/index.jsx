import React, { useEffect, useState } from "react";
import Notice from "../../components/Notice";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components'
import dayjs from 'dayjs'
import CommentInput from "../../components/CommentInput";
import CommentList from "../../components/CommentList";
import { useSelector } from "react-redux";
import { doc, updateDoc, deleteField, getFirestore, deleteDoc } from "firebase/firestore";
import app from "../../utils/firebase";
import Swal from 'sweetalert2'

const ContentsWrapper = styled.div`
margin-top:50px;
border:1px solid #dbdada;
padding:15px 20px;
min-height:50vh;
`

const PostTitle = styled.p`
font-size:24px;
word-break: break-all;
word-wrap: break-word;
latter-spacing:-1px;
`

const PostInfo = styled.p`
margin:7px 0;
font-size:15px;
`

const Contents = styled.div`
margin-top:20px;
border-top:1px solid #dbdada;
padding:15px 20px 0 0;
`

const Image = styled.img`
max-width:500px;
width:100%;
min-height:300px;
`

const ButtonGroup = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-top:20px;

  button{
    cursor:pointer;
    padding:7px 15px;
    border-radius: 4px;
  }
`

const ListBtn = styled.button`
border: 1px solid #b1b1;
`
const DeleteBtn = styled.button`
margin-right:15px;
background: fafafa;
color: #606060;
border: 1px solid #b1b1;
`

const UpdateBtn = styled.button`
background: #add8e6;
border: 1px solid #add8e6;
`
const CommentTitle = styled.p`
font-size:16px;
font-weight:bold;
color: #465f69;
border-bottom: 2px solid #5e6f7f;
letter-spacing: -1px;
margin:40px 0 20px;
padding-bottom:10px;
`

const Detail = () => {
  const fireStore = getFirestore(app);
  const {id} = useParams();
  const navigate = useNavigate()
  const [post, setPost] = useState({});
  const postInfo = useSelector((state)=>state.post?.postInfo);
  const user = useSelector((state)=>state.user?.userData)

  useEffect(() => {
    const data = postInfo[id]
    setPost(data)
  }, [postInfo]);

  const handleDelete = async (postId)=>{
Swal.fire({
  title: "정말 삭제하시겠습니까?",
  text: "삭제 후에는 복구 하실 수 없습니다.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "삭제",
  cancelButtonText:'취소',
}).then((result) => {
  if (result.isConfirmed) {
     deleteDoc(doc(fireStore, "post", postId)).then(()=>{
      navigate('/community')
     })
  }
});
  }

  const handleUpdate = ()=>{
  navigate('/update/'+id)
  }

  return (
    <div>
      <Notice />
      {post && (
        <ContentsWrapper>
          <div>
            <PostTitle>{post.title}</PostTitle>
            <PostInfo>이름: {post.writer}</PostInfo>
            <PostInfo>등록일: {dayjs(post.date).format('YYYY-MM-DD')}</PostInfo>
          </div>

          <Contents>
              {post?.images?.length>0 && post.images.map(image=>(
                <p key={image}>
                <Image src={image} alt={image}/>
                </p>
              ))}
          
            <p>{post.description}</p>
          </Contents>
        </ContentsWrapper>
      )}
      {user?.id===post?.userId ?(
         <ButtonGroup>
          <ListBtn onClick={()=>navigate('/community')}>목록</ListBtn>
          <div>
            <DeleteBtn onClick={()=>handleDelete(post.id)}>삭제</DeleteBtn>
            <UpdateBtn onClick={handleUpdate}>수정</UpdateBtn>
            </div>
          </ButtonGroup>
          ):null}
    <CommentTitle>댓글쓰기</CommentTitle>
      <CommentInput/>
      <CommentList/>
    </div>
  );
};

export default Detail;
