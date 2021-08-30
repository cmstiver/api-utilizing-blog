import React from 'react';
import ArticleGrid from '../components/articleGrid';
import { getAllPostData } from '../lib/fetchedPosts';

export default function index({ postData }) {
  return (
    <>
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
