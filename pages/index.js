import React from 'react';
import Head from 'next/head';
import ArticleGrid from '../components/articleGrid';
import { getAllPostData } from '../lib/fetchedPosts';

export default function index({ postData }) {
  return (
    <>
      <Head>
        <title>Chayse&apos;s Blog</title>
      </Head>
      <ArticleGrid postData={postData} />
    </>
  );
}

export async function getServerSideProps() {
  const postData = await getAllPostData();
  return {
    props: postData,
  };
}
