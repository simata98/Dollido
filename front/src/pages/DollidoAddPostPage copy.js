import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
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
  const [dollidoId, setDollidoId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lstYmd, setLstYmd] = useState("");
  const [lstPlace, setLstPlace] = useState("");
  const [clrNm, setClrNm] = useState("");
  const [findStatus, setFindStatus] = useState(false);
  const [writerId, setWriter] = useState("");
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState({
    image_file: "",
    previewURL: uploadImg,
  });

  const canSubmit = useCallback(() => {
    return image.image_file;
  }, [image]);

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
      // setFind_status(response.data.find_status);
      setWriter(response.data.writer_id);
      toast.success("😎예측이 완료되었습니다😎", {
        position: "top-center",
        autoClose: 1000,
      })
      setTimeout(() => 1000);
      // window.alert("😎예측이 완료되었습니다😎");

    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error("오류발생! 로그아웃 후 재로그인 해주세요!" + "😭", {
        position: "top-center",
        autoClose: 1000,
      })
      // alert("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭");
    } finally {
      setLoading(false);
    }
  }, [canSubmit]);

  const handleSubmit2 = () => {
    console.log(clrNm)
    console.log(clrNm.label)
    delete axios.defaults.headers.common['Authorization'];
    const formData2 = new FormData();
    formData2.append("lstPrdtNm", title);
    formData2.append("lstFilePathImg", image.image_file);
    formData2.append("lstcontent", content);
    formData2.append("lstYmd", lstYmd);
    formData2.append("lstPlace", lstPlace);
    formData2.append("clrNm", clrNm);
    formData2.append("find_status", find_status);
    formData2.append("writer", writer_id);

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      .put(`http://localhost:8000/post/${dollido_id}/`, formData2)
    window.alert("😎등록이 완료되었습니다😎");

  }

return (
  <>
    <Helmet>
      <title> Dashboard | Minimal UI </title>
    </Helmet>

    <Container maxWidth="xl">

      <Typography variant="h4" sx={{ mb: 5 }}>
        AddPOST
      </Typography>
      <Card>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item xs={12} sm={6} md={6} p={5}>
            <Button variant="contained" component="label" >
              Upload
              <input accept="image/*" type="file" onChange={saveImage} ref={inputRef} style={{ display: "none" }} />
            </Button>
            {/* <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" ref={(refParam) => (inputRef === refParam)} style={{ display: "none" }} />
                <PhotoCamera />
              </IconButton> */}
            <Button
              onClick={handleSubmit}
              className="success-button"
              variant="outlined"
            >
              예측하기😃
            </Button>
            {/* <img alt="img" src={uploadImg} /> */}
            <input
              type="file"
              accept="image/*"
              onChange={saveImage}
              style={{ display: "none" }}
            />

            <img alt='' src={image.preview_URL} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} p={5}>
            <div className="submitButton">
              {canSubmit() ? (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Button
                      onClick={handleSubmit2}
                      className="upload-button"
                      variant="outlined"
                      href='dollidolist'
                    >
                      등록하기😃
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Button
                  className="disable-button"
                  variant="outlined"
                  size="large"
                >
                  사진을 넣어주세요😭
                </Button>
              )}
            </div>
            <TextField
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              fullWidth
              className="title"
              placeholder="물품명"
              value={title}
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
            />
            <TextField
              label={'margin="none"'}
              onChange={(e) => {
                setLstPlace(e.target.value);
              }}
              fullWidth
              disabled
              className="text"
              placeholder="습득장소"
              value={lstPlace}
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