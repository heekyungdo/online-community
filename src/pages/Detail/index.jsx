import React, { useEffect, useState } from "react";
import Notice from "../../components/Notice";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components'
import dayjs from 'dayjs'
import CommentInput from "../../components/CommentInput";
import CommentList from "../../components/CommentList";
import { useSelector } from "react-redux";
import app from "../../utils/firebase";
import { collection, doc, getFirestore} from "firebase/firestore";

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
height:300px;
`

const ButtonGroup = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-end;
  margin-top:20px;

  button{
    cursor:pointer;
    padding:7px 15px;
    border-radius: 4px;
  }
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

const Detail = () => {
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
            <PostInfo>조회수: </PostInfo>
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
            <DeleteBtn onClick={()=>handleDelete(post.id)}>삭제</DeleteBtn>
            <UpdateBtn onClick={handleUpdate}>수정</UpdateBtn>
          </ButtonGroup>
          ):null}
      <CommentInput/>
      <CommentList/>
    </div>
  );
};

export default Detail;
