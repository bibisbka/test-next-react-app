import React from 'react'

type CommentPropsType = {
  body: string
}

const Comment: React.FC<CommentPropsType> = ({body}) => {
  return (
    <div>
      {body}
    </div>
  )
}

export default Comment