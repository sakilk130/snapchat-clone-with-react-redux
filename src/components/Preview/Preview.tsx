import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetCameraImage, selectImage } from '../../features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

function Preview() {
  const image = useSelector(selectImage);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!image) {
      history('/');
    }
  }, [image, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    history('/');
  };
  return (
    <Container>
      <CloseIcon onClick={closePreview} className="closeIcon" />
      <img src={image?.imageSrc} alt="" />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  & > .closeIcon {
    position: absolute;
    top: 0;
    margin: 5px;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }
`;

export default Preview;
