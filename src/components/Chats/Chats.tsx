import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { ChatBubble, Search } from '@material-ui/icons';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import db, { auth } from '../../firebase/config';
import Chat from './Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/appSlice';
import Tooltip from '@material-ui/core/Tooltip';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from '../../features/cameraSlice';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useNavigate();

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

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history('/');
  };
  return (
    <ChatsContainer>
      <ChatsHeader>
        <Tooltip title="Logout">
          <Avatar
            className="avatar"
            src={user?.profilePic}
            onClick={() => {
              auth.signOut();
            }}
          >
            {user?.displayName}
          </Avatar>
        </Tooltip>
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
      <RadioButtonUncheckedIcon
        className="takeSnap"
        onClick={takeSnap}
        fontSize="large"
      />
    </ChatsContainer>
  );
}

const ChatsContainer = styled.div`
  position: relative;
  height: 400px;
  width: 250px;
  & > .takeSnap {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    background-color: white;
    border-radius: 200px;
    color: gray;
    font-size: 40px !important;
  }
  & > .takeSnap:hover {
    opacity: 0.8;
  }
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
    cursor: pointer;
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
