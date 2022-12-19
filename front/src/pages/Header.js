import "./header.scss";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Header = () => {
  // const token = useSelector(state => state.Auth.token);
  const token = localStorage.getItem("token")
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const logout = async () => {
    localStorage.clear();
    alert("로그아웃 되었습니다😎");
    window.location.replace("/");
  };

  return (
    <div className="header-wrapper">
      <div className="header-title">
        <Link to="/">
          <span>Dollido</span>
        </Link>
      </div>
      <div className="header-menu">
        <Link to="/board-list?page=1">HOME</Link>
        <Link to="/add-board">글쓰기</Link>
        {isAuth ? (
          <>
            <Link to="/myboard-list?page=1">내 게시물</Link>
            <Link to="#" onClick={logout}>로그아웃</Link>
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