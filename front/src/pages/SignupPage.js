/* eslint-disable */
import { toast, ToastContainer } from 'react-toastify';

import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import axios from "axios";
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Button, TextField, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';

// ----------------------------------------------------------------------


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Sinup() {
  const mdUp = useResponsive('up', 'md');

  let [inputName, setInputName] = useState("");
  let [inputEmail, setInputEmail] = useState("");
  let [inputPw, setInputPw] = useState("");
  let [inputPwValidate, setInputPwValidate] = useState("");
  let [inputTel, setInputTel] = useState("");
  let [inputAddress, setInputAddress] = useState("");

  // 오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
  const [telMessage, setTelMessage] = useState("")
  const [addressMessage, setAddressMessage] = useState('')


  // 유효성 검사
  const [isName, setIsName] = useState(true)
  const [isEmail, setIsEmail] = useState(true)
  const [isPassword, setIsPassword] = useState(true)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true)
  const [isTel, setIsTel] = useState(true)
  const [isAddress, setIsAddress] = useState(true)


  const check = isName && isEmail && isPassword && isPasswordConfirm && isTel && isAddress
    && inputName && inputEmail && inputPw && inputPwValidate && inputTel && inputAddress;

  // name 입력값
  const handleInputName = (e) => {
    const nameRegex = /^[가-힣]{2,5}$/
    setInputName(e.target.value)
    if (!nameRegex.test(e.target.value)) {
      setNameMessage('한글 2글자 이상 5글자 이하로 입력해주세요.')
      setIsName(false)
    } else {
      setNameMessage('올바른 이름 형식입니다 :)')
      setIsName(true)
    }
  };

  // email 입력값
  const handleInputEmail = (e) => {
    const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )')
      setIsEmail(true)
    }
  };

  // pw 입력값
  const handleInputPw = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-~])(?=.*[0-9]).{8,25}$/
    setInputPw(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )')
      setIsPassword(true)
    }
  };

  // pw 입력값 (유효성검사용)
  const handleInputPwValidate = (e) => {
    setInputPwValidate(e.target.value);
    if (inputPw === e.target.value) {
      setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
      setIsPasswordConfirm(true)
    } else {
      setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
      setIsPasswordConfirm(false)
    }
  };

  // tel 입력값
  const handleInputTel = (e) => {
    const telRegex =
      /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
    setInputTel(e.target.value);
    if (!telRegex.test(e.target.value) && e.target.value.length === 11) {
      setTelMessage('숫자를 정확히 입력했어요 : )')
      setIsTel(true)
    } else {
      setTelMessage('핸드폰번호를 정확히 입력해주세요')
      setIsTel(false)
    }
  };

  // address 입력값-
  const handleInputAddress = (e) => {
    setInputAddress(e.target.value);
    if (e.target.value.length === 0) {
      setAddressMessage('주소를 입력해주세요')
      setIsAddress(false)
    } else {
      setAddressMessage('주소가 상세할수록 좋아요 : )')
      setIsAddress(true)
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: inputName,
      // password2: inputPwValidate,
      password: inputPw,
      email: inputEmail,
      tel: inputTel,
      address: inputAddress,
    };

    // register API 호출
    axios
      .post('http://localhost:8000/accounts/register/', user)
      .then((res) => {
        if (res.data.token.access) {
<<<<<<< Updated upstream
          toast.success("가입을 축하드립니다! 😎", {
            position: "top-center",
            autoClose: 1000,
=======
          console.log(res.data)
          toast.success("가입을 축하드립니다! 입력한메일주소로 메일인증을 진행해주세요" + "😍", {
            position: "top-right",
            autoClose: 2000,
>>>>>>> Stashed changes
          })
          setTimeout(() => window.location.href = "/login", 2000);
        } else {
          setInputName("");
          setInputEmail("");
          setInputPw("");
          setInputPwValidate("");
          setInputTel("");
          setInputAddress("");
          localStorage.clear();
        }
      })
      .catch((err) => {
        toast.error("가입에 실패했습니다. 다시 시도해주세요!" + "😭", {
          position: "top-center",
          autoClose: 2000,
        })
      });

    // window.location.href = "/";
  };
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            돌리도 서비스에 오신 것을<p></p>
            환영합니다!
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                회원가입
              </Typography>
              <ToastContainer />
              <TextField
                error={!isName}
                value={inputName}
                onChange={handleInputName}
                margin="normal"
                label="user_Name"
                required
                fullWidth
                name="name"
                helperText={nameMessage}
                placeholder="홍길동"
                autoFocus
              />
              <TextField
                error={!isEmail}
                value={inputEmail}
                onChange={handleInputEmail}
                margin="normal"
                label="Email Address"
                required
                fullWidth
                name="email"
                autoComplete="email"
                helperText={emailMessage}
                placeholder="ABCD@naver.com"
              />
              <TextField
                error={!isPassword}
                value={inputPw}
                onChange={handleInputPw}
                margin="normal"
                label="Password"
                type="password"
                required
                fullWidth
                name="password"
                autoComplete="current-password"
                helperText={passwordMessage}
              />
              <TextField
                error={!isPasswordConfirm}
                value={inputPwValidate}
                onChange={handleInputPwValidate}
                margin="normal"
                label="Password체크"
                type="password"
                required
                fullWidth
                name="password"
                autoComplete="current-password"
                helperText={passwordConfirmMessage}
              />
              <TextField
                error={!isTel}
                value={inputTel}
                onChange={handleInputTel}
                margin="normal"
                label="Tel"
                required
                fullWidth
                name="tel"
                helperText={telMessage}
                placeholder="01012345678"
              />
              <TextField
                error={!isAddress} // true면 빨간색으로 작동
                value={inputAddress}
                onChange={handleInputAddress}
                margin="normal"
                label="Address"
                required
                fullWidth
                name="address"
                helperText={addressMessage}
                placeholder="서울특별시 중구 세종대로 110 서울특별시청"
              />

              <Button
                onClick={onSubmit}
                disabled={!check} // true면 버튼 사라짐
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                가입하기
              </Button>
            </Box>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
