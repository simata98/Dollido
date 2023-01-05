/* eslint-disable */

import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography, Box, Card, Link, Stack, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../components/iconify';
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';

// ---------------------------------------s-------------------------------
const StyledProductImg = styled('img')({
  top: 0,
  width: '70%',
  height: '70%',
  objectFit: 'cover',
  // position: 'absolute',
});


export default function DashboardAppPage() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(false);
  const [idstatus, setIdstatus] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const link = 'http://127.0.0.1:8000/post/'.concat(location.pathname.split('/').at(-1))

  // useEffect(() => {
  //   const getData = async () => {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
  //     const response = await axios.get(
  //       link
  //     );
  //     setTasks(response.data);
  //   };
  //   getData();
  // }, []);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
      .get(link)
      .then(response => {
        setTasks(response.data);
        setStatus(response.data.find_status)
        delete axios.defaults.headers.common['Authorization'];
        var writer = response.data.writer;
        const token = localStorage.getItem("token") // jwt token";
        var decoded = jwt_decode(token);
        if (parseInt(writer) === decoded.user_id) {
          setIdstatus(true)
        }
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      find_status: true,
    };

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios.defaults.withCredentials = true
    axios
      .post('http://localhost:8000/accounts/passmail/')
      toast.success("돌리도 보관함 비밀번호 전송 완료!".concat("😍"), {
        position: "top-right",
        autoClose: 1000,
      })

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      .put(`http://localhost:8000/post/${tasks.id}/`, user)
      .then(response => {
        setStatus(response.find_status)
        // form 초기화
        toast.success("😎회수요청😎", {
          position: "top-right",
          autoClose: 1000,
        })
        setTimeout(() => window.location.reload(), 2000);
      });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/post/${tasks.id}/`)
      .then(response => {
        // form 초기화
        toast.success("😎삭제완료😎", {
          position: "top-right",
          autoClose: 1000,
        })
        setTimeout(() => window.location.href = "/dashboard/dollido", 2000);
      }
      );
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();

    localStorage.setItem('postId', tasks.id)
    window.location.href = "editPost"
  };

  var dollidoimage = tasks.lstFilePathImg
  var dollidoimage2 = '../../../images/' + (dollidoimage || '').split("/").pop();

  return (
    <>
    <ToastContainer/>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          상세 게시판
        </Typography>
        <Card>
          <Grid container direction="row" justifyContent="space-around" alignItems="center">

            <Grid item xs={12} sm={6} md={6} p={5}>
              <StyledProductImg src={dollidoimage2} />
            </Grid>

            <Grid item xs={12} sm={6} md={6} p={5}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                {tasks.lstcontent}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                분류: {tasks.lstPrdtNm}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                습득일자: {tasks.lstYmd}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                색상:{tasks.clrNm}
              </Typography>
              <Button variant="outlined" sx={{ mb: 5 }} href={tasks.lstPlace}>
                보관장소 확인
              </Button>

              <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ mb: 3 }}>
                <Button onClick={handleSubmit3} variant="outlined" color="success" fullWidth>
                  수정
                </Button>
                <Button disabled={!idstatus} onClick={handleSubmit2} variant="outlined" color="error" fullWidth >
                  삭제
                </Button>
              </Stack>
              <Button variant="contained" fullWidth onClick={() => {
                  navigate(-1)
                }}>
                뒤로 가기
              </Button>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={handleSubmit}
                disabled={status}
                startIcon={<Iconify icon="ph:repeat" />}
              >
                회수
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
