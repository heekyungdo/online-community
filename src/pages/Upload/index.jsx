import React, { useState } from "react";
import Notice from "../../components/Notice";
import styled from "styled-components";
import Form from '../../components/Form'
import { useSelector } from "react-redux";
import app from "../../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import Swal from 'sweetalert2'

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

const Upload = () => {
  const fireStore = getFirestore(app);
  const navigate = useNavigate();
const {id}=useParams();
const userInfo = useSelector((state) => state.user?.userData);
const valRef = collection(fireStore, "post");

  const [post, setPost] = useState({
    title: "",
    description: "",
    images: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postInfo = {
      // id:setId(prev=>prev+1),
      writer: userInfo.name,
      userId:userInfo.id,
      date: new Date().toISOString(),
      ...post,
    };

    // fireStore에 db 저장
    await addDoc(valRef, postInfo).then(()=>{
      navigate("/community");
      })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImages = async (newImages) => {
    await setPost((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleCancle = ()=>{
    Swal.fire({
      title: "정말 취소하시겠습니까?",
      text: "취소 후에는 복구 하실 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "목록으로 가기",
      cancelButtonText:'취소',
    }).then((result) => {
      if (result.isConfirmed) {
          navigate('/community')
      }
    });
  }
  return (
    <div>
      <Notice />
      <Form submit={handleSubmit} title={post.title} changeBody={handleChange} description={post.description} images={post.images} imageChange={handleImages} postCancle={handleCancle} status='upload'/>
    </div>
  );
};

export default Upload;
