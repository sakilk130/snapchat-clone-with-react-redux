import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetCameraImage, selectImage } from '../../features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import {
  AttachFile,
  Create,
  Crop,
  MusicNote,
  Note,
  Timer,
  TextFields,
  Send,
} from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import db, { storage } from '../../firebase/config';
import firebase from 'firebase';

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
  const sendPost = () => {
    const id = uuidv4();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(image.imageSrc, 'data_url');
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('posts')
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              imageUrl: url,
              username: 'sakil',
              read: false,
              profilePic: 'S',
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history('/chats');
          });
      }
    );
  };

  return (
    <Container>
      <CloseIcon onClick={closePreview} className="closeIcon" />
      <ToolBarRight>
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </ToolBarRight>
      <img src={image?.imageSrc} alt="" />

      <Footer onClick={sendPost}>
        <h2>Send Now</h2>
        <Send />
      </Footer>
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

const ToolBarRight = styled.div`
  color: white;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  margin: 5px;

  & > .MuiSvgIcon-root {
    font-size: 20px !important;
    margin-bottom: 8px;
    cursor: pointer;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  right: -25px;
  transform: translate(-50%, -50%);
  background-color: yellow;
  color: black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 30px;
  padding: 7px;
  cursor: pointer;
  & > h2 {
    font-size: 8px;
    margin-right: 3px;
  }
  & > .MuiSvgIcon-root {
    font-size: 10px !important;
  }
`;

export default Preview;
