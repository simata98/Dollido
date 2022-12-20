import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';


export default function MyDataGrid() {
    const [tasks, setTasks] = useState([]);
    const code = localStorage.getItem("code");
    useEffect(() => {
        axios
            // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
            .get(`http://127.0.0.1:8000/lost112/${code}`)
            .then(response => {
                setTasks(response.data);
                console.log(code)
            });
    }, []);

    console.log(tasks)

    return (
      <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={tasks.fdFilePathImg} height="100"/>
          <strong>atcId : {tasks.atcId}</strong>
          <strong>fdPrdtNm  : {tasks.fdPrdtNm }</strong>
          <strong>fdSbjt  : {tasks.fdSbjt }</strong>
          <strong>depPlace  : {tasks.depPlace }</strong>
          <strong>fdYmd  : {tasks.fdYmd }</strong>
          <strong>category  : {tasks.category }</strong>
          <strong>clrNm  : {tasks.clrNm }</strong>
        </Box>
      );
    }