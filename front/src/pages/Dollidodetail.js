import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
// import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';
import { Mobile, Pc } from '../pages/responsive';

export default function Dollidodetail() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(false);
  const [idstatus, setIdstatus] = useState(false);
  var dollidoimage = tasks.lstFilePathImg
  var dollidoimage2 = 'images/' + (dollidoimage || '').split("/").pop();

  // toast.error("오류발생! 위치정보가 제공되지 않아요!" + "😭", {
  //   position: "top-center",
  //   autoClose: 1000,
  // })

  useEffect(() => {
    const code2 = localStorage.getItem("code2");
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
      .get(`http://127.0.0.1:8000/post/${code2}/`)
      .then(response => {
        console.log(response.data)
        setTasks(response.data);
        setStatus(response.data.find_status)
        delete axios.defaults.headers.common['Authorization'];
        var writer = localStorage.getItem("writer");
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
    axios
      .put(`http://localhost:8000/post/${tasks.id}/`, user)
      .then(response => {
        setStatus(response.find_status)
        // form 초기화
        // alert('회수요청');
        // window.location.reload();
        toast.success("😎찾기요청이 완료되었습니다.😎", {
          position: "top-center",
          autoClose: 2000,
        })
        setTimeout(() => window.location.reload(), 2000);
        // window.location.reload();
      });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/post/${tasks.id}/`)
      .then(response => {
        // form 초기화
        alert('삭제완료')
        window.location.href = "/dollidolist";
      }
      );
  };

  console.log(tasks.lstPlace)
  const handleClick = () => {
    toast.error("오류발생! 위치보기가 제공되지 않아요!" + "😭", {
      position: "top-center",
      autoClose: 1000,
    })
  };


  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ToastContainer />
      <Card
        sx={{
          maxWidth: '500px',
        }}
      >
        <CardHeader
          avatar={
            <Avatar alt={tasks.lstPrdtNm} src={dollidoimage2}>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={'[' + tasks.lstPrdtNm + '] '} // 이름+카테고리
          subheader={'습득일자 : ' + tasks.lstYmd}// 년-월-일
        />
        <CardMedia
          // style="filter:grayscale(100%)"
          component="img"
          height='100%'
          image={dollidoimage2} // 사진이미지
          alt="Paella dish"
        />
        <CardContent>
          <Typography mb={2} variant="body2">
            {tasks.lstcontent}
            <br />
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              {
                tasks.lstPlace == '탐지되지 않은 위치' ?
                  // <Button onClick={handleClick} target='_blank' variant="contained" href={tasks.lstPlace}>
                  <Button onClick={handleClick} target='_blank' variant="contained">
                    위치 보기
                  </Button> :
                  <Button target='_blank' variant="contained" href={tasks.lstPlace}>
                    위치 보기
                  </Button>
              }
              {/* <Button target='_blank' variant="contained" href={tasks.lstPlace}>
                위치 보기
              </Button> */}
            </Grid>
            <Grid item xs={3} md={2}>
              <Button disabled={!idstatus} href='/editdollido' variant="contained">
                수정
              </Button>
            </Grid>
            <Grid item xs={3} md={2}>
              <Button
                disabled={!idstatus}
                onClick={handleSubmit2}
                variant="contained"
                color='error'
                href='/dollidolist'
              >
                삭제
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Pc>
        <Box component="form" onSubmit={handleSubmit}
          sx={{ position: 'fixed', left: 20, bottom: 35, display: 'flex', flexDirection: 'column' }}>
          <Fab sx={{ width: 100, height: 100 }} disabled={status} type="submit" color='primary' aria-label="add">
            <AutorenewIcon sx={{ fontSize: 50 }} />
          </Fab>
        </Box>
      </Pc>
      <Mobile>
        <Box component="form" onSubmit={handleSubmit}
          sx={{ position: 'fixed', left: 20, bottom: 35, display: 'flex', flexDirection: 'column' }}>
          <Fab disabled={status} type="submit" size='medium' color='primary' aria-label="add">
            <AutorenewIcon />
          </Fab>
        </Box>
      </Mobile>
    </Box >
  );
}
