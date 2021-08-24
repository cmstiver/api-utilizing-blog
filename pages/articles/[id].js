import Head from 'next/head';
import { getAllPostIds, getCommentData, getPostData } from '../../lib/fetchedPosts';

export default function Post({ postData, commentData }) {
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

  return (
    <>
      <Head>
        <title>{postData.postData.title}</title>
      </Head>
      <article>
        <h1>{postData.postData.title}</h1>
        <div>{postData.postData.body}</div>
      </article>
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
            <li key={comment._id}>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </div>
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
