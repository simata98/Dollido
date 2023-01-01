import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './css/App.css';
import ReactCardSlider from 'react-card-slider-component';
// a slide object contains the image link, title and function/click event for when a user clicks on a card


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

    const sliderClick = (slider) => {
        alert("상세페이지로 이동하시겠습니까?")
        localStorage.setItem("code2", tasks[0].id);
        window.location.href = '/dollidodetail';
    }

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


    var dollidoimage = tasks[0]?.lstFilePathImg
    var dollidoimage2 = 'images/' + (dollidoimage || '').split("/").pop();

    var dollidoimage_1 = tasks[5]?.lstFilePathImg
    var dollidoimage3 = 'images/' + (dollidoimage_1 || '').split("/").pop();

    // console.log('돌리도 테스트 : ', dollidoimage2);


    const slides = [
        {
            image: dollidoimage2,
            title: tasks[0]?.lstPrdtNm,
            description: tasks[0]?.lstYmd, clickEvent: sliderClick,
        },
        {
            image: dollidoimage3,
            title: tasks[5]?.lstPrdtNm,
            description: tasks[5]?.lstYmd, clickEvent: sliderClick,
        },
        {
            image: dollidoimage2,
            title: tasks[2]?.lstPrdtNm,
            description: tasks[2]?.lstYmd, clickEvent: sliderClick,
        },
        {
            image: dollidoimage2,
            title: tasks[3]?.lstPrdtNm,
            description: tasks[3]?.lstYmd, clickEvent: sliderClick,
        },
        {
            image: dollidoimage2,
            title: tasks[4]?.lstPrdtNm,
            description: tasks[4]?.lstYmd, clickEvent: sliderClick,
        },
        {
            image: dollidoimage2,
            title: tasks[4]?.lstPrdtNm,
            description: tasks[4]?.lstYmd, clickEvent: sliderClick,
        },




        // { image: "https://picsum.photos/600/500", title: "This is a second title", description: "This is a second description", clickEvent: sliderClick },
        // { image: "https://picsum.photos/700/600", title: "This is a third title", description: "This is a third description", clickEvent: sliderClick },
        // { image: "https://picsum.photos/500/400", title: "This is a fourth title", description: "This is a fourth description", clickEvent: sliderClick },
        // { image: "https://picsum.photos/200/300", title: "This is a fifth title", description: "This is a fifth description", clickEvent: sliderClick },
        // { image: "https://picsum.photos/800/700", title: "This is a sixth title", description: "This is a sixth description", clickEvent: sliderClick },
        // { image: "https://picsum.photos/300/400", title: "This is a seventh title", description: "This is a seventh description", clickEvent: sliderClick },
    ]
    return (

        <div className='body'>
            <h2 className='title'>돌리도 최근 게시물</h2>
            <br></br>
            <ReactCardSlider slides={slides} />

        </div>

    );
}