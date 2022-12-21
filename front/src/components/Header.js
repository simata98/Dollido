import "./header.scss";
import { Link } from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {jwtUtils} from "../utils/jwtUtils";
import { useEffect, useState } from "react";
// import {setToken} from "../redux/reducers/AuthReducer";

const Header = () => {
  // const dispatch = useDispatch();
  // const token = useSelector(state => state.Auth.token);
  const token = localStorage.getItem("token");
  const [isAuth, setIsAuth] = useState(false);


  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);
  const onLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.clear();
      alert("로그아웃 되었습니다😎");
      window.location.href = "/Signin";
    }
  }
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <Link to="/">
          <span>Dollido</span>
        </Link>
      </div>
      <div className="header-menu">
        {/* <Link to="/mydatagrid">게시판</Link>
        <Link to="/about">내 게시물</Link> */}
        {isAuth ? (
          <>
            <Link to="/mydatagrid">Lost112</Link>
            <Link to="/dollidolist">Dollido</Link>
            <Link to="/about">내 게시물</Link>
            <Link to="#" onClick={onLogout}>로그아웃</Link>
          </>
        ) : (
          <>
            <Link to="/signin">로그인</Link>
            <Link to="/agreement">회원가입</Link>
          </>
        )}

        <Link to="/about">about</Link>
      </div>
    </div>
  );
};

export default Header;
