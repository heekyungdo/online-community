import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'

const Comments = ({comments}) => {
    
  return (
    <div>
        {comments.map((comment,index)=>(
            <Comment key={index} comment={comment}/>
        ))}
    </div>
  )
}

Comments.propTypes = {
    comments:PropTypes.array
}

export default Comments