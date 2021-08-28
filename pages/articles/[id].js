import Head from 'next/head';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { getAllPostIds, getCommentData, getPostData } from '../../lib/fetchedPosts';
import AppContext from '../../components/AppContext';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: xx-large;
  margin-bottom: 9px;
`;

const ArticleImage = styled.img`
  width: 50%;
  min-width: 300px;
  margin-bottom: 9px;
`;

const ArticleBody = styled.article`
  width: 50%;
  min-width: 300px;
  margin-bottom: 9px;
  background-color: whitesmoke;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
`;

const Comment = styled.li`
  display: flex;
  align-self: center;
  height: fit-content;
  flex-direction: column;
  width: 33%;
  min-width: 300px;
  background-color: whitesmoke;
  margin: 3px;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
  h4 {
    font-size: larger;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

export default function Post({ postData, commentData }) {
  const globalState = useContext(AppContext);
  const { user } = globalState;

  async function postComment(e) {
    const name = document.querySelector('#name');
    const body = document.querySelector('#body');

    const data = {
      name: name.value,
      body: body.value,
      postid: postData.postData._id,
    };
    e.preventDefault();
    fetch('https://cmstiver-blog.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((resdata) => {
        console.log('Success:', resdata);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    window.location.reload();
  }

  async function deleteComment(e) {
    const commentID = e.target.parentNode.id;

    e.preventDefault();
    fetch(
      `https://cmstiver-blog.herokuapp.com/secured/comments/${commentID}/delete?secret_token=${user.token}`,
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
      <>
        <Head>
          <title>{postData.postData.title}</title>
        </Head>
        <Layout>
          <Title>{postData.postData.title}</Title>
          <ArticleImage src={postData.postData.image} />
          <ArticleBody>
            <div>{postData.postData.body}</div>
          </ArticleBody>
          <div>
            <form method="POST">
              <input id="name" type="text" placeholder="Name" name="name" />
              <input id="body" type="text" placeholder="Comment" name="body" />
              <button type="submit" onClick={postComment}>
                Submit
              </button>
            </form>
            <ul>
              {commentData.commentData.map((comment) => (
                <li key={comment._id} id={comment._id}>
                  <h4>{comment.name}</h4>
                  <p>{comment.body}</p>
                  <button type="button" onClick={deleteComment}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{postData.postData.title}</title>
      </Head>
      <Layout>
        <Title>{postData.postData.title}</Title>
        <ArticleImage src={postData.postData.image} />
        <ArticleBody>
          <div>{postData.postData.body}</div>
        </ArticleBody>
        <div>
          <form method="POST">
            <input id="name" type="text" placeholder="Name" name="name" />
            <input id="body" type="text" placeholder="Comment" name="body" />
            <button type="submit" onClick={postComment}>
              Submit
            </button>
          </form>
          <ul>
            {commentData.commentData.map((comment) => (
              <Comment key={comment._id} id={comment._id}>
                <h4>{comment.name}</h4>
                <p>{comment.body}</p>
              </Comment>
            ))}
          </ul>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const commentData = await getCommentData(params.id);
  return {
    props: {
      postData,
      commentData,
    },
  };
}
