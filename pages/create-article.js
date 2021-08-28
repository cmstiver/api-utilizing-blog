import React, { useContext } from 'react';
import AppContext from '../components/AppContext';

export default function CreateArticle() {
  const globalState = useContext(AppContext);

  const { user } = globalState;

  async function createPost(e) {
    e.preventDefault();
    const title = document.querySelector('#title');
    const body = document.querySelector('#body');
    const image = document.querySelector('#image');
    const date = document.querySelector('#date');
    /*
    const published = document.querySelector('#published');

    function publishedValueConvert(x) {
      if (x.value === 'on') {
        return true;
      }
      return false;
    }
    */

    function dateValueConvert(x) {
      if (x.value === null || x.value === undefined) {
        return Date.now();
      }
      return x;
    }

    const data = {
      title: title.value,
      body: body.value,
      image: image.value,
      date: dateValueConvert(date.value),
      // published: publishedValueConvert(published),
    };
    fetch(`https://cmstiver-blog.herokuapp.com/secured/posts?secret_token=${user.token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((resdata) => {
        console.log(resdata);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <>
      <div>
        <form method="POST">
          <input id="title" type="text" placeholder="Title" name="title" />
          <input id="image" type="text" placeholder="image url" name="image" />
          <input id="date" type="date" name="date" />
          <textarea id="body" placeholder="body" name="body" />
          {/* <input id="published" type="checkbox" name="published" defaultChecked /> */}
          <button type="submit" onClick={createPost}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
