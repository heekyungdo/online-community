import React from 'react'
import styled from 'styled-components'

const CommentReply = () => {
  return (
    <form >
    <label htmlFor="replyComment"></label>
    <div>
    <textarea 
       id="replyComment" 
       placeholder='타인을 배려하는 마음을 담아 댓글을 달아주세요.' 
       />
        <button type='submit'>등록</button>
    </div>
    </form>
  )
}

export default CommentReply