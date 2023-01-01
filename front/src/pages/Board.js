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

export default function MyDataGrid() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const code = localStorage.getItem("code");
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
      .get(`http://127.0.0.1:8000/lost112/${code}`)
      .then(response => {
        setTasks(response.data);
        console.log(code)
      });
  }, []);
  console.log(tasks)
  console.log(tasks.atcId)
  console.log(tasks.fdPrdtNm)
  console.log(tasks.fdFilePathImg)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: '100%',
        }}
      >
        <CardHeader
          avatar={
            <Avatar alt={tasks.fdPrdtNm} src={tasks.fdFilePathImg}>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={'[' + tasks.fdPrdtNm + '] ' + tasks.category} // 이름+카테고리
          subheader={'습득일자 : ' + tasks.fdYmd}// 년-월-일
        />
        <CardMedia
          component="img"
          height='100%'
          image={tasks.fdFilePathImg} // 사진이미지
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2">
            {'보관장소 : ' + tasks.depPlace}
            <br />
            <br />
            {tasks.fdSbjt}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
