// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
// import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import axios from "axios";
// import { minWidth } from '@mui/system';
// import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';


// const Editdollido = () => {

//   // 게시판 제목, 내용, 사진
//   const [dollido_id, setDollido_id] = useState(0);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [lstYmd, setLstYmd] = useState("");
//   // const [lstYmd, setLstYmd] = useState(dayjs('2022-01-01T21:11:54'));
//   const [lstPlace, setLstPlace] = useState("");
//   const [clrNm, setClrNm] = useState("");
//   const [find_status, setFind_status] = useState(false);
//   const [loading, setLoading] = useState(null);
//   const [image, setImage] = useState({
//     image_file: "",
//     preview_URL: "upload.png",
//   });
//   // const canSubmit = useCallback(() => {
//   //   return image.image_file !== "" && content !== "" && title !== "" && lstYmd !== "" && lstPlace !== "" && clrNm !== "";
//   // }, [image, title, content, lstYmd, lstPlace, clrNm]);

//   let inputRef;

//   const saveImage = (e) => {
//     e.preventDefault();
//     const fileReader = new FileReader();
//     if (e.target.files[0]) {
//       fileReader.readAsDataURL(e.target.files[0]);
//     }
//     fileReader.onload = () => {
//       setImage({
//         image_file: e.target.files[0],
//         preview_URL: fileReader.result,
//       });
//     };
//   };
//   console.log(image)
//   console.log(image.image_file)
//   useEffect(() => {
//     const code2 = localStorage.getItem("code2");
//     console.log(code2)
//     axios
//       // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
//       .get(`http://127.0.0.1:8000/post/${code2}/`)
//       .then(response => {
//         setDollido_id(response.data.id);
//         setTitle(response.data.lstPrdtNm);
//         setContent(response.data.lstcontent);
//         setLstYmd(response.data.lstYmd);
//         setLstPlace(response.data.lstPlace);
//         setClrNm(response.data.clrNm);
//         setFind_status(response.data.find_status);
//         // console.log(code2)
//         // console.log(status)
//       });
//   }, []);

//   const handleSubmit2 = () => {
//     console.log(clrNm)
//     const formData2 = new FormData();
//     formData2.append("lstPrdtNm", title);
//     formData2.append("lstFilePathImg", image.image_file);
//     formData2.append("lstcontent", content);
//     formData2.append("lstYmd", lstYmd);
//     formData2.append("lstPlace", lstPlace);
//     formData2.append("clrNm", clrNm.label);
//     formData2.append("find_status", find_status);
//     console.log(formData2)
//     console.log(dollido_id)
//     axios.put(`http://localhost:8000/post/${dollido_id}/`, formData2)
//     window.alert("😎수정이 완료되었습니다😎");
//   }



//   return (
//     <React.Fragment>
//       <Container fixed>
//         <Box
//           sx={{
//             marginTop: 30,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           {loading &&
//             <Box sx={{ display: 'flex' }}>
//               <CircularProgress />
//             </Box>
//           }
//           <div className="addBoard-wrapper">
//             <div className="addBoard-header">
//               게시물 등록하기 🖊️
//             </div>
//             <div className="submitButton">
//               <Button
//                 onClick={handleSubmit2}
//                 className="upload-button"
//                 variant="outlined"
//               >
//                 수정하기😃
//               </Button>
//             </div>
//             <div className="addBoard-body">
//               <div className="uploader-wrapper">
//                 <div>
//                   <img src={image.preview_URL} width="400px" />
//                   {/* <img src={image.image_file.name} /> */}
//                   {/* <img src="logo192.png" /> */}
//                 </div>
//                 {/* <div className="upload-button">
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => inputRef.click()}
//                   >
//                     😎사진 고르기😎
//                   </Button>
//                 </div> */}
//               </div>
//               <div>
//                 <div className="textArea-wrapper">
//                   <input
//                     onChange={(e) => {
//                       setTitle(e.target.value);
//                     }}
//                     className="title"
//                     placeholder="물품명"
//                     value={title}
//                   />
//                   <input
//                     onChange={(e) => {
//                       setContent(e.target.value);
//                     }}
//                     className="text"
//                     placeholder="습득물 상세설명"
//                     value={content}
//                   />
//                   <input
//                     onChange={(e) => {
//                       setLstYmd(e.target.value);
//                     }}
//                     className="text"
//                     placeholder="습득일자"
//                     value={lstYmd}
//                   />
//                   {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       label="Date"
//                       // inputFormat="MM/DD/YYYY"
//                       inputFormat="YYYY/MM/DD"
//                       value={lstYmd}
//                       onChange={(e) => {
//                         setLstYmd(e);
//                       }}
//                       renderInput={(params) => <TextField {...params} />}
//                     />
//                   </LocalizationProvider> */}
//                   <input
//                     onChange={(e) => {
//                       setLstPlace(e.target.value);
//                     }}
//                     className="text"
//                     placeholder="습득장소"
//                     value={lstPlace}
//                   />
//                   {/* <input
//                     onChange={(e) => {
//                       setClrNm(e.target.value);
//                     }}
//                     className="text"
//                     placeholder="색깔"
//                     value={clrNm}
//                   /> */}
//                   <Autocomplete
//                     onChange={(event, newValue) => {
//                       setClrNm(newValue);
//                     }}
//                     value={clrNm}
//                     disablePortal
//                     id="combo-box-demo"
//                     options={categorical}
//                     sx={{ width: 300 }}
//                     isOptionEqualToValue={(option, value) => option.id === value.id}
//                     renderInput={(params) => <TextField {...params} label="색깔" />}
//                   />
//                   <input
//                     onChange={(e) => {
//                       setFind_status(e.target.value);
//                     }}
//                     className="text"
//                     placeholder="현황"
//                     value={find_status}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Box>
//       </Container>
//     </React.Fragment >
//   );
// }



// const categorical = [
//   { label: '베이지색', id: 1 },
//   { label: '검정색', id: 2 },
//   { label: '파랑색', id: 3 },
//   { label: '갈색', id: 4 },
//   { label: '금색', id: 5 },
//   { label: '초록색', id: 6 },
//   { label: '회색', id: 7 },
//   { label: '밤색', id: 8 },
//   { label: '네이비색', id: 9 },
//   { label: '올리브색', id: 10 },
//   { label: '오렌지색', id: 11 },
//   { label: '핑크색', id: 12 },
//   { label: '보라색', id: 13 },
//   { label: '빨간색', id: 14 },
//   { label: '은색', id: 15 },
//   { label: '하얀색', id: 16 },
//   { label: '노란색', id: 17 }
// ]

// // const categorical = ['베이지색', '검정색', '파랑색', '갈색', '금색', '초록색', '회색', '밤색', '네이비색',
// //   '올리브색', '오렌지색', '핑크색', '보라색', '빨간색', '은색', '하얀색', '노란색']

// export default Editdollido;