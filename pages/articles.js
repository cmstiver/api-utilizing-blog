import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllPostData } from '../lib/fetchedPosts';

export default function Articles({ postData }) {
  return (
    <ul>
      {postData.map((item) => (
        <li key={item._id}>
          <Link href={`/articles/${item._id}`} key={item.id}>
            <a>
              <div>
                <header>{item.title}</header>
                <div>
                  <img src={item.image} alt="#" />
                </div>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const postData = await getAllPostData();
  return {
    props: postData,
  };
}
