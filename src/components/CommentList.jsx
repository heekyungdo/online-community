import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import downArrowImg from '../assets/images/down-arrow.svg'
import upArrowImg from '../assets/images/up-arrow.svg'
import PropTypes from 'prop-types'

const CommentList = (
  { userId,
    comments,
    onDeleteComment,
    onSelectCommentIndex,
    selectedCommentIndex,
    handleComment,
    onEditComment,
    handleReplyComment,
    onReplyComment,
    setSelectedReplyIndex }) => {
  const [select, setSelect] = useState([]);
  const [replyComments, setReplyComments] = useState([])

  const editComment = (
    <CommentEditor>
      <TextArea
        defaultValue={comments[selectedCommentIndex]?.comment}
        onChange={handleComment} />
      <CommentRight>
        <CancleButton onClick={() => onSelectCommentIndex()}>취소</CancleButton>
        <AddButton onClick={() => onEditComment(selectedCommentIndex)}>등록</AddButton>
      </CommentRight>
    </CommentEditor>
  )

  const replyCommentInput = (
    <>
      <CommentEditor>
        <TextArea
          id="replyComment"
          placeholder='타인을 배려하는 마음을 담아 댓글을 달아주세요.'
          onChange={handleReplyComment}
        />
        <Button onClick={onReplyComment}>등록</Button>
      </CommentEditor>
    </>

  )

  if (!comments) return;

  return (

    <CommentsListWrapper>
      {comments?.length > 0 ?
        <CommentsTitle><CommentCount>{comments?.length}{" "}</CommentCount>개의 댓글</CommentsTitle>
        : null}
      <div>
        {comments?.map((value, index) => (
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
                  {value.id === userId ?
                    <CommentRight>
                      <DeleteButton onClick={() => onDeleteComment(index)}>삭제</DeleteButton>
                      <UpdateButton onClick={() => onSelectCommentIndex(index)}>수정</UpdateButton>
                    </CommentRight>
                    : null}
                </CommentTop>
                <CommentContent>
                  {value.comment}
                </CommentContent>
                <ReplyContent>
                  <ReplyCount onClick={()=>{
                    !replyComments.includes(value.reply)
                    ? setReplyComments((select) => [...select, value.reply])
                    : setReplyComments(select.filter((button) => button !== value.reply))
                  }}>답글{" "}<span>{value.reply.length>0 && value.reply.length}</span>개{" "}<img src={downArrowImg} alt='down arrow' /></ReplyCount>
                  <div>
                    {replyComments.includes(value.reply)
              ? replyCommentInput
              : null}
                  </div>
                  <p>|</p>
                  <ReplyWrite onClick={() => {
                    setSelectedReplyIndex(index),
                    !select.includes(value.createdAt)
                      ? setSelect((select) => [...select, value.createdAt])
                      : setSelect(select.filter((button) => button !== value.createdAt));
                  }}>답글쓰기</ReplyWrite>
                </ReplyContent>
                <ReplyBox>
                  {select.includes(value.createdAt)
                    ? replyCommentInput
                    : null}
                </ReplyBox>
              </>}
          </CommentsList>
        ))}
        <div>
         {comments[0]?.reply.map(reply=>(
         <CommentList/>
         ))}
        </div>
      </div>
    </CommentsListWrapper>
  )
}


CommentList.propTypes = {
  userId: PropTypes.string,
  comments: PropTypes.array,
  onDeleteComment: PropTypes.func,
  onSelectCommentIndex: PropTypes.func,
  selectedCommentIndex: PropTypes.number,
  handleComment: PropTypes.func,
  onEditComment: PropTypes.func,
  handleReplyComment: PropTypes.func,
  onReplyComment: PropTypes.func,
  setSelectedReplyIndex: PropTypes.func
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
const CommentEditor = styled.div`
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

const ReplyWrite = styled.p`
padding:none;
cursor:pointer;
`

const ReplyBox = styled.div`
margin-top:10px;
`

const Button = styled.button`
padding:0 30px;
height: 10vh;
cursor:pointer;
`