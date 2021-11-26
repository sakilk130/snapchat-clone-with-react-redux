import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../../features/cameraSlice';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};

function WebcamCapture() {
  const webcamRef:any = useRef(null);
  const dispatch = useDispatch();
  const history = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(
      setCameraImage({
        imageSrc,
      })
    );
    history('/preview');
  }, [webcamRef]);


  return (
    <Container>
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
        mirrored={true}
      />
      <RadioButtonUnchecked onClick={capture} fontSize="large" />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  & > .MuiSvgIcon-root {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    color: white;
  }
`;

export default WebcamCapture;
