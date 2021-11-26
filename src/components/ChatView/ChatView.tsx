import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectSelectedImage } from '../../features/appSlice';
import { useNavigate } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const history = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    history('/chats');
  };

  return (
    <ChatViewContainer>
      <img src={selectedImage} alt="" onClick={exit} />
      <Timmer>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={10}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </Timmer>
    </ChatViewContainer>
  );
}

const ChatViewContainer = styled.div`
  position: relative;
  & > img {
    cursor: pointer;
  }
`;

const Timmer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;

export default ChatView;
