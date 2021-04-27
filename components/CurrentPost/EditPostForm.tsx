import {Field, Form, Formik} from 'formik';
import React from 'react'
import * as Yup from 'yup'
import {PostType} from '../../api/api';
import {Box, Button, TextField} from "@material-ui/core";
import styles from '../../styles/styles.module.scss'

type EditPostProps = {
  title: string,
  body: string,
  handleSubmit: (values: PostType) => void
}

const validationSchema = Yup.object().shape({
  title: Yup.string().max(20, 'Title must be less then 20 characters length'),
  body: Yup.string(),
})

export const EditPostForm: React.FC<EditPostProps> = ({title, body, handleSubmit}) => {
  const initialValues: PostType = {
    title,
    body,
  }
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Box className={styles.titleForm}>
              <Field as={TextField}
                     label={'Title'}
                     name={'title'}
                     error={Boolean(props.errors.title)}
                     helperText={props.errors.title}
              />
            </Box>
            <Box className={styles.bodyForm}>
              <Field as={TextField}
                     label={'Message'}
                     name={'body'}
                     error={Boolean(props.errors.body)}
                     helperText={props.errors.body}
              />
            </Box>
            <Box>
              <Button color={'primary'} size={'large'} type={'submit'}>
                Confirm edit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  )
}