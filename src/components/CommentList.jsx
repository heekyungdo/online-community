import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import app from '../utils/firebase'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

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
`

const CommentContent = styled.div`
word-break: break-all;
    word-wrap: break-word;
    color: #434343;
    line-height: 1.5;
font-size:13px;
padding: 10px 0 15px 0;
`

const CommentList = () => {
  const fireStore = getFirestore(app);
  const [comments, setComments] = useState([])
  const user = useSelector((state)=>state.user?.userData)

  const getComments = async()=>{
    const valRef = await collection(fireStore, 'post');
    const data = await getDocs(query(valRef,orderBy('date')));
    const allData = data.docs.map(val=>({...val.data(), id:val.id}))
    setComments(allData)
  }

  useEffect(()=>{
    getComments()
  },[])

  console.log(comments)
  console.log(user.id)

  const [commentAuth, setCommentAuth] = useState(false)

  useEffect(()=>{
    comments.id === user.id ? setCommentAuth(true) : setCommentAuth(false)
  },[comments,user])

  return (
    <CommentsListWrapper>
        <CommentsTitle><CommentCount>12</CommentCount>개의 댓글</CommentsTitle>
        <div>
          {comments.map(comment=>(
          <CommentsList key={comment.date}>
            <CommentTop>
              <CommentLeft>
              <CommentWriter>{comment.writer}</CommentWriter>
              <CommentDate>{dayjs(comment.date).format('YYYY.MM.DD HH:mm')}</CommentDate>
              </CommentLeft>
              {commentAuth?   
              <CommentRight>
                <DeleteButton>삭제</DeleteButton>
                <UpdateButton>수정</UpdateButton>
              </CommentRight>
              :null}
            </CommentTop>
            <CommentContent>
            {comment.value}
            </CommentContent>
          </CommentsList>
          ))}
        </div>
    </CommentsListWrapper>
  )
}

export default CommentList;