/* eslint-disable import/prefer-default-export */
export async function getAllPostIds() {
  const res = await fetch('https://cmstiver-blog.herokuapp.com/posts');
  const posts = await res.json();
  return posts.map((post) => ({
    params: {
      id: post._id,
    },
  }));
}

export async function getPostData(id) {
  const res = await fetch(`https://cmstiver-blog.herokuapp.com/posts/${id}`);
  const postData = await res.json();
  return {
    postData,
  };
}

export async function getAllPostData() {
  const res = await fetch('https://cmstiver-blog.herokuapp.com/posts');
  const postData = await res.json();
  return {
    postData,
  };
}

export async function getCommentData(id) {
  const res = await fetch(`https://cmstiver-blog.herokuapp.com/comments/${id}`);
  const commentData = await res.json();
  return {
    commentData,
  };
}
