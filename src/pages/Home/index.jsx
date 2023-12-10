import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const reduxData = useSelector((state) => state.post);
  console.log("home", reduxData);
  return <div>Home</div>;
};

export default Home;
