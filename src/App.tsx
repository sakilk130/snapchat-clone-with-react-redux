import React, { useEffect, useState } from 'react';
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
import Loader from 'react-loader-spinner';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

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
        setLoader(false);
      } else {
        dispatch(logout());
        setLoader(false);
      }
    });
  }, []);

  return (
    <AppContainer>
      <Router>
        {loader ? (
          <Loading>
            <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
          </Loading>
        ) : !user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
              alt=""
            />
            <AppBody>
              <BodyBackground>
                <Routes>
                  <Route path="/chats/view" element={<ChatView />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/" element={<WebcamCapture />} />
                </Routes>
              </BodyBackground>
            </AppBody>
          </>
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

  & > img {
    object-fit: contain;
    height: 100px;
  }
`;
const AppBody = styled.div`
  background: url('https://www.pngkey.com/png/full/859-8598072_picture-freeuse-library-silhouette-mobile-at-getdrwawings-cell.png')
    no-repeat center;
  background-size: contain;
  height: 400px;
  width: 250px;
  padding: 74px;
`;

const BodyBackground = styled.div`
  background-color: white;
  height: 400px;
`;

const Loading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

export default App;
