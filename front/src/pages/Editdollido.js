import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import Grid from '@mui/material/Grid';



const Editdollido = () => {
    const code2 = localStorage.getItem("code2");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [lstYmd, setLstYmd] = useState("");
    const [lstPlace, setLstPlace] = useState("");
    const [clrNm, setClrNm] = useState("");
    const [find_status, setFind_status] = useState(false);
    // const [writer, setWriter] = useState("");
    const [tasks, setTasks] = useState([]);


    var dollidoimage = tasks.lstFilePathImg
    var dollidoimage2 = 'images/' + (dollidoimage || '').split("/").pop();


    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
        axios
            // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
            .get(`http://127.0.0.1:8000/post/${code2}/`)
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
        // formData2.append("lstFilePathImg", image.image_file);
        formData2.append("lstcontent", content);
        // formData2.append("lstYmd", lstYmd);
        // formData2.append("lstPlace", lstPlace);
        formData2.append("clrNm", clrNm);
        formData2.append("find_status", find_status);
        // formData2.append("writer", writer);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
        axios
            .put(`http://localhost:8000/post/${code2}/`, formData2)
        window.alert("😎수정이 완료되었습니다😎");
    }



    return (
        <React.Fragment>
            <Container fixed>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <div className="addBoard-wrapper">
                        <div className="addBoard-header">
                            게시물 수정하기 🖊️
                        </div>
                        <div className="submitButton">
                            <Grid item xs={4}>
                                <Button
                                    onClick={handleSubmit2}
                                    className="upload-button"
                                    variant="outlined"
                                    href='dollidolist'
                                >
                                    수정하기😃
                                </Button>
                            </Grid>
                        </div>
                        <div className="addBoard-body">
                            <div className="uploader-wrapper">
                                <div>
                                    <img src={dollidoimage2} width="400px" />
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
                                        disabled
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


export default Editdollido;