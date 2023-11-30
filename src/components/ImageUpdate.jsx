import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const ImageList = styled.div`
  background: #f8f8f8;
  width: 100%;
  height: 100px;
  margin: 15px 0;
`;
const ImageUpdate = () => {
  return (
    <Wrapper>
      <ImageList></ImageList>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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

export default ImageUpdate;
