import React from "react";
import { Link } from "react-router-dom";

const onLogout = () => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.clear();
    alert("로그아웃 되었습니다😎");
    window.location.href = "/Signin";
  }
}

const AuthMenubar = ({ close }) => (
  <div className="menu">
    <ul>
      <li><a href = "/mydatagrid">Lost112</a></li>
      <li><a href = "/dollidolist">Dollido</a></li>
      <li><a href = "/about">About</a></li>
      <Link to="#" onClick={onLogout}>로그아웃</Link>
    </ul>
  </div>
);

export default AuthMenubar;