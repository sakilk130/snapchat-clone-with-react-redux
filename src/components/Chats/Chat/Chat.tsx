import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { selectImage } from '../../../features/appSlice';
import db from '../../../firebase/config';
import { useNavigate } from 'react-router-dom';

function Chat({ id, profilePic, username, timestamp, imageUrl, read }: any) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection('posts').doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history('/chats/view');
    }
  };
  return (
    <ChatContainer onClick={open}>
      <Avatar src={profilePic} className="avatar" />
      <ChatInfo>
        <h4>{username}</h4>
        <p>
          Tap to view -
          {moment(new Date(timestamp?.toDate()).toUTCString()).fromNow()}
        </p>
      </ChatInfo>

      {!read && <StopRounded className="redIcon" />}
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid whitesmoke;
  cursor: pointer;
  & > .avatar {
    height: 35px !important;
    width: 35px !important;
  }
  & > :hover {
    opacity: 0.8;
  }
  & > .redIcon {
    color: red !important;
  }
`;

const ChatInfo = styled.div`
  flex: 1;
  padding-left: 5px;
  & > h4 {
    font-size: 11px;
    font-weight: 500;
  }
  & > p {
    font-size: 9px;
  }
`;

export default Chat;
