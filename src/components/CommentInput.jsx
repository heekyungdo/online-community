import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

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
    const userInfo = useSelector((state) => state.user?.userData);

const [firstComemnt,setFirstComment]=useState('')

    const handleSubmit = (e)=>{
e.preventDefault();

const commentInfo = {
    writer:userInfo.name,
    date: new Date().toISOString(),
    ...firstComemnt

    }
    }
    const handleComment = (e)=>{
        let {value} = e.target;

        setFirstComment((prevState)=>({
            ...prevState,
            value
        }))
    }

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

export default CommentInput