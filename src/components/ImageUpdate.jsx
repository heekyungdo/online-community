import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../utils/firebase";
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
  display: flex;
  flex-direction: column;
  margin-right: 20px;

  &:last-child {
    margin-right: unset;
  }
`;

const UpdatedImage = styled.img`
  width: 120px;
  height: 80px;
  margin-bottom: 10px;
`;

const CloseImage = styled.img`
  width: 15px;
  cursor: pointer;
`;

const UpdateBtn = styled.div`
  span {
    border: 1px solid #ccc;
    text-align: center;
    color: #031c45;
    font-weight: bold;
    background: #f0f0f0;
    cursor: pointer;
    padding: 5px 12px;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageUpdate = ({ images, onImageChange }) => {
  const storage = getStorage(app);

  const handleUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return null;
    const id = new Date();
    const storageRef = ref(storage, `images/${file.name}_${id}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((imageUrl) => {
        onImageChange([...images, imageUrl]);
      });
    });
  };

  const handleDelete = (image) => {
    const desertRef = ref(storage, image);

    deleteObject(desertRef)
      .then(() => {
        const currentIndex = images.indexOf(image);
        let newImages = [...images];
        newImages.splice(currentIndex, 1);
        onImageChange(newImages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <ImageList>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <UpdatedImage src={image} alt={image} />
            <CloseImage
              src={closeBtn}
              alt="close"
              onClick={() => handleDelete(image)}
            />
          </ImageWrapper>
        ))}
      </ImageList>

      <div>
        <label htmlFor="image">
          <UpdateBtn>
            <span>사진 업로드</span>
          </UpdateBtn>
          <ImageInput
            type="file"
            id="image"
            accept="image/*"
            multiple={true}
            onChange={handleUpdate}
          />
        </label>
      </div>
    </Wrapper>
  );
};

ImageUpdate.propTypes = {
  images: PropTypes.array,
  onImageChange: PropTypes.func,
  imageUrl: PropTypes.func,
};

export default ImageUpdate;
