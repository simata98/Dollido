/* eslint-disable */

import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
// @mui
import { Container, Typography, Box, Card, Link, Stack, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  const navigate = useNavigate();

  const location = useLocation();
  const link = 'http://127.0.0.1:8000/'.concat(location.pathname.split('/').at(-1))
  console.log(link)
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        link
      );
      setTasks(response.data);
    };
    getData();
  }, []);

  console.log(tasks)

  return (
    <>
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
              <StyledProductImg alt={tasks.atcId} src={tasks.fdFilePathImg} />
            </Grid>

            <Grid item xs={12} sm={6} md={6} p={5}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                {tasks.fdSbjt}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                분류: {tasks.category}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                습득일자: {tasks.fdYmd}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                색상:{tasks.clrNm}
              </Typography>
              <Typography variant="h6" sx={{ mb: 5 }}>
                보관장소: {tasks.depPlace}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  navigate(-1)
                }}
              >
                뒤로 가기
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
