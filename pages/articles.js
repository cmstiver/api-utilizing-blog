import React, { useEffect, useState } from 'react';

export default function Articles() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://cmstiver-blog.herokuapp.com/posts')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, []);
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {items.map((item) => (
        <a href={`/articles/${item._id}`}>
          <div>
            <header>{item.title}</header>
            <div>
              <img src={item.image} alt="#" />
            </div>
          </div>
        </a>
      ))}
    </ul>
  );
}
