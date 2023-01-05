import "./header.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mobile, Pc } from '../pages/responsive';
import Popup from "reactjs-popup";
import React from "react";
import NoAuthMenubar from "./noAuthMenu"
import AuthMenubar from "./isAuthMenu"
import BurgerIcon from "./burgerIcon"
import "./index.css"
import cookies from 'react-cookies';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Header = ({ children, open, ...props }) => {
  const token = cookies.load('access');
  const [isAuth, setIsAuth] = useState(false);
  // const [myname, setMyname] = useState('');

  useEffect(() => {
  //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
  //   axios
  //     // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
  //     .get('http://127.0.0.1:8000/accounts/auth/')
  //     .then(response => {
  //       delete axios.defaults.headers.common['Authorization'];
  //       setMyname(response.data.username);
  //     });
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const onLogout = () => {
    const token = cookies.load('access');
    if (token) {
      cookies.remove('access');
      cookies.remove('refresh');
      localStorage.clear();
      delete axios.defaults.headers.common['Authorization'];
      toast.success("로그아웃 되었습니다😎", {
        position: "top-center",
        autoClose: 1000,
      })
      setTimeout(() => window.location.href = "/Signin", 2000);
    }
  }

  return (
    <>
      <Pc>
        <ToastContainer />
        <div className="header-wrapper">
          <div className="header-title">
            <Link to="/">
              <img
                src={`/title.png`}
                width='50%'
                alt='title'
              />
            </Link>
          </div>
          {/* <div>{myname}</div> */}
          <div className="header-menu">
            {isAuth ? (
              <>
                {/* <Link to="#">{myname}</Link> */}
                <Link to="/mydatagrid">Lost112</Link>
                <Link to="/dollidolist">Dollido</Link>
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
        <ToastContainer />
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
