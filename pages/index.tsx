import React from "react"
import {MainLayout} from "../components/MainLayout";
import {AppState, NextThunkDispatch, wrapper} from "../redux/store";
import {getPostsList, PostsInitialStateType} from "../redux/postsSlice";
import {useSelector} from "react-redux";
import {PostsList} from "../components/Posts/PostsList";


const HomePage = () => {
  const {postsList} = useSelector<AppState, PostsInitialStateType>(state => state.posts)
  return (
    <>
      <MainLayout title={'Main page'}>
        <PostsList postsList={postsList}/>
      </MainLayout>
    </>
  )
}

export default HomePage

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(await getPostsList())
})