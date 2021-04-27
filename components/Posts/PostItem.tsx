import React from 'react'
import {useRouter} from "next/router";
import {Box, Button, Card} from "@material-ui/core";
import {postDelete} from '../../redux/postsSlice';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import styles from '../../styles/styles.module.scss'

type PostPropsType = {
  title: string
  body: string
  id: number
}

export const PostItem: React.FC<PostPropsType> = ({title, body, id}) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const handleOnClickDeleteButton = (postId: number) => {
    dispatch(postDelete(postId))
  }
  return (
    <Box>
      <Card className={styles.post} onClick={() => {
        router.push(`posts/${id}`)
      }}>
        <Box className={styles.title}>
          {title}
        </Box>
        <Box className={styles.body}>
          {body}
        </Box>
      </Card>
      <Button onClick={() => {
        handleOnClickDeleteButton(id)
      }}>Delete post</Button>
    </Box>
  )
}