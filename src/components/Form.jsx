import React from 'react'
import styled from "styled-components";
import ImageUpload from './ImageUpload';
import PropTypes, { string } from 'prop-types'

const Form = ({submit,title,changeBody,description,images,imageChange,postCancle,status}) => {
    if(status === 'update' && !title && !description) return 
    
  return (
    <form onSubmit={submit}>
        <TitleWrapper>
          <label htmlFor="title"></label>
          <input
            required
            type="text"
            id="title"
            name="title"
            placeholder="제목을 입력해주세요"
            defaultValue={title}
            onChange={changeBody}
          />
        </TitleWrapper>
        <div>
          <label htmlFor="description"></label>
          <TextArea
            required
            id="description"
            name="description"
            defaultValue={description}
            onChange={changeBody}
          />
        </div>
        <ImageUpload images={images} onImageChange={imageChange} />
        <ButtonGroup>
          <CancleBtn onClick={postCancle}>취소</CancleBtn>
          <UploadBtn type="submit">작성완료</UploadBtn>
        </ButtonGroup>
      </form>
  )
}

Form.propTypes={
    submit:PropTypes.func,
    title:PropTypes.string,
    changeBody:PropTypes.func,
    description:PropTypes.string,
    images:PropTypes.array,
    imageChange:PropTypes.func,
    status:string
}

export default Form;

const TitleWrapper = styled.div`
  margin: 30px 0 10px;
  input {
    padding: 7px 0;
    width: 100%;
    box-sizing: border-box;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  height: 50vh;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid #ccc;

  button {
    padding: 10px 30px;
    border-radius: 4px;
    cursor: pointer;
  }
`

const CancleBtn = styled.button`
  background: fafafa;
  color: #606060;
  border: 1px solid #b1b1;
`
const UploadBtn = styled.button`
  background: #add8e6;
  border: 1px solid #add8e6;
`