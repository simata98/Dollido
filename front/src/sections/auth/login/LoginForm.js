/* eslint-disable */

import axios from "axios";
import { useState } from 'react';
import cookies from 'react-cookies';
import { toast, ToastContainer } from 'react-toastify';

// @mui
import { Link, Stack, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        DOLLIDO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default function LoginForm() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  // const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();

    const user = {
      email: inputEmail,
      password: inputPw,
    };

    axios
      .post('http://localhost:8000/accounts/auth/', user)
      .then((res) => {
        if (res.data.token.access && res.data.user.is_active) {
          localStorage.clear();
          delete axios.defaults.headers.common.Authorization
          cookies.save("access", res.data.token.access)
          cookies.save("refresh", res.data.token.access)
          localStorage.setItem("token", res.data.token.access)
          localStorage.setItem("username", res.data.user.username.slice(0,-1) + '*')
          axios.defaults.headers.common.Authorization = 'Bearer '.concat(localStorage.getItem("token"));
          toast.success("로그인성공!".concat("😍"), {
            position: "top-right",
            autoClose: 1000,
          })
          setTimeout(()=>{window.location.href = "/"}, 2000);
        }
      })
      .catch((err) => {
        toast.error("등록되지 않은 계정이거나 유효하지 않은 계정입니다.".concat("😭"), {
          position: "top-right",
          autoClose:1000,
        })
        setInputEmail("");
        setInputPw("");
      });
  };

    // 입력한 이메일값
    const handleInputEmail = (e) => {
      setInputEmail(e.target.value);
    };
  
    // 입력한 패스워드값
    const handleInputPw = (e) => {
      setInputPw(e.target.value);
    };

  return (
    <>
      <ToastContainer/>
      <Stack spacing={3}>
        <TextField
          value={inputEmail}
          onChange={handleInputEmail}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          value={inputPw}
          onChange={handleInputPw}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
