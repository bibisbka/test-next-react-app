import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://simple-blog-api.crew.red/',
  withCredentials: true,
})

export type ResponsePostType = {
  title: string
  body: string
  id: number
}

export type ResponseCurrentPost = {
  title: string
  body: string
  id: number
  comments: CommentType[]
}

export type CommentType = {
  id: number
  postId: number
  body: string
}

export type PostType = {
  title: string
  body: string
}

export const getListAllPosts = () => {
  return instance.get<ResponsePostType[]>('posts').then(response => response.data)
}

export const getPost = (postId: number) => {
  return instance.get<ResponseCurrentPost>(`posts/${postId}`, {params: {_embed: 'comments'}}).then(response => response.data)
}

export const postNewPost = (title: string, body: string) => {
  return instance.post('posts', {title: title, body: body})
}

export const updatePost = (title: string, body: string, postId: number) => {
  return instance.put(`posts/${postId}`, {title: title, body: body})
}

export const deletePost = (postId: number) => {
  return instance.delete(`posts/${postId}`)
}

export const postNewComment = (comment: string, postId: number) => {
  return instance.post(`comments`, {postId: postId, body: comment})
}