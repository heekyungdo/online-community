import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const CommentInput = ({handleCommentSubmit,handleComment,comment}) => {

  return (
  <>
    <form onSubmit={handleCommentSubmit}>
    <label htmlFor="comment"></label>
    <CommentEditor>
    <TextArea 
       id="comment" 
       placeholder='타인을 배려하는 마음을 담아 댓글을 달아주세요.' 
       onChange={handleComment} 
       value={comment}/>
        <Button type='submit'>등록</Button>
    </CommentEditor>
   </form>
  </>
  )
}

CommentInput.propTypes={
  handleCommentSubmit:PropTypes.func,
  handleComment:PropTypes.func,
  comment:PropTypes.string
};

export default CommentInput

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

const Button = styled.button`
padding:0 30px;
height: 10vh;
cursor:pointer;
`