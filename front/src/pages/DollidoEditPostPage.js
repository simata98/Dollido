/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

// @mui
import { Container, Typography, Box, Card, Link, Stack, Input, Grid, Button, TextField, CircularProgress, Autocomplete, CardMedia, IconButton } from '@mui/material';
// import { Image } from 'mui-image'
import { styled } from '@mui/material/styles';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Iconify from '../components/iconify';
import uploadImg from '../images/upload.png';

// ---------------------------------------s-------------------------------
const DollidoEditPostPage = () => {
  const navigate = useNavigate();
  // 게시판 제목, 내용, 사진
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lstYmd, setLstYmd] = useState("");
  const [lstPlace, setLstPlace] = useState("");
  const [clrNm, setClrNm] = useState("");
  const [find_status, setFind_status] = useState(false);

  var dollidoimage = tasks.lstFilePathImg
  var dollidoimage2 = '../../../images/' + (dollidoimage || '').split("/").pop();

  const link = 'http://127.0.0.1:8000/post/'.concat(localStorage.getItem('postId'))
  console.log(link)

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
        // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
        .get(link)
        .then(response => {
            setTasks(response.data);
            setTitle(response.data.lstPrdtNm);
            setContent(response.data.lstcontent);
            setLstYmd(response.data.lstYmd);
            setLstPlace(response.data.lstPlace);
            setClrNm(response.data.clrNm);
            setFind_status(response.data.find_status);
            delete axios.defaults.headers.common['Authorization'];
        });
}, []);

  const handleSubmit2 = () => {
    delete axios.defaults.headers.common['Authorization'];
        const formData2 = new FormData();
        formData2.append("lstPrdtNm", title);
        formData2.append("lstcontent", content);
        formData2.append("clrNm", clrNm);
        formData2.append("find_status", find_status);

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      .put(link + '/', formData2)
      toast.success("😎수정이 완료되었습니다😎", {
        position: "top-right",
        autoClose: 1000,
      })    // navigate(-1)
      setTimeout(() => window.location.href = "/dashboard/dollido",  2000);

  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <ToastContainer />
        <Typography variant="h4" sx={{ mb: 5 }}>
          분실물 신고하기
        </Typography>
        <Card>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={6} p={5}>
              <Box height="xs" mt={2} sx={{ p: 1, border: '1px dashed grey' }}>
              <CardMedia
                  component="img"
                  width='100%'
                  height='100%'
                  image={dollidoimage2} // 사진이미지
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} p={5}>
              <TextField
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                fullWidth
                className="title"
                placeholder="물품명"
                value={title}
                margin="normal"
              />
              <Autocomplete
                onChange={(event, newValue) => {
                  setClrNm(newValue);
                }}
                fullWidth
                value={clrNm}
                disablePortal
                id="combo-box-demo"
                options={categorical.map((option) => option.label)}
                sx={{ width: 300 }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="색깔" />}
                margin="dense"
              />
              <TextField
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                fullWidth
                multiline
                rows={3}
                className="text"
                placeholder="습득물 상세설명"
                value={content}
                margin="dense"
              />
              <TextField
                onChange={(e) => {
                  setLstYmd(e.target.value);
                }}
                fullWidth
                disabled
                className="text"
                placeholder="습득일자"
                value={lstYmd}
                margin="dense"
              />
              <TextField
                onChange={(e) => {
                  setLstPlace(e.target.value);
                }}
                fullWidth
                disabled
                className="text"
                placeholder="습득장소"
                value={lstPlace}
                margin="dense"
              />

              <Stack direction="row" alignItems="center" justifyContent="space-around">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    navigate(-1)
                  }}
                // sx={{ mt: 3, mb: 2 }}
                >
                  &nbsp;&nbsp;&nbsp;취소
                  &nbsp;&nbsp;
                </Button>
                <Button
                        onClick={handleSubmit2}
                        type="submit"
                        variant="contained"
                      // href='dollido'
                      >
                        &nbsp;&nbsp;&nbsp;수정
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

const categorical = [
  { label: '베이지색', id: 1 },
  { label: '검정색', id: 2 },
  { label: '파랑색', id: 3 },
  { label: '갈색', id: 4 },
  { label: '금색', id: 5 },
  { label: '초록색', id: 6 },
  { label: '회색', id: 7 },
  { label: '밤색', id: 8 },
  { label: '네이비색', id: 9 },
  { label: '올리브색', id: 10 },
  { label: '오렌지색', id: 11 },
  { label: '핑크색', id: 12 },
  { label: '보라색', id: 13 },
  { label: '빨간색', id: 14 },
  { label: '은색', id: 15 },
  { label: '하얀색', id: 16 },
  { label: '노란색', id: 17 }
]

export default DollidoEditPostPage;