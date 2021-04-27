import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  deletePost,
  getListAllPosts,
  getPost,
  postNewComment,
  postNewPost,
  PostType,
  ResponseCurrentPost,
  ResponsePostType,
  updatePost
} from "../api/api";

export type LoadingType = 'idle' | 'pending' | 'succeeded' | 'failed'

export type PostsInitialStateType = {
  postsList: ResponsePostType[]
  currentPost: ResponseCurrentPost
  loading: LoadingType
  newCommentText: string
}

export type NewCommentType = {
  postId: number
  body: string
}

export type UpdatedCurrentPost = {
  title: string
  body: string
  postId: number
}

const initialState: PostsInitialStateType = {
  postsList: [],
  currentPost: {
    title: '',
    comments: [],
    body: '',
    id: 1
  },
  newCommentText: '',
  loading: 'idle'
}

export const getPostsList = createAsyncThunk(
  'getPostsList',
  async () => {
    return await getListAllPosts()
  }
)

export const getCurrentPost = createAsyncThunk(
  'getCurrentPost',
  async (postId: number) => {
    return await getPost(postId)
  }
)

export const postDelete = createAsyncThunk(
  'deletePost',
  async (postId: number) => {
    await deletePost(postId)
    return await getListAllPosts()
  }
)

export const createNewPost = createAsyncThunk(
  'createNewPost',
  async (newPost: PostType) => {
    await postNewPost(newPost.title, newPost.body)
    return await getListAllPosts()
  }
)

export const updateCurrentPost = createAsyncThunk(
  'updateCurrentPost',
  async (updatedCurrentPost: UpdatedCurrentPost) => {
    await updatePost(updatedCurrentPost.title, updatedCurrentPost.body, updatedCurrentPost.postId)
    return await getPost(updatedCurrentPost.postId)
  }
)

export const addComment = createAsyncThunk(
  'addComment',
  async (newComment: NewCommentType) => {
    await postNewComment(newComment.body, newComment.postId)
    return await getPost(newComment.postId)
  }
)


export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setCurrentPostTitle: (state, {payload}: PayloadAction<string>) => ({
      ...state,
      currentPost: {
        ...state.currentPost,
        title: payload
      }
    }),
    setCurrentPostBody: (state, {payload}: PayloadAction<string>) => ({
      ...state,
      currentPost: {
        ...state.currentPost,
        body: payload
      }
    }),
    setNewCommentText: (state, {payload}: PayloadAction<string>) => ({
      ...state,
      newCommentText: payload
    }),
  },
  extraReducers: builder => {
    builder.addCase(getPostsList.pending, state => ({
      ...state,
      loading: 'pending'
    }))
    builder.addCase(getPostsList.fulfilled, (state, {payload}: PayloadAction<ResponsePostType[]>) => ({
      ...state,
      postsList: payload.reverse(),
      loading: 'succeeded'
    }))
    builder.addCase(getCurrentPost.pending, state => ({
      ...state,
      loading: 'pending'
    }))
    builder.addCase(getCurrentPost.fulfilled, (state, {payload}: PayloadAction<ResponseCurrentPost>) => ({
      ...state,
      currentPost: payload,
      loading: 'succeeded'
    }))
    builder.addCase(createNewPost.pending, state => ({
      ...state,
      loading: 'pending'
    }))
    builder.addCase(createNewPost.fulfilled, (state, {payload}: PayloadAction<ResponsePostType[]>) => ({
      ...state,
      postsList: payload,
      loading: 'succeeded'
    }))
    builder.addCase(postDelete.pending, state => ({
      ...state,
      loading: 'pending'
    }))
    builder.addCase(postDelete.fulfilled, (state, {payload}: PayloadAction<ResponsePostType[]>) => ({
      ...state,
      postsList: payload.reverse(),
      loading: 'succeeded'
    }))
    builder.addCase(updateCurrentPost.pending, state => ({
      ...state,
      loading: 'pending'
    }))
    builder.addCase(updateCurrentPost.fulfilled, (state, {payload}: PayloadAction<ResponseCurrentPost>) => ({
      ...state,
      currentPost: payload,
      loading: 'succeeded'
    }))
    builder.addCase(addComment.pending, state => ({
      ...state,
      loading: 'pending'
    }))
    builder.addCase(addComment.fulfilled, (state, {payload}: PayloadAction<ResponseCurrentPost>) => ({
      ...state,
      currentPost: payload,
      loading: 'succeeded'
    }))
  }
})

export const {
  setCurrentPostTitle,
  setCurrentPostBody,
  setNewCommentText
} = postsSlice.actions