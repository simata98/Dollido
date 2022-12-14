import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";



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

const theme = createTheme();

export default function SignIn() {
  let [inputEmail, setInputEmail] = useState("");
  let [inputPw, setInputPw] = useState("");

  const handleSubmit = (event) => {
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
          localStorage.setItem("token", res.data.token.access);
          localStorage.setItem("is_active", res.data.user.is_active);
          window.location.replace("/");
        } else {
          alert("이메일 인증이 필요합니다.");
          setInputEmail("");
          setInputPw("");
          localStorage.clear();
        }
      })
      .catch((err) => {
        alert("아이디 또는 비밀번호가 일치하지 않거나 없는 아이디 입니다.");
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="agreement" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}