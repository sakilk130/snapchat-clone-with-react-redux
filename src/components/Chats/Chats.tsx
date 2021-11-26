import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { ChatBubble, Search } from '@material-ui/icons';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import db from '../../firebase/config';
import Chat from './Chat/Chat';

function Chats() {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot: any) =>
        setPosts(
          snapshot.docs.map((doc: any) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeSnap = () => {};
  return (
    <ChatsContainer>
      <ChatsHeader>
        <Avatar className="avatar" />
        <ChatsSearch>
          <Search className="search" />
          <input placeholder="friends" type="text" />
        </ChatsSearch>
        <ChatBubble className="chatIcon" />
      </ChatsHeader>
      <ChatPosts>
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </ChatPosts>
      <RadioButtonUncheckedIcon onClick={takeSnap} fontSize="large" />
    </ChatsContainer>
  );
}

const ChatsContainer = styled.div`
  position: relative;
  height: 400px;
  width: 250px;
`;

const ChatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #059ee0;
  & > .avatar {
    height: 25px !important;
    width: 25px !important;
  }
  & > .chatIcon {
    color: white;
    font-size: 18px !important;
  }
`;

const ChatsSearch = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding-left: 8px;
  & > .search {
    color: white;
    font-size: 13px !important;
  }
  & > input {
    outline: none;
    background-color: transparent;
    border: none;
    font-size: 12px;
    flex: 1;
    color: white;
    height: 50px;
  }
  & > input::placeholder {
    color: white;
    opacity: 1;
  }
`;

const ChatPosts = styled.div`
  box-shadow: 1px -7px 7px -6px rgba((0), 0, 0, 0.44);
  height: 350px;
  margin-top: -9px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Chats;
