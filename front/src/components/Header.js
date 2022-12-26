import "./header.scss";
import { Link } from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {jwtUtils} from "../utils/jwtUtils";
import { useEffect, useState } from "react";
// import {setToken} from "../redux/reducers/AuthReducer";
import { Mobile, Pc } from '../pages/responsive';
import Popup from "reactjs-popup";
import React from "react";
import NoAuthMenubar from "./noAuthMenu"
import AuthMenubar from "./isAuthMenu"
import BurgerIcon from "./burgerIcon"
import "./index.css"

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "40px"
};
const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "80%",
  border: "none"
};

const Header = ({children, open, ...props}) => {
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
    <>
    <Pc>
      <div className="header-wrapper">
        <div className="header-title">
          <Link to="/">
            <img
              src = {`/title.png`}
              width = '50%'
              alt = 'title'
            />
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
      </Pc>
      
      {/* https://codesandbox.io/s/k2x7l5jy27?file=/src/Menu.js */}
      <Mobile>
      {isAuth ? (
            <>
              <div style={styles}>
                <Popup
                  modal
                  overlayStyle={{ background: "rgba(255,255,255,0.98)" }}
                  contentStyle={contentStyle}
                  closeOnDocumentClick={false}
                  trigger={open => <BurgerIcon open={open} />}
                >
                  {close => <AuthMenubar close={close} />}
              </Popup>
            </div>
            
            </>
          ) : (
            <>
              <div style={styles}>
                <Popup
                  modal
                  overlayStyle={{ background: "rgba(255,255,255,0.98)" }}
                  contentStyle={contentStyle}
                  closeOnDocumentClick={false}
                  trigger={open => <BurgerIcon open={open} />}
                >
                  {close => <NoAuthMenubar close={close} />}
                </Popup>
              </div>
            </>
          )}

      </Mobile>
    </>
  );
};

export default Header;
