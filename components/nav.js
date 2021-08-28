import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import AppContext from './AppContext';

const TopNav = styled.nav`
  display: flex;
  background-color: whitesmoke;
  height: fit-content;
  justify-content: center;
  margin-bottom: 6px;

  ul {
    list-style-type: none;
    li {
      display: inline-block;
      padding: 10px;
      color: black;
      &:hover {
        background-color: #dbdbdb;
      }
    }
  }
  a {
    text-decoration: none;
  }
`;

export default function ArticleGrid() {
  const globalState = useContext(AppContext);

  const { user } = globalState;

  if (user) {
    return (
      <header>
        <TopNav>
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
          </ul>
        </TopNav>
      </header>
    );
  }
  return (
    <header>
      <TopNav>
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
      </TopNav>
    </header>
  );
}
