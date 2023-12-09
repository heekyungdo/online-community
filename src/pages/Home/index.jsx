import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const reduxData = useSelector((state) => state.post);
  console.log("dfdf", reduxData);
  return <div>Home</div>;
};

export default Home;
