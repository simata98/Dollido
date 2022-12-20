import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

// DataGrid의 컬럼을 하나하나씩 만들어준다
const columns = [
    {
        field: 'atcId',
        headerName: 'ID',
        width: 100,
    },
    {
        field: 'fdPrdtNm',
        headerName: 'Product Name',
        width: 200,
    },
    {
        field: 'fdFilePathImg',
        headerName: 'Image',
        width: 200,
        // renderCell를 통해서 <img 이미지링크>를 받아준다
        renderCell: (params) => <img src={params.value} height="100" />
    },
    {
        field: 'fdSbjt',
        headerName: 'Subject',
        width: 300,
    },
    {
        field: 'depPlace',
        headerName: 'Deposit Place',
        width: 200,
    },
    {
        field: 'fdYmd',
        headerName: 'Date',
        width: 150,
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 200,
    },
    {
        field: 'clrNm',
        headerName: 'Color',
        width: 150,
    },
];

// ID값의 유니크(key)값을 못찾아서 atcID를 ID key값으로 지정해주는 코드
const getRowId = row => row.atcId;

export default function MyDataGrid() {
    // response.data의 값을 tasks 안에 넣을려고 useState를 설정해줌
    const [tasks, setTasks] = useState([]);

    const handleRowClick = (params) => {
        localStorage.setItem("code", params.row.atcId);
        window.location.href = '/board';
      };
      
    // load tasks from the backend when the component is rendered
      useEffect(() => {
      axios
            // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
          .get('http://127.0.0.1:8000/lost112/')
          .then(response => {
          setTasks(response.data);
          });
      }, []);
    //   console.log(data)
    return (
        // display 
        <div style={{ marginTop: '5%', height: 800, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <DataGrid
                getRowHeight={() => 'auto'} // 자동으로 높이조절을 하는코드
                rows={tasks}    
                columns={columns}
                getRowId={getRowId}
                onRowClick={handleRowClick}
            />
        </div>
    );
}