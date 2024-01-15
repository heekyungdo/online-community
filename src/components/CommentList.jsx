import { arrayRemove, collection, doc, getDocs, getFirestore, orderBy, query, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import app from '../utils/firebase'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import CommentInput from './CommentInput'
import { useParams } from 'react-router-dom'

const CommentList = () => {
  const fireStore = getFirestore(app);
  const {id} = useParams();
  const [comments, setComments] = useState([])
  const user = useSelector((state)=>state.user?.userData)
  const postInfo = useSelector((state)=>state.post?.postInfo)
    const currentPost = postInfo[id]
  const commentsRef = doc(fireStore, "post", currentPost.id);
  const [replyBox, setReplyBox] = useState(false)
  const getComments = async()=>{
    const valRef = await collection(fireStore, 'post');
    const data = await getDocs(query(valRef));
    const allData = data.docs.map(val=>({...val.data(), id:val.id}));
   const commentsArr =  allData.map(val=>val.comments);
  //  console.log(commentsArr[id])
   setComments(commentsArr[id],...comments)

  //  for(let i of commentsArr){
  //   setComments(i,...comments)
  //   console.log(i)
  //  }
  }
  useEffect(()=>{
    getComments();
  },[])

  const onDeleteComment = async (index)=>{
      await updateDoc(commentsRef, {
        comments: arrayRemove()
      }).then(()=>console.log('삭제'))
  }

  const onUpdateComment = () =>{

  }

  const toggleReply = ()=>{
!setReplyBox != setReplyBox
  }

  return (
    <CommentsListWrapper>
        <CommentsTitle><CommentCount>{comments && comments.length}{" "}</CommentCount>개의 댓글</CommentsTitle>
        <div>
          {comments && comments.map((value,index)=>(
          <CommentsList key={index}>
            <CommentTop>
              <CommentLeft>
               <CommentWriter>{value.writer}</CommentWriter>
               <CommentDate>{dayjs(value.createdAt).format('YYYY.MM.DD HH:mm')}</CommentDate>
              </CommentLeft>
              {value.id===user.id?   
              <CommentRight>
                <DeleteButton onClick={()=>onDeleteComment(index)}>삭제</DeleteButton>
                <UpdateButton>수정</UpdateButton>
              </CommentRight>
              :null}
            </CommentTop>
            <CommentContent>
            {value.comment}
            </CommentContent>
            <ReplyContent>
             <ReplyCount>답글{" "}<span>10</span>개{" "}<span>▾</span></ReplyCount>
             <p>|</p>
             <ReplyBox onClick={toggleReply}>답글쓰기</ReplyBox>
            </ReplyContent>
          </CommentsList>
          ))}
        </div>
    </CommentsListWrapper>
  )
}

export default CommentList;

const CommentsListWrapper = styled.div`
margin:40px 0;
`
const CommentsTitle = styled.div`
color: #434343;
font-weight: Bold;
border-bottom: 1px solid #bdc1c4;
`
const CommentCount = styled.span`
color: #ec4d37;
font-size: 26px;
`
const CommentsList = styled.div`
border-bottom: 1px solid #dedede;
background: #f9f9f9;
padding: 12px 17px 10px;
`

const CommentTop = styled.div`
display:flex;
justify-content:space-between;
`

const CommentLeft = styled.div`
display:flex;
align-items:center;
`

const CommentWriter = styled.span`
font-size:13px;
color: #48688f 
`

const CommentDate = styled.span`
margin-left: 14px;
color: #aaa;
font-size: 11px;
`

const CommentRight = styled.div`
  button {
    border:none;
    background:none;
    font-size:11px;
    cursor:pointer;
  }
`

const DeleteButton = styled.button`
color:red;
`
const UpdateButton = styled.button`
color:gray;
margin-left:5px;
`

const CommentContent = styled.div`
word-break: break-all;
    word-wrap: break-word;
    color: #434343;
    line-height: 1.5;
font-size:13px;
padding: 10px 0 15px 5px;

`

const ReplyContent = styled.div`
display:flex;
 p{
  color: #999;
  font-size:12px;
  padding: 0 3px;
 }
`

const ReplyCount = styled.p`
 padding:none;
 cursor:pointer;
`

const ReplyBox = styled.p`
padding:none;
cursor:pointer;
`