import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// @mui
import { Container, Typography, Card, Stack, Grid, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// ---------------------------------------s-------------------------------
const StyledProductImg = styled('img')({
  top: 0,
  width: '30%',
  height: '30%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function DashboardAppPage() {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const link = 'http://127.0.0.1:8000/'.concat(location.pathname.split('/').at(-1))
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
          돌리도 상세 게시판
        </Typography>
        <Card>
          <Grid container direction="row" justifyContent="space-around" alignItems="center">
            
            <Grid item xs={12} sm={6} md={6} p={5}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                AddPOST
              </Typography>
              {/* <img alt="img" src={uploadImg} /> */}
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} p={5}>
              <Typography align="center" variant="h4" sx={{ mb: 3 }}>
                AddPOST
              </Typography>
              <Typography variant="h4" sx={{ mb: 3 }}>
                AddPOST
              </Typography>
              <Typography variant="h4" sx={{ mb: 3 }}>
                AddPOST
              </Typography>
              <TextField
                // error={!isName}
                // value={inputName}
                // onChange={handleInputName}
                margin="normal"
                label="user_Name"
                required
                fullWidth
                name="name"
                helperText="{nameMessage}"
                placeholder="홍길동"
                autoFocus
              />
              {/* <Typography variant="h4" sx={{ mb: 3 }}>
                &nbsp;
              </Typography> */}
              <Stack direction="row" alignItems="center" justifyContent="space-around">
                <Button
                  type="submit"
                  variant="contained"
                // sx={{ mt: 3, mb: 2 }}
                >
                  &nbsp;&nbsp;&nbsp;취소
                  &nbsp;&nbsp;

                </Button>
                <Button
                  type="submit"
                  variant="contained"
                // sx={{ mt: 3, mb: 2 }}
                >
                  &nbsp;&nbsp;&nbsp;등록
                  &nbsp;&nbsp;
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
