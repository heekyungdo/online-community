import React from 'react'
import PropTypes from 'prop-types'


const ReplyComment = ({comments}) => {
  console.log(comments)
  return (
    <div>
      {comments.map((comment,index)=>(
        <div key={index}>
          <p>{comment.writer}</p>
        </div>
      ))}
    </div>
  )
}

ReplyComment.propTypes = {
  comments:PropTypes.array
}
export default ReplyComment

