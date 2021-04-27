import {Card} from "@material-ui/core";
import React from "react"
import {FormNewPost} from "../../components/Form/FormNewPost";
import {MainLayout} from "../../components/MainLayout";
import styles from "../../styles/styles.module.scss";

const MakeNewPost = () => {
  return (
    <>
      <MainLayout title={'Create new post'}>
        <div className='center'>
          <Card className={styles.post}>
            <FormNewPost/>
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

export default MakeNewPost