import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


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

    return (
        <ul>
          {Object.entries(tasks).map(([key, value]) => (
            <li key={key}>
            <img src={value} height="100" />
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      );
    }