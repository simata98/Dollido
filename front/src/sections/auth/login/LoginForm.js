import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';

// components
import Iconify from '../../../components/iconify';


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
          localStorage.setItem("token", res.data.token.access);
          localStorage.setItem("is_active", res.data.user.is_active);
          console.log(res.data.token.access)
          window.location.href = "/";
          // navigate('/dashboard', { replace: true });
        }
      })
      .catch((err) => {
        alert("없는 계정이거나, 이메일 인증이 필요합니다.");
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
      <Stack spacing={3}>
        {/* <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
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
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
