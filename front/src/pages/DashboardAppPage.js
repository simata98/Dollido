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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[0])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[0])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[0])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[0])[8]}
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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[1])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[1])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[1])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[1])[8]}
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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[2])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[2])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[2])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[2])[8]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
                {/* </Grid> */}
              </SwiperSlide>

              <SwiperSlide>
                {/* <Grid item xs={12} sm={6} md={5}> */}
                <Card id={Object.values(tasks.current_lost[3])[0]}>
                  <Box sx={{ pt: '50%', position: 'relative' }}>
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[3])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[3])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[3])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[3])[8]}
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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[4])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[4])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[4])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[4])[8]}
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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[5])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[5])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[5])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[5])[8]}
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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[6])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[6])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[6])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[6])[8]}
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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[7])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[7])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[7])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[7])[8]}
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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[8])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[8])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[8])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[8])[8]}
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
                    <StyledProductImg src={'../../../images/' + Object.values(tasks.current_lost[9])[2].split("/").pop()} />
                  </Box>

                  <Stack spacing={1} sx={{ p: 1 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="h6" noWrap>
                        {Object.values(tasks.current_lost[9])[1]}

                      </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      {/* <ColorPreview colors={colors} /> */}
                      <Typography variant="subtitle1">
                        {Object.values(tasks.current_lost[9])[4]}
                      </Typography>
                      <Typography variant="subtitle1">
                        &nbsp;
                        {Object.values(tasks.current_lost[9])[8]}
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
                chartLabels={Object.keys(tasks.dollido_cnt)}
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
                title="분실물 분포"
                chartData={[
                  { label: '지갑', value: tasks.wallet_cnt },
                  { label: '스마트폰', value: tasks.phone_cnt },
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
                level={6}
                center={{ lat: 36.3478959, lng: 127.4118545 }}
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