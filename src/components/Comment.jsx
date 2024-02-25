import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Comment = ({ comment }) => {
    const replies = comment.reply;

    return (
        <div>
            <div>
                <p>{comment.writer}</p>
                <p>{comment.createdAt}</p>
            </div>
            <div>
                <p>{comment.comment}</p>
            </div>
            {replies.length > 0 && (
                <div>
                    {replies.map(reply => (
                        // <Comment comment={reply} key={reply.id}/>
                        <div>
                            <div>
                                <p>{reply.writer}</p>
                                <p>{reply.createdAt}</p>
                            </div>
                            <div>
                                <p>{reply.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object
}

export default Comment