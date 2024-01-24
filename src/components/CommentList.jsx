import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import downArrowImg from '../assets/images/down-arrow.svg'
import upArrowImg from '../assets/images/up-arrow.svg'
import PropTypes from 'prop-types'

const CommentList = ({userId, comments, onDeleteComment,onEditComment,editMode}) => {
const [selectedCommentIndex, setSelectedCommentIndex] = useState()

const onSelectCommentIndex = (index) => {
  setSelectedCommentIndex(index);
};

const editComment = (
  <CommentEditor>
  <TextArea defaultValue={comments[selectedCommentIndex]?.comment}/>
  <CommentRight>
  <CancleButton onClick={()=>onSelectCommentIndex()}>취소</CancleButton>
  <AddButton>등록</AddButton>
  </CommentRight>
  </CommentEditor>

)

  if(!comments) return;

  return (

    <CommentsListWrapper>
        <CommentsTitle><CommentCount>{comments && comments.length}{" "}</CommentCount>개의 댓글</CommentsTitle>
        <div>
          {comments && comments.map((value,index)=>(
          <CommentsList key={index}>
            {selectedCommentIndex === index ?
             <>
             {editComment}
            </>
            : 
            <>
            <CommentTop>
              <CommentLeft>
               <CommentWriter>{value.writer}</CommentWriter>
               <CommentDate>{dayjs(value.createdAt).format('YYYY.MM.DD HH:mm')}</CommentDate>
              </CommentLeft>
              {value.id===userId?   
              <CommentRight>
                 <DeleteButton onClick={()=>onDeleteComment(index)}>삭제</DeleteButton>
                 <UpdateButton onClick={()=>onSelectCommentIndex(index)}>수정</UpdateButton>
              </CommentRight>
              :null}
            </CommentTop>
            <CommentContent>
            {value.comment}
            </CommentContent>
            <ReplyContent>
             <ReplyCount>답글{" "}<span>10</span>개{" "}<img src={downArrowImg} alt='down arrow'/></ReplyCount>
             <p>|</p>
             <ReplyBox>답글쓰기</ReplyBox>
            </ReplyContent>
            </>}
          </CommentsList>
          ))}

        </div>
    </CommentsListWrapper>
  )
}


CommentList.propTypes={
  userId:PropTypes.string,
  comments:PropTypes.array,
  onDeleteComment:PropTypes.func,
  onEditComment:PropTypes.func,
  editMode:PropTypes.array
}

export default CommentList

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
padding:5px;
&::placeholder{
    font-size:15px;
}
`

const CommentRight = styled.div`
  button {
    border:none;
    background:none;
    font-size:11px;
    cursor:pointer;
  }
`
const CancleButton = styled.button`
color:gray;
`
const AddButton = styled.button`
margin-left:5px;
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
  img {
    width:10px;
    height:10px;
  }
`

const ReplyBox = styled.p`
padding:none;
cursor:pointer;
`