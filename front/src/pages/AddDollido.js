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



const AddDollido = () => {

  // 게시판 제목, 내용, 사진
  const [dollido_id, setDollido_id] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lstYmd, setLstYmd] = useState("");
  const [lstPlace, setLstPlace] = useState("");
  const [clrNm, setClrNm] = useState("");
  const [find_status, setFind_status] = useState(false);
  // const [writer, setWriter] = useState("");
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
      const response = await axios.post("http://localhost:8000/post/", formData);

      setDollido_id(response.data.id);
      setTitle(response.data.lstPrdtNm);
      setContent(response.data.lstcontent);
      setLstYmd(response.data.lstYmd);
      setLstPlace(response.data.lstPlace);
      setClrNm(response.data.clrNm);
      setFind_status(response.data.find_status);
      // setWriter(response.data.writer);

      window.alert("😎예측이 완료되었습니다😎");

    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      alert("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭");
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
    // formData2.append("writer", writer);

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    axios
      .put(`http://localhost:8000/post/${dollido_id}/`, formData2)
    window.alert("😎등록이 완료되었습니다😎");

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
                  <input
                    onChange={(e) => {
                      setLstPlace(e.target.value);
                    }}
                    disabled
                    className="text"
                    placeholder="습득장소"
                    value={lstPlace}
                  />
                  <Autocomplete
                    onChange={(event, newValue) => {
                      setClrNm(newValue);
                    }}
                    value={clrNm}
                    disablePortal
                    id="combo-box-demo"
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
                    disabled
                    value={find_status}
                  />
                  {/* <input
                    onChange={(e) => {
                      setWriter(e.target.value);
                    }}
                    disabled
                    className="text"
                    placeholder="작성자"
                    value={writer}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </Box>
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