import React, { useEffect, useState } from "react";
import Notice from "../../components/Notice";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../../utils/firebase";
import { useParams } from "react-router-dom";

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
            <p>등록일: {post.date}</p>
            <p>조회수: </p>
          </div>

          <div>
            <p>{post.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
