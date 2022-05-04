import TweetFactory from "components/TweetFactory";
import { dbService } from "fb";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tweet from "./../components/Tweet";

const Wrapper = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const TweetBox = styled.div`
  margin-top: 40px;
  height: 100%;
  max-height: 610px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    /* width: 6px; */
    display: none;
  }
  /* &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: gray;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  } */
`;

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const tweetsArr = snapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      setTweets(tweetsArr);
    });
  }, []);

  return (
    <Wrapper>
      <TweetFactory userObj={userObj} />
      <TweetBox>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </TweetBox>
    </Wrapper>
  );
};

export default Home;
