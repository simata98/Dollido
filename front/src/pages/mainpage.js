import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './css/App.css';
import ReactCardSlider from 'react-card-slider-component';
// a slide object contains the image link, title and function/click event for when a user clicks on a card

import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Stack } from '@mui/system';
import Box from '@mui/material/Box';
import CountUp from 'react-countup';
import { blueGrey, red } from '@mui/material/colors';


export default function App() {


    const [tasks, setTasks] = useState([]);


    useEffect(() => {


        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
        axios
            // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
            .get('http://127.0.0.1:8000/post/')
            .then(response => {
                delete axios.defaults.headers.common['Authorization'];
                setTasks(response.data);
            });

    }, []);

    console.log(tasks)
    console.log(tasks.length)



    // ------------ map 함수 어떻게 쓸 지 내일 물어보기 ---------------------------

    // const num = tasks.map(task => task.id)
    // const item = num.map((a) => {
    //     // console.log(a);
    //     var dollidoimage = tasks[a]?.lstFilePathImg
    //     var dollidoimage2 = 'images/' + (dollidoimage || '').split("/").pop();

    //     // console.log('돌리도 테스트 : ', dollidoimage2);
    //     // console.log('돌리도 테스트 : ', tasks[a])

    // });
    // ---------------------------------------------------------------------------

    var dollidoimage10_1 = tasks[tasks.length - 10]?.lstFilePathImg
    var dollidoimage10_2 = 'images/' + (dollidoimage10_1 || '').split("/").pop();

    var dollidoimage9_1 = tasks[tasks.length - 9]?.lstFilePathImg
    var dollidoimage9_2 = 'images/' + (dollidoimage9_1 || '').split("/").pop();


    var dollidoimage8_1 = tasks[tasks.length - 8]?.lstFilePathImg
    var dollidoimage8_2 = 'images/' + (dollidoimage8_1 || '').split("/").pop();


    var dollidoimage7_1 = tasks[tasks.length - 7]?.lstFilePathImg
    var dollidoimage7_2 = 'images/' + (dollidoimage7_1 || '').split("/").pop();

    var dollidoimage6_1 = tasks[tasks.length - 6]?.lstFilePathImg
    var dollidoimage6_2 = 'images/' + (dollidoimage6_1 || '').split("/").pop();

    var dollidoimage5_1 = tasks[tasks.length - 5]?.lstFilePathImg
    var dollidoimage5_2 = 'images/' + (dollidoimage5_1 || '').split("/").pop();

    var dollidoimage4_1 = tasks[tasks.length - 4]?.lstFilePathImg
    var dollidoimage4_2 = 'images/' + (dollidoimage4_1 || '').split("/").pop();

    var dollidoimage3_1 = tasks[tasks.length - 3]?.lstFilePathImg
    var dollidoimage3_2 = 'images/' + (dollidoimage3_1 || '').split("/").pop();

    var dollidoimage2_1 = tasks[tasks.length - 2]?.lstFilePathImg
    var dollidoimage2_2 = 'images/' + (dollidoimage2_1 || '').split("/").pop();

    var dollidoimage1_1 = tasks[tasks.length - 1]?.lstFilePathImg
    var dollidoimage1_2 = 'images/' + (dollidoimage1_1 || '').split("/").pop();



    // console.log('돌리도 테스트 : ', dollidoimage2);


    const slides = [
        {
            image: dollidoimage10_2,
            title: tasks[tasks.length - 10]?.lstPrdtNm,
            description: tasks[tasks.length - 10]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 10].id);
                window.open(slides[0].link);

            }

        },

        {
            image: dollidoimage9_2,
            title: tasks[tasks.length - 9]?.lstPrdtNm,
            description: tasks[tasks.length - 9]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 9].id);
                window.open(slides[1].link);

            }

        },

        {
            image: dollidoimage8_2,
            title: tasks[tasks.length - 8]?.lstPrdtNm,
            description: tasks[tasks.length - 8]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 8].id);
                window.open(slides[2].link);

            }

        },

        {
            image: dollidoimage7_2,
            title: tasks[tasks.length - 7]?.lstPrdtNm,
            description: tasks[tasks.length - 7]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 7].id);
                window.open(slides[3].link);

            }

        },

        {
            image: dollidoimage6_2,
            title: tasks[tasks.length - 6]?.lstPrdtNm,
            description: tasks[tasks.length - 6]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 6].id);
                window.open(slides[4].link);

            }

        },

        {
            image: dollidoimage5_2,
            title: tasks[tasks.length - 5]?.lstPrdtNm,
            description: tasks[tasks.length - 5]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 5].id);
                window.open(slides[5].link);

            }

        },

        {
            image: dollidoimage4_2,
            title: tasks[tasks.length - 4]?.lstPrdtNm,
            description: tasks[tasks.length - 4]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 4].id);
                window.open(slides[6].link);
            }

        },

        {
            image: dollidoimage3_2,
            title: tasks[tasks.length - 3]?.lstPrdtNm,
            description: tasks[tasks.length - 3]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 3].id);
                window.open(slides[7].link);

            }

        },

        {
            image: dollidoimage2_2,
            title: tasks[tasks.length - 2]?.lstPrdtNm,
            description: tasks[tasks.length - 2]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 2].id);
                window.open(slides[8].link);
            }

        },

        {
            image: dollidoimage1_2,
            title: tasks[tasks.length - 1]?.lstPrdtNm,
            description: tasks[tasks.length - 1]?.lstYmd,
            link: `http://localhost:3000/dollidodetail`,

            clickEvent: () => {
                localStorage.setItem("code2", tasks[tasks.length - 1].id);
                window.open(slides[9].link);

            }

        },

    ]

    return (
        <Stack>
            <Box
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                }}
            >

                <div className='body'>
                    <h2 className='title'>돌리도 최근 게시물</h2>
                    <br></br>
                    <ReactCardSlider slides={slides} />

                </div>
            </Box>
            {/* <div className='body'>
                <h2 className='title'>돌리도 최근 게시물</h2>
                <br></br>
                <ReactCardSlider slides={slides} />

            </div> */}
            <Box 
                sx={{


                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                   
                }}
            >
                <div>
                    <h2 className="title2">수거함 위치</h2>
                    <Map className="map"
                        center={{ lat: 36.3452698, lng: 127.3842685 }}
                        style={{ width: "40%", height: "360px" }}>
                        <MapMarker position={{ lat: 36.3452698, lng: 127.3842685 }}>
                            <div style={{ color: "#000" }}>kt 탄방타워</div>
                        </MapMarker>
                    </Map>
                </div>

            </Box>

            {/* <div>
                <h2 className="title2">수거함 위치</h2>
                <Map className="map"
                    center={{ lat: 36.3452698, lng: 127.3842685 }}
                    style={{ width: "40%", height: "360px" }}>
                    <MapMarker position={{ lat: 36.3452698, lng: 127.3842685 }}>
                        <div style={{ color: "#000" }}>kt 탄방타워</div>
                    </MapMarker>
                </Map>
            </div> */}
            <Box
                sx={{


                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                   
                }}
            >
                <div className="count">
                    <h2>오늘의 돌리도 건수는?</h2>
                    <h1 className="count_content">
                        <CountUp
                            end={tasks.length}
                            duration={3}>
                        </CountUp>
                    </h1>
                </div>
            </Box>
        </Stack>

    );
}