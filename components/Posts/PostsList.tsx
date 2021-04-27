import React from 'react'
import {ResponsePostType} from "../../api/api";
import { PostItem } from './PostItem';
import {Grid, Box } from '@material-ui/core';

type PostsType = {
  postsList: ResponsePostType[]
}

export const PostsList: React.FC<PostsType> = ({postsList}) => {
  return (
    <Grid container display='flex' justifyContent='center'>
      <Box p={2}>
        {postsList.map(({title, body, id}) => <PostItem title={title} body={body} id={id} key={id}/>)}
      </Box>
    </Grid>
  )
}