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

const AddDollido = () => {
  // const token = useSelector(state => state.Auth.token);
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lstYmd, setLstYmd] = useState("");
  // const [lstYmd, setLstYmd] = useState(dayjs('2022-01-01T21:11:54'));
  const [lstPlace, setLstPlace] = useState("");
  const [clrNm, setClrNm] = useState("");
  const [find_status, setFind_status] = useState(false);
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
  // console.log(image)
  // console.log(image.image_file)

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("lstPrdtNm", title);
      formData.append("lstFilePathImg", image.image_file);
      formData.append("lstcontent", content);
      formData.append("lstYmd", lstYmd);
      formData.append("lstPlace", lstPlace);
      formData.append("clrNm", clrNm);
      formData.append("find_status", find_status);
      // formData.append("user_id", localStorage.getItem(token));
      console.log(formData)
      console.log(formData.append)
      console.log(formData.get)
      // FormData의 key 확인
      for (let key of formData.keys()) {
        console.log(key);
      }

      // FormData의 value 확인
      for (let value of formData.values()) {
        console.log(value);
      }
      const response = await axios.post("http://localhost:8000/post/", formData);
      console.log("response >>", response.data);
      setClrNm(response.data.clrNm);
      console.log(response.data.id)
      formData.set("lstPrdtNm", response.data.lstPrdtNm);
      formData.set("lstFilePathImg", response.data.lstFilePathImg);
      formData.set("lstcontent", response.data.lstcontent);
      formData.set("lstYmd", response.data.lstYmd);
      formData.set("lstPlace", response.data.lstPlace);
      formData.set("clrNm", response.data.clrNm);
      formData.set("find_status", response.data.find_status);
      await axios.put(`http://localhost:8000/post/${response.data.id}/`, formData)
      window.alert("😎등록이 완료되었습니다😎");
      // navigate("/dollidolist");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      alert("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭");
    }

  }, [canSubmit]);


  return (
    <React.Fragment>
      <Container fixed>
        <Box
          sx={{
            marginTop: 30, marginLeft: 30
          }}
        >
          <div className="addBoard-wrapper">
            <div className="addBoard-header">
              게시물 등록하기 🖊️
            </div>
            <div className="submitButton">
              {canSubmit() ? (
                <Button
                  onClick={handleSubmit}
                  className="success-button"
                  variant="outlined"
                >
                  등록하기😃
                </Button>
              ) : (
                <Button
                  className="disable-button"
                  variant="outlined"
                  size="large"
                >
                  사진과 내용을 모두 입력하세요😭
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
                    freeSolo
                    onChange={(e) => {
                      setClrNm(e.target.value);
                    }}
                    value={clrNm}
                    disablePortal
                    id="combo-box-demo"
                    options={categorical}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="색깔" />}
                  // renderInput={(clrNm) => <TextField {...clrNm} label="색깔" />}
                  />
                  <input
                    onChange={(e) => {
                      setFind_status(e.target.value);
                    }}
                    className="text"
                    placeholder="현황"
                    value={find_status}
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
//   { label: 'black' },
//   { label: 'blue' },
//   { label: 'brown' },
//   { label: 'gray' },
//   { label: 'green' },
//   { label: 'navy' },
//   { label: 'orange' },
//   { label: 'pink' },
//   { label: 'purple' },
//   { label: 'red' },
//   { label: 'skyblue' },
//   { label: 'violet' },
//   { label: 'white' },
//   { label: 'yellow' }
// ]

const categorical = ['베이지색', '검정색', '파랑색', '갈색', '금색', '초록색', '회색', '밤색', '네이비색',
  '올리브색', '오렌지색', '핑크색', '보라색', '빨간색', '은색', '하얀색', '노란색']

export default AddDollido;