import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import { Mobile, Pc } from '../pages/responsive';

const AddDollido = () => {

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
    preview_URL: "upload.png",
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
    <React.Fragment>
      <Container maxWidth='xl' fixed>
        <ToastContainer />
        {loading &&
          <Box sx={{ // 화면 스크롤해도 가운데 고정
            position: 'fixed',
            top: '50%',
            left: '50%',
          }}>
            <CircularProgress />
          </Box>
        }
        <Pc>
          <Grid container spacing={2} alt="카드 두개구분 화면 반으로 나누기">
            {/* <Grid item xs={6} sm={6} md alt="카드 1번 구역"> */}
            <Box
              sx={{
                mt: '5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // maxHeight: '700px',
                // maxWidth: '700px',
                width: '50%',
                alt: "박스라는 카드 1번 틀 생성"
              }}
            >
              <Card alt="카드 1번">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => inputRef.click()}
                      >
                        😎사진 고르기😎
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        onClick={handleSubmit}
                        className="success-button"
                        variant="outlined"
                      >
                        예측하기😃
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={saveImage}
                  ref={(refParam) => (inputRef = refParam)}
                  style={{ display: "none" }}
                />
                <CardMedia
                  component="img"
                  width='100%'
                  height='100%'
                  image={image.preview_URL} // 사진이미지
                />
                {/* <StyledProductImg src={image.preview_URL} /> */}
              </Card>
            </Box>
            {/* </Grid> */}
            {/* <Grid item xs={6}> */}
            <Box
              sx={{
                mt: '5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // maxHeight: '700px',
                // maxWidth: '700px',
                width: '50%',
                alt: "박스라는 카드 1번 틀 생성"
              }}
            >
              <Card>
                <Stack spacing={2}>
                  {/* <div className="addBoard-wrapper"> */}
                  <div className="addBoard-header">
                    게시물 등록하기 🖊️
                  </div>
                  <div className="submitButton">
                    {canSubmit() ? (
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                        </Grid>
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
                  {/* <Grid container spacing={2}> */}
                  <Box >
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
                      onChange={(e) => {
                        setLstPlace(e.target.value);
                      }}
                      fullWidth
                      disabled
                      className="text"
                      placeholder="습득장소"
                      value={lstPlace}
                    />
                  </Box>
                  {/* </Grid> */}
                  {/* </div> */}
                </Stack>
              </Card>
            </Box>
            {/* </Grid> */}
          </Grid>
        </Pc>
        <Mobile>
          <Grid container spacing={2} alt="카드 두개구분 화면 반으로 나누기">
            {/* <Grid item xs={6} sm={6} md alt="카드 1번 구역"> */}
            <Box
              sx={{
                mt: '5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // maxHeight: '700px',
                maxWidth: '700px',
                height:'100%',
                // width: '50%',
                alt: "박스라는 카드 1번 틀 생성"
              }}
            >
              <Card alt="카드 1번">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => inputRef.click()}
                      >
                        😎사진 고르기😎
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        onClick={handleSubmit}
                        className="success-button"
                        variant="outlined"
                      >
                        예측하기😃
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={saveImage}
                  ref={(refParam) => (inputRef = refParam)}
                  style={{ display: "none" }}
                />
                <CardMedia
                  component="img"
                  width='100%'
                  height='100%'
                  image={image.preview_URL} // 사진이미지
                />
                {/* <StyledProductImg src={image.preview_URL} /> */}
              </Card>
            </Box>
            {/* </Grid> */}
            {/* <Grid item xs={6}> */}
            <Box
              sx={{
                mt: '5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // maxHeight: '700px',
                maxWidth: '700px',
                // width: '50%',
                height:'100%',
                alt: "박스라는 카드 1번 틀 생성"
              }}
            >
              <Card>
                <Stack spacing={2}>
                  {/* <div className="addBoard-wrapper"> */}
                  <div className="addBoard-header">
                    게시물 등록하기 🖊️
                  </div>
                  <div className="submitButton">
                    {canSubmit() ? (
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                        </Grid>
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
                  {/* <Grid container spacing={2}> */}
                  <Box >
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
                      onChange={(e) => {
                        setLstPlace(e.target.value);
                      }}
                      fullWidth
                      disabled
                      className="text"
                      placeholder="습득장소"
                      value={lstPlace}
                    />
                  </Box>
                  {/* </Grid> */}
                  {/* </div> */}
                </Stack>
              </Card>
            </Box>
            {/* </Grid> */}
          </Grid>
        </Mobile>
      </Container>
    </React.Fragment >
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

export default AddDollido;