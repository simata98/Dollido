import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {jwtUtils} from "../utils/jwtUtils";
import { useEffect, useState } from "react";
// import {setToken} from "../redux/reducers/AuthReducer";

const Header = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
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
      window.location.replace("/Signin");
    }
  }
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <Link to="/">
          <span>Duckgugong</span>
        </Link>
      </div>
      <div className="header-menu">
        <Link to="/">게시판</Link>
        <Link to="/about">글쓰기</Link>
        {isAuth ? (
          <>
            <Link to="/mydatagrid">내 게시물</Link>
            <Link to="#" onClick={onLogout}>로그아웃</Link>
          </>
        ) : (
          <>
            <Link to="/signin">로그인</Link>
            <Link to="/agreement">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;