import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 5em;
  padding: 40px;
  margin-bottom: 6px;
  border-radius: 10px;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  color: black;
  text-shadow: 2px 2px 5px #000000;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 10px;
  height: 50em;
  width: 75em;

  div {
    display: flex;
    background-color: aqua;
    overflow: hidden;
    justify-content: center;
    position: relative;
    cursor: pointer;
  }
  img {
    flex-shrink: 0;
    min-width: 100%;
    object-fit: cover;
  }
  h2 {
    font-size: xx-large;
    position: absolute;
    bottom: 8px;
    left: 16px;
    color: white;
    text-shadow: 2px 2px 5px #000000;
  }
  div:nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row: 1 / 3;
  }
  div:nth-child(2) {
    grid-column-start: 6;
    grid-column-end: 10;
    grid-row: 1 / 3;
  }
  div:nth-child(3) {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: 3 / 6;
  }
  div:nth-child(4) {
    grid-column-start: 4;
    grid-column-end: 7;
    grid-row: 3 / 6;
  }
  div:nth-child(5) {
    grid-column-start: 7;
    grid-column-end: 10;
    grid-row: 3 / 6;
  }
  @media only screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(5, 1fr);
    height: 60em;
    width: 90%;
    div:nth-child(1) {
      grid-column: 1 / 1;
      grid-row: 1 / 2;
    }
    div:nth-child(2) {
      grid-column: 1 / 1;
      grid-row: 2 / 3;
    }
    div:nth-child(3) {
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row: 3 / 4;
    }
    div:nth-child(4) {
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row: 4 / 5;
    }
    div:nth-child(5) {
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row: 5 / 6;
    }
  }
`;

export default function ArticleGrid(props) {
  const [postState, setPosts] = useState([]);
  const { postData } = props;

  useEffect(() => {
    const firstFiveArray = [];
    for (let i = 0; i < 5; i += 1) {
      if (!postData[i]) {
        return;
      }
      firstFiveArray.push(postData[i]);
    }
    setPosts(firstFiveArray);
  }, []);

  return (
    <Container>
      <Header>Chayse&apos;s Blog</Header>
      <Grid>
        {postState.map((post) => (
          <Link href={`/articles/${post._id}`} key={post._id}>
            <div>
              <img src={post.image} alt="#" />
              <h2>{post.title}</h2>
            </div>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}
