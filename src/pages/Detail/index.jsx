import React, { useEffect, useState } from "react";
import Notice from "../../components/Notice";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import dayjs from 'dayjs'
import CommentInput from "../../components/CommentInput";
import CommentList from "../../components/CommentList";
import { useSelector } from "react-redux";

const ContentsWrapper = styled.div`
margin-top:50px;
border:1px solid #dbdada;
padding:15px 20px;
min-height:50vh;
`

const PostTitle = styled.p`
font-size:24px;
word-break: break-all;
word-wrap: break-word;
latter-spacing:-1px;
`

const PostInfo = styled.p`
margin:7px 0;
font-size:15px;
`

const ContentsTitle = styled.div`

`
const Contents = styled.div`
margin-top:20px;
border-top:1px solid #dbdada;
padding:15px 20px 0 0;
`

const Image = styled.img`
max-width:500px;
width:100%;
height:300px;
`

const Detail = () => {
  const params = useParams();
  const [post, setPost] = useState({});
const postInfo = useSelector((state)=>state.post?.postInfo)

  useEffect(() => {
    const data = postInfo[params.id]
    setPost(data)
  }, [postInfo]);

  return (
    <div>
      <Notice />
      {post && (
        <ContentsWrapper>
          <div>
            <PostTitle>{post.title}</PostTitle>
            <PostInfo>이름: {post.writer}</PostInfo>
            <PostInfo>등록일: {dayjs(post.date).format('YYYY-MM-DD')}</PostInfo>
            <PostInfo>조회수: </PostInfo>
          </div>

          <Contents>
              {post?.images?.length>0 && post.images.map(image=>(
                <p key={image}>
                <Image src={image} alt={image}/>
                </p>
              ))}
          
            <p>{post.description}</p>
          </Contents>
        </ContentsWrapper>
      )}
      <CommentInput/>
      <CommentList/>
    </div>
  );
};

export default Detail;
