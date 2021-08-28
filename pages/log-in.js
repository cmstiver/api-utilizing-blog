import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function LogIn() {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  async function login(e) {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const data = {
      email: email.value,
      password: password.value,
    };
    e.preventDefault();
    fetch('https://cmstiver-blog.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((resdata) => {
        setUser(resdata);
        localStorage.setItem('user', JSON.stringify(resdata));
        console.log(resdata);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const logout = () => {
    setUser({});
    localStorage.clear();
    window.location.reload();
  };

  if (user) {
    return (
      <>
        <div>
          {user.user}
          {' '}
          is loggged in
        </div>
        <button type="button" onClick={logout}>
          logout
        </button>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Log-In</title>
      </Head>
      <div>
        <form method="POST">
          <input id="email" type="text" placeholder="E-Mail" name="email" />
          <input id="password" type="text" placeholder="Password" name="password" />
          <button type="submit" onClick={login}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
