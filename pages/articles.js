import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { getAllPostData } from '../lib/fetchedPosts';
import AppContext from '../components/AppContext';

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.li`
  display: flex;
  align-self: center;
  height: fit-content;
  width: 33%;
  min-width: 300px;
  background-color: whitesmoke;
  margin: 3px;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    background-color: #dbdbdb;
  }
  a {
    display: grid;
    grid-template-columns: auto auto;
    width: 100%;
    align-items: center;
    text-decoration: none;
    color: black;
  }
`;

const ArticleImage = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
`;

export default function Articles({ postData }) {
  const globalState = useContext(AppContext);
  const { user } = globalState;

  async function deleteArticle(e) {
    const ID = e.target.parentNode.id;
    e.preventDefault();
    fetch(
      `https://cmstiver-blog.herokuapp.com/secured/posts/${ID}/delete?secret_token=${user.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((resdata) => {
        console.log('Success:', resdata);
      })
      .then(() => window.location.reload())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  if (user) {
    return (
      <List>
        {postData.map((item) => (
          <Wrapper key={item._id} id={item._id}>
            <Link href={`/articles/${item._id}`} key={item.id}>
              <a>
                <ArticleImage src={item.image} alt="#" />
                <header>{item.title}</header>
              </a>
            </Link>
            <button type="button" onClick={deleteArticle}>
              Delete
            </button>
          </Wrapper>
        ))}
      </List>
    );
  }

  return (
    <List>
      {postData.map((item) => (
        <Wrapper key={item._id} id={item._id}>
          <Link href={`/articles/${item._id}`} key={item.id}>
            <a>
              <ArticleImage src={item.image} alt="#" />
              <header>{item.title}</header>
            </a>
          </Link>
        </Wrapper>
      ))}
    </List>
  );
}

export async function getStaticProps() {
  const postData = await getAllPostData();
  return {
    props: postData,
  };
}
