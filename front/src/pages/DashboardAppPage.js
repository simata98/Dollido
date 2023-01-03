import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useState, useEffect } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// 배너 슬라이드
// import "swiper/css/grid";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/swiper-bundle.min.css'
// import 'swiper/css';
// import "swiper/swiper.scss";
// import 'swiper/components/navigation/navigation.min.css';
// import "swiper/components/pagination/pagination.scss";

// sections
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// components
import Iconify from '../components/iconify';

SwiperCore.use([Navigation, Pagination, Autoplay])


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'http://127.0.0.1:8000/'
      );
      setTasks(response.data);
    };
    getData();
  }, []);

  console.log(tasks)

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dollido 메인 페이지
        </Typography>
      
        <Grid container spacing={3}>
        <Swiper 
          className="banner"
          spaceBetween={10}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          // breakpoints = {
          //   768= {
          //     slidesPerView: {2},  //브라우저가 768보다 클 때
          //     spaceBetween: {40},
          //   },
          //   1024= {
          //     slidesPerView: {3},  //브라우저가 1024보다 클 때
          //     spaceBetween: {50},
          //   }
          // }
        >
          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="등록된 지갑" total={1} icon={'ant-design:android-filled'}/>
          </Grid>
          </SwiperSlide>
          
          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="New Users" total={2} color="info" icon={'ant-design:apple-filled'} />
          </Grid>
          </SwiperSlide>
          
          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="Item Orders" total={3} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          </SwiperSlide>
          
          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="Bug Reports" total={4} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
          </SwiperSlide>

          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="등록된 지갑" total={5} icon={'ant-design:android-filled'}/>
          </Grid>
          </SwiperSlide>
          
          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="New Users" total={6} color="info" icon={'ant-design:apple-filled'} />
          </Grid>
          </SwiperSlide>
          
          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="Item Orders" total={7} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          </SwiperSlide>
          
          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="Bug Reports" total={8} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
          </SwiperSlide>

          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="등록된 지갑" total={9} icon={'ant-design:android-filled'}/>
          </Grid>
          </SwiperSlide>
          
          <SwiperSlide>
          <Grid item xs={12} sm={6} md={13}>
            <AppWidgetSummary title="New Users" total={10} color="info" icon={'ant-design:apple-filled'} />
          </Grid>
          </SwiperSlide>
        </Swiper>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
