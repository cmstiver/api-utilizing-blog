import React, { useContext } from 'react';
import Link from 'next/link';
import { getAllPostData } from '../lib/fetchedPosts';
import AppContext from '../components/AppContext';

export default function Articles({ postData }) {
  const globalState = useContext(AppContext);
  const { user } = globalState;

  if (user) {
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
            <button type="button">Delete</button>
          </li>
        ))}
      </ul>
    );
  }

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
