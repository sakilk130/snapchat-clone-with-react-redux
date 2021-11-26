import React, { useEffect } from 'react';
import styled from 'styled-components';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview from './components/Preview/Preview';
import Chats from './components/Chats/Chats';
import ChatView from './components/ChatView/ChatView';
import { useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './components/Login/Login';
import { auth } from './firebase/config';
import { useDispatch } from 'react-redux';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <AppContainer>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <AppBody>
            <Routes>
              <Route path="/chats/view" element={<ChatView />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/" element={<WebcamCapture />} />
            </Routes>
          </AppBody>
        )}
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fefc01;
  height: 100vh;
  overflow: hidden;
`;
const AppBody = styled.div``;

export default App;
