import React, {useState} from 'react'
import {ResponseCurrentPost, ResponsePostType} from "../../api/api";
import Comment from "./Comment";
import {addComment, setNewCommentText, updateCurrentPost} from "../../redux/postsSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {Box, Button, TextField} from "@material-ui/core";
import {EditPostForm} from './EditPostForm';
import styles from '../../styles/styles.module.scss'

type CurrentPostType = {
  currentPost: ResponseCurrentPost
  newCommentText: string
}

const CurrentPost: React.FC<CurrentPostType> = ({currentPost, newCommentText}) => {
  const {body, comments, title, id} = currentPost
  const comment = comments.map(c => <Comment key={c.id} body={c.body}/>)
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false);
  }
  const onCommentChange = (comment: any) => {
    const newComment: string = comment.target.value
    dispatch(setNewCommentText(newComment))
  }
  const handleOnClickConfirmButton = (values: ResponsePostType) => {
    deactivateEditMode()
    dispatch(updateCurrentPost({postId: id, body: values.body, title: values.title}))
  }
  const handleOnClickAddComment = () => {
    dispatch(addComment({body: newCommentText, postId: id}))
  }
  return (
    <div>
      {editMode ? (
        <Box>
          <EditPostForm title={title} body={body} handleSubmit={handleOnClickConfirmButton}/>
        </Box>
      ) : (
        <div>
          <Box className={styles.title}>{title}</Box>
          <Box className={styles.body}>{body}</Box>
          <Button onClick={activateEditMode} className={styles.button}>Edit post</Button>
        </div>
      )}
      <div>
        {comments.length ? 'Comments' : null}
        <Box>
          {comment}
        </Box>
        <Box>
          <TextField autoFocus={true} value={newCommentText} onChange={onCommentChange} label={'Comment'}/>
        </Box>
        <Button onClick={handleOnClickAddComment} color={'primary'} size={'large'}>Add comment</Button>
      </div>
    </div>
  )
}

export default CurrentPost