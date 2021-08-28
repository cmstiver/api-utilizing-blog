import React from 'react';
import Link from 'next/link';

export default function ArticleGrid() {
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
