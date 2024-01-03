import React from 'react'
import styled from 'styled-components'


const CommentsListWrapper = styled.div`
margin:40px 0;
`
const CommentsTitle = styled.div`
color: #434343;
font-weight: Bold;
`
const CommentCount = styled.span`
color: #ec4d37;
font-size: 26px;
`
const CommentsList = styled.div`
border-top: 1px solid #bdc1c4;
border-bottom: 1px solid #dedede;
background: #f9f9f9;
`
const CommentList = () => {
  return (
    <CommentsListWrapper>
        <CommentsTitle><CommentCount>12</CommentCount>개의 댓글</CommentsTitle>
        <CommentsList></CommentsList>
    </CommentsListWrapper>
  )
}

export default CommentList