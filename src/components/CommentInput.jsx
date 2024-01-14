import { arrayUnion, collection, doc, getDocs, getFirestore, orderBy, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import app from "../utils/firebase";
import { useParams } from 'react-router-dom';

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
    const currentPost = postInfo[id]
    const [posts, setPosts] = useState([]);
    const [eachComment, setEachComment] = useState('')

    const getData = async () => {
      const valRef = await collection(fireStore, "post");
      const data = await getDocs(query(valRef, orderBy("date")));
      const allData = data.docs.map((val,index) => ({ ...val.data(), id: val.id ,index:index}));
      setPosts(...posts,allData);
    };
  
    useEffect(()=>{
      getData();
    },[])

    const handleSubmit = async (e)=>{
      e.preventDefault();
      
      const commentInfo = {
        writer:userInfo.name,
        id:userInfo.id,
        createdAt:new Date().toISOString(),
        comment:eachComment
      };

      const commentsRef = doc(fireStore, "post", currentPost.id);

      if(!eachComment) return;

      await updateDoc(commentsRef, {
        comments: arrayUnion(commentInfo)
    }).then(()=>setEachComment(''));
 };

    const handleComment = (e)=>{
       setEachComment(e.target.value);
    };

  return (
  <div>
    <CommentTitle>댓글쓰기</CommentTitle>
    <form onSubmit={handleSubmit}>
    <label htmlFor="comment"></label>
    <CommentEditor>
    <TextArea id="comment" placeholder='타인을 배려하는 마음을 담아 댓글을 달아주세요.' onChange={handleComment} value={eachComment}/>
        <Button type='submit'>등록</Button>
    </CommentEditor>
   </form>
  </div>
  )
}

export default CommentInput;