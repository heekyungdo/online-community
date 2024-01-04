import React, { useEffect, useState } from 'react'
import Notice from '../../components/Notice'
import Form from '../../components/Form'
import { useSelector } from "react-redux";
import app from "../../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";

const Update = () => {
    const fireStore = getFirestore(app);
    const navigate = useNavigate();
  const {id} = useParams();
  const [writtenPost, setWrittenPost] = useState({})
    const [post, setPost] = useState({
      title: "",
      description: "",
      images: [],
    });
  
    const userInfo = useSelector((state) => state.user?.userData);
    const postDetail = useSelector((state)=>state.post?.postInfo)
    const valRef = collection(fireStore, "post");

  useEffect(()=>{
setWrittenPost(postDetail[id])
  },[postDetail])

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
      const updateRef = doc(fireStore, "post", writtenPost.id);
      await updateDoc(updateRef, postInfo);
    

    
      // navigate("/community");
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

  return (
    <div>
    <Notice />
    <Form submit={handleSubmit} title={writtenPost.title} changeBody={handleChange} description={writtenPost.description} images={writtenPost.images} imageChange={handleImages} status='update'/>
  </div>
  )
}

export default Update;