import {Form, Formik, Field, FormikHelpers} from 'formik';
import React from 'react'
import * as Yup from 'yup'
import {PostType} from '../../api/api';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {createNewPost} from '../../redux/postsSlice';
import {Box, Button, Card, TextField} from "@material-ui/core";
import styles from '../../styles/styles.module.scss'


const validationSchema = Yup.object().shape({
  title: Yup.string().max(20, 'Title must be less then 20 characters length').required('Required'),
  body: Yup.string().required('Required'),
})

export const FormNewPost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const initialValues: PostType = {
    title: '',
    body: '',
  }

  const onSubmitHandler = (values: PostType, {resetForm}: FormikHelpers<PostType>) => {
    dispatch(createNewPost(values))
    resetForm()
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Box>
            <Field as={TextField}
                   label={'Title'}
                   name={'title'}
                   error={Boolean(props.errors.title)}
                   helperText={props.errors.title}
            />
          </Box>
          <Box>
            <Field as={TextField}
                   label={'Message'}
                   name={'body'}
                   error={Boolean(props.errors.body)}
                   helperText={props.errors.body}
            />
          </Box>
          <Box>
            <Button color={'primary'} size={'large'} type={'submit'}>
              Send new post
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}