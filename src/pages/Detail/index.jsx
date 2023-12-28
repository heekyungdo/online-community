import React, { useEffect, useState } from "react";
import Notice from "../../components/Notice";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../../utils/firebase";
import { useParams } from "react-router-dom";
import styled from 'styled-components'

const Image = styled.img`
max-width:500px;
width:100%;
height:300px;
`

const Detail = () => {
  const fireStore = getFirestore(app);
  const params = useParams();
  const [post, setPost] = useState("");

  const getData = async () => {
    const valRef = await collection(fireStore, "post");
    const data = await getDocs(valRef);
    const allData = data.docs.map((val) => ({ ...val.data(), id: val.id }));
    setPost(allData[params.id]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Notice />
      {post && (
        <div>
          <div>
            <h2>{post.title}</h2>
            <p>이름: {post.writer}</p>
            <p>등록일: {Date.parse(post.date)}</p>
            <p>조회수: </p>
          </div>

          <div>
              {post?.images?.length>0 && post.images.map(image=>(
                <p key={image}>
                <Image src={image} alt={image}/>
                </p>
              ))}
          
            <p>{post.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
