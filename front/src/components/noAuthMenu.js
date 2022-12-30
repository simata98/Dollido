import React from "react";

const NoAuthMenubar = ({ close }) => (
  <div className="menu">
    <ul>
      <li><a href = "/about">About</a></li>
      <li><a href = "/signin">로그인</a></li>
      <li><a href = "/agreement">회원가입</a></li>
    </ul>
  </div>
);

export default NoAuthMenubar;