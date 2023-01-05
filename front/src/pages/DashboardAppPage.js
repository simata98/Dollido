/* eslint-disable */

import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
import axios from 'axios';
import { useState, useEffect } from 'react';

// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Card, Box, Link } from '@mui/material';
// 배너 슬라이드
// import "swiper/css/grid";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/swiper-bundle.min.css'
// import 'swiper/css';
// import "swiper/swiper.scss";
// import 'swiper/components/navigation/navigation.min.css';
// import "swiper/components/pagination/pagination.scss";
// import PropTypes from 'prop-types';
import { Map, MapMarker } from "react-kakao-maps-sdk";
// sections
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// components
import Iconify from '../components/iconify';

SwiperCore.use([Navigation, Autoplay])
const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'http://127.0.0.1:8000/'
      );
      setTasks(response.data);
    };
    getData();
  }, []);

  console.log('tasks.wallet_cnt',tasks.wallet_cnt)
  console.log('tasks.phone_cnt',tasks.phone_cnt)
  console.log('tasks.current_lost',tasks.current_lost)
  console.log('tasks.dollido_cnt',tasks.dollido_cnt)
  console.log('tasks.api_cnt',tasks.api_cnt)
  console.log('tasks.total_cnt',tasks.total_cnt)
  if (tasks.current_lost) {
    return (
      <>
        <Helmet>
          <title> Dashboard | Minimal UI </title>
        </Helmet>

        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            최근 습득물 현황
          </Typography>

          <Grid container spacing={3}>
            <Swiper
              className="banner"
              spaceBetween={10}
              slidesPerView={3}
              navigation
              // pagination={{ clickable: true }}
              autoplay={{ delay: 2000 }}
            >
              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[0])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[0])[6]} src={Object.values(tasks.current_lost[0])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[0])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[0])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[0])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[1])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[1])[6]} src={Object.values(tasks.current_lost[1])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[1])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[1])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[1])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[2])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[2])[6]} src={Object.values(tasks.current_lost[2])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[0])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[2])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[2])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={13} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[3])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[3])[6]} src={Object.values(tasks.current_lost[3])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[3])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[3])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[3])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[4])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[4])[6]} src={Object.values(tasks.current_lost[4])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[4])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[4])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[4])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[5])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[5])[6]} src={Object.values(tasks.current_lost[5])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[5])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[5])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[5])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[6])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[6])[6]} src={Object.values(tasks.current_lost[6])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[6])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[6])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[6])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[7])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[7])[6]} src={Object.values(tasks.current_lost[7])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[7])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[7])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[7])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[8])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[8])[6]} src={Object.values(tasks.current_lost[8])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[8])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[8])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[8])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[9])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg alt={Object.values(tasks.current_lost[9])[6]} src={Object.values(tasks.current_lost[9])[2]} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[9])[6]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[9])[5]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[9])[7]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>
            </Swiper>


            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="분실물 통계 현황"
                subheader='최근 10일의 통계량'
                // subheader={'최근 10일의 통계량' + Object.keys(tasks.api_cnt[0])+ '~'+ Object.keys(tasks.api_cnt[9])}
                chartLabels={Object.keys(tasks.api_cnt)}
                chartData={[
                  {
                    name: 'Lost112',
                    type: 'area',
                    fill: 'gradient',
                    data: Object.values(tasks.api_cnt),
                  },
                  {
                    name: 'Dollido',
                    type: 'area',
                    fill: 'gradient',
                    data: Object.values(tasks.dollido_cnt),
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="lost112 - Category"
                chartData={[
                  { label: 'wallet', value: tasks.wallet_cnt },
                  { label: 'phone', value: tasks.phone_cnt },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  // theme.palette.info.main,
                  // theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              {/* <AppNewsUpdate
                title="News Update"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: faker.name.jobTitle(),
                  description: faker.name.jobTitle(),
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              /> */}
              <Typography variant="h4" sx={{ mb: 2 }}>
                Dollido 보관함 위치
              </Typography>
              <Map
                center={{ lat: 36.3452698, lng: 127.3842685 }}
                style={{ width: "1150px", height: "500px" }}>
                <MapMarker position={{ lat: 36.3452698, lng: 127.3842685 }}>
                  <div style={{ color: "#000" }}>kt 탄방타워</div>
                </MapMarker>
                <MapMarker position={{ lat: 36.3516567, lng: 127.4374114 }}>
                  <div style={{ color: "#000" }}>대전 복합 터미널</div>
                </MapMarker>
                <MapMarker position={{ lat: 36.3544548, lng: 127.4211446 }}>
                  <div style={{ color: "#000" }}> 한남대학교</div>
                </MapMarker>
              </Map>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}