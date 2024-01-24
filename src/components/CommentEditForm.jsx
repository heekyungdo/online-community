import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CommentEditForm = ({value}) => {
  return (
   <>
   <form>
    <label htmlFor='editComment'></label>
    <CommentEditor>
    <TextArea id='editComment' defaultValue={value}/>
    <CommentRight>
    <CancleButton>취소</CancleButton>
    <AddButton>등록</AddButton>
    </CommentRight>
    </CommentEditor>
    </form>
    </>
  )
}

CommentEditForm.propTypes = {
 value:PropTypes.string
}

export default CommentEditForm

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