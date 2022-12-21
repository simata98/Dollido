import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Stack from '@mui/material/Stack';
// import imgA from 'C:/bigproject/dollido/media/lost_image/halloween-g8058b6ce3_640.png';
// DataGrid의 컬럼을 하나하나씩 만들어준다
const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100,
    },
    {
        field: 'lstPrdtNm',
        headerName: 'Product Name',
        width: 200,
    },
    {
        field: 'lstFilePathImg',
        headerName: 'Image',
        width: 200,
        // headerAlign: 'center',
        align: 'center',
        // renderCell를 통해서 <img 이미지링크>를 받아준다
        renderCell: (params) => 
            <img src={params.value.split("/").pop()} height="100" alt = 'lstFilePathImg'/>
        // <img src={params.value.split("/").pop()} height="100" alt = 'lstFilePathImg'/>
        // renderCell: (params) => <img src='/halloween-g8058b6ce3_640.png' height="100" alt = 'lstFilePathImg'/>
    },
    {
        field: 'lstcontent',
        headerName: 'Subject',
        width: 300,
    },
    {
        field: 'lstPlace',
        headerName: 'Deposit Place',
        width: 200,
    },
    {
        field: 'lstYmd',
        headerName: 'Date',
        width: 150,
    },
    // {
    //     field: 'category',
    //     headerName: 'Category',
    //     width: 200,
    // },
    {
        field: 'create_date',
        headerName: 'creat_date',
        width: 150,
    },
];

// ID값의 유니크(key)값을 못찾아서 atcID를 ID key값으로 지정해주는 코드
const getRowId = row => row.id;

export default function MyDataGrid() {
    // response.data의 값을 tasks 안에 넣을려고 useState를 설정해줌
    const [tasks, setTasks] = useState([]);

    const handleRowClick = (params) => {
        localStorage.setItem("code2", params.row.id);
        window.location.href = '/dollidodetail';
      };
      
    // load tasks from the backend when the component is rendered
      useEffect(() => {
      axios
            // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
          .get('http://127.0.0.1:8000/post/')
          .then(response => {
          setTasks(response.data);
          });
      }, []);
    //   console.log(data)
    return (
        // display 
        <div style={{ marginTop: '5%', height: 800, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <DataGrid
              components={{
                NoRowsOverlay: () => (
                  <Stack height="100%" alignItems="center" justifyContent="center">
                    <img src='/loading.png' height="50%" alt = 'fdFilePathImg'/>
                    로딩중입니다! 잠시만 기다려주세요!
                  </Stack>
    )}}
                getRowHeight={() => 'auto'} // 자동으로 높이조절을 하는코드
                rows={tasks}    
                columns={columns}
                getRowId={getRowId}
                onRowClick={handleRowClick}
            />
        </div>
    );
}
