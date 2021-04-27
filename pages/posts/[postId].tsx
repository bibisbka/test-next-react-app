import React from "react"
import {MainLayout} from "../../components/MainLayout";
import {useRouter} from "next/router";
import {AppState, NextThunkDispatch, wrapper} from "../../redux/store";
import {getCurrentPost, PostsInitialStateType} from "../../redux/postsSlice";
import CurrentPost from "../../components/CurrentPost/CurrentPost";
import {useSelector} from "react-redux";
import {Card} from "@material-ui/core";
import styles from "../../styles/styles.module.scss";


const Post=()=>{
  const {currentPost, newCommentText} = useSelector<AppState, PostsInitialStateType>(state => state.posts)
  return (
    <>
      <MainLayout title={'Main page'}>
        <div className={'center'}>
          <Card className={styles.post}>
            <CurrentPost currentPost={currentPost} newCommentText={newCommentText}/>
          </Card>
        </div>
      </MainLayout>
      <style jsx>
        {`
          .center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}

export const getServerSideProps=wrapper.getServerSideProps(async ({store,params})=>{
  const dispatch=store.dispatch as NextThunkDispatch
  await dispatch(await getCurrentPost(+params.postId))
})

export default Post