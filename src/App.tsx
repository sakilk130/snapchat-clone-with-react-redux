import React from 'react';
import styled from 'styled-components';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview from './components/Preview/Preview';
import Chats from './components/Chats/Chats';

function App() {
  return (
    <AppContainer>
      <Router>
        <AppBody>
          <Routes>
            <Route path="/preview" element={<Preview />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/" element={<WebcamCapture />} />
          </Routes>
        </AppBody>
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
