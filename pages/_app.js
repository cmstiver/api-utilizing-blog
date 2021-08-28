import React, { useState, useEffect } from 'react';
import Nav from '../components/nav';
import AppContext from '../components/AppContext';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const globalState = {
    user,
    setUser,
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={globalState}>
        <Nav />
        <Component {...pageProps} />
      </AppContext.Provider>
    </>
  );
}

export default MyApp;
