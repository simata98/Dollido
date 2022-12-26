import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
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
  const [lstPlace, setLstPlace] = useState("");
  const [find_status, setFind_status] = useState(false);
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "logo192.png",
  });
  const canSubmit = useCallback(() => {
    return image.image_file !== "" && content !== "" && title !== "" && lstYmd !== "" && lstPlace !== "";
  }, [image, title, content, lstYmd, lstPlace]);

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
      await axios.post("http://localhost:8000/post/", formData);
      window.alert("😎등록이 완료되었습니다😎");
      navigate("/dollidolist");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      alert("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭");
    }

  }, [canSubmit]);


  return (
    <React.Fragment>
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
                <img src={image.preview_URL} />
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
                <input
                  onChange={(e) => {
                    setLstPlace(e.target.value);
                  }}
                  className="text"
                  placeholder="습득장소"
                  value={lstPlace}
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

    </React.Fragment>
  );
}

export default AddDollido;