import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase/config';
import { useDispatch } from 'react-redux';
import { login } from '../../features/appSlice';

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result: any) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error.messages);
      });
  };

  return (
    <LoginContainer>
      <Body>
        <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
        <Button variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </Body>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  background-color: yellow;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  & > img {
    height: 300px;
    object-fit: contain;
  }
`;
export default Login;
