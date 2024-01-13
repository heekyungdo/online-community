import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import app from "../utils/firebase";
import { useParams } from 'react-router-dom';
import { set } from 'react-hook-form';

const CommentTitle = styled.p`
font-size:16px;
font-weight:bold;
color: #465f69;
border-bottom: 2px solid #5e6f7f;
letter-spacing: -1px;
margin:40px 0 20px;
padding-bottom:10px;
`

const CommentEditor= styled.div`
display:grid;
grid-template-columns:1fr auto;
align-items:center;
width:100%;
`

const TextArea = styled.textarea`
background: #fff;
border: 1px solid #acb2b4;
color: #565656;
font-size: 15px;
resize: none;
height: 10vh;
box-sizing: border-box;
word-wrap: break-word;
word-break: break-word;
margin-right:15px;
&::placeholder{
    font-size:15px;
}
`

const Button = styled.button`
padding:0 30px;
height: 10vh;
cursor:pointer;
`

const CommentInput = () => {
  const fireStore = getFirestore(app);
  const {id} = useParams();

    const userInfo = useSelector((state) => state.user?.userData);
    const postInfo = useSelector((state)=>state.post?.postInfo)
    const valRef = collection(fireStore, "post");
    const currentPost = postInfo[id]
    const [comments,setComments]=useState({
       
    })

    const handleSubmit = async (e)=>{
e.preventDefault();
const commentsRef = doc(fireStore, "post", currentPost.id);

const commentInfo = {
    wirter:userInfo.name,
    id:userInfo.id,
    createdAt:new Date().toISOString(),
    ...comments
    };

    await updateDoc(commentsRef,commentInfo).then(()=>{
        console.log('댓글')
    }); 
 };

    const handleComment = (e)=>{
        let {value} = e.target;

        setComments((prevState) => ({
            ...prevState,
            comments: value,
          }));
    };

  return (
  <div>
    <CommentTitle>댓글쓰기</CommentTitle>
    <form onSubmit={handleSubmit}>
    <label htmlFor="comment"></label>
    <CommentEditor>
    <TextArea id="comment" placeholder='타인을 배려하는 마음을 담아 댓글을 달아주세요.' onChange={handleComment}/>
        <Button type='submit'>등록</Button>
    </CommentEditor>
   </form>
  </div>
  )
}

export default CommentInput;