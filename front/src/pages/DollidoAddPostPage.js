/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
const DollidoAddPostPage = () => {
  const navigate = useNavigate();
  // 게시판 제목, 내용, 사진
  const [dollido_id, setDollido_id] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lstYmd, setLstYmd] = useState("");
  const [lstPlace, setLstPlace] = useState("");
  const [clrNm, setClrNm] = useState("");
  const [find_status, setFind_status] = useState(false);
  const [writer_id, setWriter] = useState("");
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: uploadImg,
  });
  const canSubmit = useCallback(() => {
    return image.image_file;
  }, [image]);

  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };


  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("lstFilePathImg", image.image_file);
      setLoading(true);

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
      axios.defaults.withCredentials = true
      const response = await axios.post("http://localhost:8000/post/", formData);

      setDollido_id(response.data.id);
      setTitle(response.data.lstPrdtNm);
      setContent(response.data.lstcontent);
      setLstYmd(response.data.lstYmd);
      setLstPlace(response.data.lstPlace);
      setClrNm(response.data.clrNm);
      setWriter(response.data.writer_id);
    
      toast.success("😎예측이 완료되었습니다😎", {
        position: "top-right",
        autoClose: 1000,
      })
      setTimeout(() => 2000);

    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      console.log(e)
      toast.error("오류발생! 로그아웃 후 재로그인 해주세요!".concat("😭"), {
        position: "top-right",
        autoClose: 1000,
      })
    } finally {
      setLoading(false);
    }
  }, [canSubmit]);

  const handleSubmit2 = () => {
    console.log(clrNm)
    console.log(clrNm.label)
    delete axios.defaults.headers.common.Authorization;
    const formData2 = new FormData();
    formData2.append("lstPrdtNm", title);
    formData2.append("lstFilePathImg", image.image_file);
    formData2.append("lstcontent", content);
    formData2.append("lstYmd", lstYmd.slice(0, 10).replace(':', '-').replace(':', '-'));
    formData2.append("lstPlace", lstPlace);
    formData2.append("clrNm", clrNm);
    formData2.append("find_status", find_status);
    formData2.append("writer", writer_id);

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      .put(`http://localhost:8000/post/${dollido_id}/`, formData2)
      toast.success("😎등록이 완료되었습니다😎", {
        position: "top-right",
        autoClose: 1000,
      })
      setTimeout(() => window.location.href = "/dashboard/dollido", 2000);
  }

  const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '40vh',
    objectFit: 'contain',
    // position: 'cover',
  });

  return (
    <React.Fragment>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <ToastContainer /> */}
        <Typography variant="h4" sx={{ mb: 5 }}>
          분실물 신고하기
        </Typography>
        <ToastContainer />
        <Card>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={6} p={5}>
              <Stack direction="row" alignItems="center" justifyContent="space-around">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => inputRef.click()}
                >
                  업로드
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="success-button"
                  variant="contained"
                >
                  예측
                  &nbsp;
                </Button>
              </Stack>
              {/* <img alt="img" src={uploadImg} /> */}

              <Box height="xs" mt={2} sx={{ p: 1, border: '1px dashed grey' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={saveImage}
                  // eslint-disable-next-line
                  ref={(refParam) => (inputRef = refParam)}
                  style={{ display: "none" }}
                />
                <CardMedia
                  component="img"
                  width='100%'
                  height='100%'
                  image={image.preview_URL} // 사진이미지
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} p={5}>
              {loading &&
                <Box sx={{ // 화면 스크롤해도 가운데 고정
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                }}>
                  <CircularProgress size='5rem'/>
                </Box>
              }
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
                {canSubmit() ? (
                  <Button
                    onClick={handleSubmit2}
                    type="submit"
                    variant="contained"
                  // href='dollido'
                  >
                    &nbsp;&nbsp;&nbsp;등록
                    &nbsp;&nbsp;
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled
                  >
                    &nbsp;&nbsp;&nbsp;등록
                    &nbsp;&nbsp;
                  </Button>
                )}

              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </React.Fragment>
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

export default DollidoAddPostPage;