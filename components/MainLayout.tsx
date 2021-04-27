import React from 'react'
import Head from 'next/head'
import NavBar from "./NavBar";
import {Container} from '@material-ui/core';

type MainLayoutProps = {
  title: string
  children?:
    | React.ReactChild
    | React.ReactChild[]
}

export const MainLayout: React.FC<MainLayoutProps> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>
          {title} | Blog
        </title>
        <meta name='keywords' content='next,javascript,nextjs,react'/>
        <meta name='description' content='this is my blog'/>
        <meta name='robots' content='index, follow'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>
      <NavBar/>
      <Container style={{margin: '90px 0'}}>
        {children}
      </Container>
    </>
  )
}
