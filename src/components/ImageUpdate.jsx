import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import closeBtn from "../assets/images/btn_close.gif";

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const ImageList = styled.div`
  display: flex;
  background: #f8f8f8;
  width: 100%;
  height: 120px;
  margin: 15px 0;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 10px;
`;

const ImageWrapper = styled.div`
  margin-right: 20px;

  &:last-child {
    margin-right: unset;
  }
`;

const UpdatedImage = styled.img`
  width: 120px;
  height: 80px;
`;

const CloseImage = styled.img`
  width: 15px;
  cursor: pointer;
`;

const ImageUpdate = ({ images, onImageChange }) => {
  const storage = getStorage();

  const handleDrop = (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `images/${file[0].name}`);
    const uploadTask = uploadBytes(storageRef, file[0]);

    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        onImageChange([...images, downloadURL]);
      });
    });
  };

  return (
    <Wrapper>
      <ImageList>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <UpdatedImage src={image} alt={image} />
            <CloseImage src={closeBtn} alt="close" />
          </ImageWrapper>
        ))}
      </ImageList>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button>사진 업로드</button>
            </div>
          </section>
        )}
      </Dropzone>
    </Wrapper>
  );
};

ImageUpdate.proptypes = {
  images: PropTypes.array,
  onImageChange: PropTypes.func,
};

export default ImageUpdate;
