import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import { minWidth } from '@mui/system';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import cookies from 'react-cookies';
import Cookies from 'js-cookie'

const AddDollido = () => {
  // const token = useSelector(state => state.Auth.token);
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  // 게시판 제목, 내용, 사진
  const [dollido_id, setDollido_id] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lstYmd, setLstYmd] = useState("");
  // const [lstYmd, setLstYmd] = useState(dayjs('2022-01-01T21:11:54'));
  const [lstPlace, setLstPlace] = useState("");
  const [clrNm, setClrNm] = useState("");
  const [find_status, setFind_status] = useState(false);
  const [writer, setWriter] = useState("");
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "upload.png",
  });
  const canSubmit = useCallback(() => {
    return image.image_file;
  }, [image]);
  // const canSubmit = useCallback(() => {
  //   return image.image_file !== "" && content !== "" && title !== "" && lstYmd !== "" && lstPlace !== "" && clrNm !== "";
  // }, [image, title, content, lstYmd, lstPlace, clrNm]);

  let inputRef;
  console.log(cookies.load('access'));
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
  console.log(image)
  console.log(image.image_file)

  const handleSubmit = useCallback(async () => {
    try {
      console.log(image.image_file)
      const formData = new FormData();
      // formData.append("lstPrdtNm", title);
      formData.append("lstFilePathImg", image.image_file);
      // formData.append("lstcontent", content);
      // formData.append("lstYmd", lstYmd);
      // formData.append("lstPlace", lstPlace);
      // formData.append("clrNm", clrNm);
      // formData.append("find_status", find_status);
      // formData.append("user_id", localStorage.getItem(token));
      // console.log(formData)
      // console.log(formData.append)
      // console.log(formData.get)
      // FormData의 key 확인
      // for (let key of formData.keys()) {
      //   console.log(key);
      // }

      // FormData의 value 확인
      for (let value of formData.values()) {
        console.log(value);
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
      axios.defaults.withCredentials = true
      const response = await axios.post("http://localhost:8000/post/", formData);
      // console.log("response >>", response.data);
      setDollido_id(response.data.id);
      setTitle(response.data.lstPrdtNm);
      setContent(response.data.lstcontent);
      setLstYmd(response.data.lstYmd);
      setLstPlace(response.data.lstPlace);
      setClrNm(response.data.clrNm);
      setFind_status(response.data.find_status);
      setWriter(response.data.writer);
      // delete axios.defaults.headers.common['Authorization'];
      console.log(response.data.id)
      // formData.set("lstPrdtNm", response.data.lstPrdtNm);
      // formData.set("lstFilePathImg", response.data.lstFilePathImg);
      // formData.set("lstcontent", response.data.lstcontent);
      // formData.set("lstYmd", response.data.lstYmd);
      // formData.set("lstPlace", response.data.lstPlace);
      // formData.set("clrNm", response.data.clrNm);
      // formData.set("find_status", response.data.find_status);
      // await axios.put(`http://localhost:8000/post/${response.data.id}/`, formData)
      delete axios.defaults.headers.common['Authorization'];
      window.alert("😎예측이 완료되었습니다😎");
      // navigate("/dollidolist");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      alert("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭");
    } finally {
      setLoading(false);
    }
  }, [canSubmit]);




  const handleSubmit2 = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
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
    formData2.append("writer", writer);

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      .put(`http://localhost:8000/post/${dollido_id}/`, formData2)
    window.alert("😎등록이 완료되었습니다😎");
    // window.location.href = "/dollidolist";
    for (let key of formData2.keys()) {
      console.log(key);
    }

    // FormData의 value 확인
    for (let value of formData2.values()) {
      console.log(value);
    }
  }



  return (
    <React.Fragment>
      <Container fixed>
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {loading &&
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          }
          <div className="addBoard-wrapper">
            <div className="addBoard-header">
              게시물 등록하기 🖊️
            </div>
            <div className="submitButton">
              {canSubmit() ? (
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Button
                      onClick={handleSubmit}
                      className="success-button"
                      variant="outlined"
                    >
                      예측하기😃
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      onClick={handleSubmit2}
                      className="upload-button"
                      variant="outlined"
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
            <div className="addBoard-body">
              <div className="uploader-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={saveImage}
                  ref={(refParam) => (inputRef = refParam)}
                  style={{ display: "none" }}
                />
                <div>
                  <img src={image.preview_URL} width="400px" />
                  {/* <img src={image.image_file.name} /> */}
                  {/* <img src="logo192.png" /> */}
                </div>
                <div className="upload-button">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => inputRef.click()}
                  >
                    😎사진 고르기😎
                  </Button>
                </div>
              </div>
              <div>
                <div className="textArea-wrapper">
                  <input
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="title"
                    placeholder="물품명"
                    value={title}
                  />
                  <input
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    className="text"
                    placeholder="습득물 상세설명"
                    value={content}
                  />
                  <input
                    onChange={(e) => {
                      setLstYmd(e.target.value);
                    }}
                    className="text"
                    placeholder="습득일자"
                    value={lstYmd}
                  />
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      // inputFormat="MM/DD/YYYY"
                      inputFormat="YYYY/MM/DD"
                      value={lstYmd}
                      onChange={(e) => {
                        setLstYmd(e);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider> */}
                  <input
                    onChange={(e) => {
                      setLstPlace(e.target.value);
                    }}
                    className="text"
                    placeholder="습득장소"
                    value={lstPlace}
                  />
                  {/* <input
                    onChange={(e) => {
                      setClrNm(e.target.value);
                    }}
                    className="text"
                    placeholder="색깔"
                    value={clrNm}
                  /> */}
                  <Autocomplete
                    onChange={(event, newValue) => {
                      setClrNm(newValue);
                    }}
                    value={clrNm}
                    // label={clrNm}
                    disablePortal
                    id="combo-box-demo"
                    // options={categorical}
                    options={categorical.map((option) => option.label)}
                    sx={{ width: 300 }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="색깔" />}
                  />
                  <input
                    onChange={(e) => {
                      setFind_status(e.target.value);
                    }}
                    className="text"
                    placeholder="현황"
                    value={find_status}
                  />
                  <input
                    onChange={(e) => {
                      setWriter(e.target.value);
                    }}
                    disabled
                    className="text"
                    placeholder="작성자"
                    value={writer}
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment >
  );
}



// const categorical = [
//   { label: '베이지색', value: '베이지색', id: 1 },
//   { label: '검정색', value: '검정색', id: 2 },
//   { label: '파랑색', value: '파랑색', id: 3 },
//   { label: '갈색', value: '갈색', id: 4 },
//   { label: '금색', value: '금색', id: 5 },
//   { label: '초록색', value: '초록색', id: 6 },
//   { label: '회색', value: '회색', id: 7 },
//   { label: '밤색', value: '밤색', id: 8 },
//   { label: '네이비색', value: '네이비색', id: 9 },
//   { label: '올리브색', value: '올리브색', id: 10 },
//   { label: '오렌지색', value: '오렌지색', id: 11 },
//   { label: '핑크색', value: '핑크색', id: 12 },
//   { label: '보라색', value: '보라색', id: 13 },
//   { label: '빨간색', value: '빨간색', id: 14 },
//   { label: '은색', value: '은색', id: 15 },
//   { label: '하얀색', value: '하얀색', id: 16 },
//   { label: '노란색', value: '노란색', id: 17 }
// ]
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

// const categorical = ['베이지색', '검정색', '파랑색', '갈색', '금색', '초록색', '회색', '밤색', '네이비색',
//   '올리브색', '오렌지색', '핑크색', '보라색', '빨간색', '은색', '하얀색', '노란색']

export default AddDollido;