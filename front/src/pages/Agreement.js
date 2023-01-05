/* eslint-disable */

import { Helmet } from 'react-helmet-async';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Button, Box, TextField, TextareaAutosize, Checkbox, FormControlLabel } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
// import {CssBaseline, Box, TextareaAutosize, Checkbox, FormControlLabel, createTheme, ThemeProvider} from '@mui/material';
// import Box from '@mui/material/Box';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const clickMe = () => {
  window.location.href = '/Signup'
}

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [setChecked3] = React.useState(false);

  const handleChange1 = (e) => {
    setChecked1(e.target.checked);
  };

  const handleChange2 = (e) => {
    setChecked2(e.target.checked);
  };

  const handleChange3 = (e) => {
    setChecked3(e.target.checked);
  };

  return (
    <>
      <Helmet>
        <title> Agreement | Dollido UI </title>
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

        <Container maxWidth="md">
          <StyledContent>
            {/* <Container component="main" maxWidth="md"> */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

              }}
            >
              <Typography variant="h2" gutterBottom>
                개인 정보 제공 동의
              </Typography>
              <TextField
                multiline
                fullWidth
                maxRows={5}
                value="③ 회사는 다음 각 호에 해당하는 신청에 대해서 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.
            - 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우
            - 제3자의 전자우편 주소를 이용하여 신청한 경우
            - 허위의 정보를 기재하거나, 회사가 필수적으로 입력을 요청한 부분을 기재하지 않은 경우
            - 부정한 용도로 서비스를 사용하고자 하는 경우
            - 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우
            - 회사의 정책에 적합하지 않는 회원으로 판단되는 경우나 서비스 제공이 곤란한 경우
            - 회원의 이용 목적이나 서비스 이용 방법이 회사의 재산권이나 영업권을 침해하거나 침해할 우려가 있는 경우
            - 비정상적인 방법을 통하여 아이디 및 도메인을 대량으로 생성하는 행위"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={checked1} onChange={handleChange1} />
                }
                label="동의하시겠습니까?" />
              <TextField
                multiline
                fullWidth
                maxRows={5}
                value="③ 회사는 다음 각 호에 해당하는 신청에 대해서 승낙하지 않거나 사후에 이용계약을 해지할 수 있습니다.
            - 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우
            - 제3자의 전자우편 주소를 이용하여 신청한 경우
            - 허위의 정보를 기재하거나, 회사가 필수적으로 입력을 요청한 부분을 기재하지 않은 경우
            - 부정한 용도로 서비스를 사용하고자 하는 경우
            - 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우
            - 회사의 정책에 적합하지 않는 회원으로 판단되는 경우나 서비스 제공이 곤란한 경우
            - 회원의 이용 목적이나 서비스 이용 방법이 회사의 재산권이나 영업권을 침해하거나 침해할 우려가 있는 경우
            - 비정상적인 방법을 통하여 아이디 및 도메인을 대량으로 생성하는 행위"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={checked2} onChange={handleChange2} />
                }
                label="동의하시겠습니까?" />
              <FormControlLabel
                control={
                  <Button
                    disabled={!checked1 || !checked2}
                    variant='contained'
                    onChange={handleChange3}
                    onClick={clickMe}
                  >누르세요 </Button>
                }
              />
            </Box>
            <Copyright sx={{ mt: 5 }} />
            {/* </Container> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
