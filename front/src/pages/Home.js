import React from "react";
import Axios from 'axios';

const Home = () => {
    return <h1>Home 화면 입니다.</h1>
};

fetch('http://localhost:8000/accounts/token/')
  .then((response) => response.json())
  .then((data) => console.log(data));

export default Home;

