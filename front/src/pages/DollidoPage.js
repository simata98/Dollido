/* eslint-disable */

import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';

import './css/paging.css';
import Pagination from '@mui/material/Pagination';

// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Container,
  MenuItem,
  Menu,
  Autocomplete,
  TextField,
} from '@mui/material'
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

import { ProductSort, DollidoList, ProductFilterSidebar } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------
const FILTER_CATEGORY_OPTIONS = ['휴대폰', '지갑'];
const FILTER_COLOR_OPTIONS = [
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
const SORT_BY_OPTIONS = [
  { value: 'featured', label: '최신순' },
  { value: 'newest', label: '오래된 순' },
];

export default function DollidoPage({ products }) {
  const [tasks, setTasks] = useState([]);
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getData = async () => {
      const attr = {
        color: color,
        category: category
      };
      console.log(attr)
      const response = await axios.post(
        'http://127.0.0.1:8000/post/filter/', attr
      );
      setTasks(response.data);
    };
    getData();
  }, [color, category]);
  // console.log(tasks)

  // 필터 사이드바 ---------------------------------

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleCategory = (e) => {
    console.log(e.target.value)
    setCategory(e.target.value)
  };

  const handleColor = (e, value) => {
    console.log(value)
    setColor(value)
  };

  // 정렬 ---------------------------------------
  const [open, setOpen] = useState(null);
  const [cur, setCur] = useState("오래된 순")
  const [control, setControl] = useState([]);
  const projects = tasks;
  useEffect(() => {
    if (!projects) return;
    setControl(projects);
  }, [projects]);

  const handleOpen = (event) => {
    setOpen(event.target);
  };

  const handleClose = (event) => {
    setOpen(null);
    setCur(event.currentTarget.textContent)
    // window.location.reload()
    if (cur === "오래된 순") {
      setControl(
        [...projects].sort((a, b) => {
          return new Date(b.lstYmd) - new Date(a.lstYmd);
        })
      );
      console.log('오래된 순', control)
    }
    else {
      setControl(
        [...projects].sort((a, b) => {
          return new Date(a.lstYmd) - new Date(b.lstYmd);
        })
      );
      console.log('최신순', control)
    }

  };

  // 페이지 ---------------------------------------
  const [page, setPage] = useState(1);
  const link = '/dashboard/dollido/addPost'


  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Dollido에 등록된 분실물
          </Typography>
          <Button href={link} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            새 게시물
          </Button>
        </Stack>


        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

            {/* ------------------------------------ */}
            {/* <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}
            <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={handleOpenFilter}>
              Filters&nbsp;
            </Button>

            <Drawer
              anchor="right"
              open={openFilter}
              onClose={handleCloseFilter}
              PaperProps={{
                sx: { width: 280, border: 'none', overflow: 'hidden' },
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  Filters
                </Typography>
                <IconButton onClick={handleCloseFilter}>
                  <Iconify icon="eva:close-fill" />
                </IconButton>
              </Stack>

              <Divider />

              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>
                  <RadioGroup onChange={handleCategory}>
                    {FILTER_CATEGORY_OPTIONS.map((item) => (
                      <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Colors
                  </Typography>
                  <Autocomplete
                    onInputChange={handleColor}
                    disablePortal
                    id="combo-box-demo"
                    options={FILTER_COLOR_OPTIONS.map((option) => option.label)}
                    sx={{ width: 250 }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => <TextField {...params} label="색깔" />}
                  />
                </div>
              </Stack>

              <Box sx={{ p: 3 }}>
                <Button
                  onClick={handleCloseFilter}
                  fullWidth
                  size="large"
                  type="submit"
                  color="inherit"
                  variant="outlined"
                  startIcon={<Iconify icon="material-symbols:close" />}
                >
                  닫기
                </Button>
              </Box>
            </Drawer>
            {/* ------------------------------------ */}
            <Button
              color="inherit"
              disableRipple
              onClick={handleOpen}
              endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
            >
              Sort By:&nbsp;
              <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {cur}
              </Typography>
            </Button>
            <Menu
              keepMounted
              anchorEl={open}
              open={Boolean(open)}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {SORT_BY_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === 'newest'}
                  onClick={handleClose}
                  sx={{ typography: 'body2' }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Stack>
        <DollidoList products={control.slice(parseInt(page, 10) * 20 - 20, parseInt(page * 20, 10))} />
        <Stack flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mt: 6 }}>
          <Pagination
            showFirstButton showLastButton
            size="small"
            color="primary"
            count={parseInt(tasks.length / 20, 10)}
            // eslint-disable-next-line
            onChange={(_, page) => {
              setPage(page);
            }}
          />
        </Stack>
      </Container>
    </>
  );
}