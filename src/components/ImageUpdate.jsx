import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
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
const ImageUpdate = ({ images, onImageChange, imageUrl }) => {
  const storage = getStorage();
  const id = Date.now();

  const handleUpdate = (e) => {
    console.log(e.target.files[0]);
    // if (!file) return null;
    // const storageRef = ref(storage, `images/${file[0].name}_${id}`);
    // const uploadTask = uploadBytes(storageRef, file[0]);

    // uploadTask.then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((downloadURL) => {
    //     console.log(downloadURL);
    //     onImageChange([...images, downloadURL]);
    //     imageUrl((prev) => [
    //       ...prev,
    //       { url: downloadURL, id: `images/${downloadURL.name}_${id}` },
    //     ]);
    //   });
    // });
  };

  const handleDelete = (image) => {
    console.log(image.target.parentNode.id);
    const deleteRef = ref(storage, event.target.parentNode.id);
    // deleteObject() 참조만 넣어주면 끝... 댕쉽
    deleteObject(deleteRef);
    // 하지만 스토리지에서 삭제한다고 imgUrl에도 바로 삭제되는 거 아니니까 id를 기준으로 필터 메소드를 통해 손쉽게 URL삭제!
    imageUrl(imgUrl.filter((obj) => obj.id !== event.target.parentNode.id));
    // const currentIndex = images.indexOf(image);
    // let newImages = [...images];
    // newImages.splice(currentIndex, 1);
    // onImageChange(newImages);
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
