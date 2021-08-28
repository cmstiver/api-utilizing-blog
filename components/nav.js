import React, { useContext } from 'react';
import Link from 'next/link';
import AppContext from './AppContext';

export default function ArticleGrid() {
  const globalState = useContext(AppContext);

  const { user } = globalState;

  if (user) {
    return (
      <header>
        <nav>
          <ul>
            <Link href="/">
              <a>
                <li>Home</li>
              </a>
            </Link>
            <Link href="/articles">
              <a>
                <li>Articles</li>
              </a>
            </Link>
            <Link href="/create-article">
              <a>
                <li>Create Article</li>
              </a>
            </Link>
            <Link href="/log-in">
              <a>
                <li>Log-In</li>
              </a>
            </Link>
            <li>
              {user.user}
              {' '}
              is logged in.
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  return (
    <header>
      <nav>
        <ul>
          <Link href="/">
            <a>
              <li>Home</li>
            </a>
          </Link>
          <Link href="/articles">
            <a>
              <li>Articles</li>
            </a>
          </Link>
          <Link href="/log-in">
            <a>
              <li>Log-In</li>
            </a>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
