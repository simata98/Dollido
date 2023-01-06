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

import { ProductSort, Lost112List, ProductFilterSidebar } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------
const FILTER_CATEGORY_OPTIONS = ['휴대폰', '지갑'];
const FILTER_COLOR_OPTIONS = [
  { label: '흰', id: 1 },
  { label: '빨강', id: 2 },
  { label: '검정', id: 3 },
  { label: '파랑', id: 4 },
  { label: '갈', id: 5 },
  { label: '주황', id: 6 },
  { label: '분홍', id: 7 },
  { label: '초록', id: 8 },
  { label: '보라', id: 9 },
  { label: '노랑', id: 10 },
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
        'http://127.0.0.1:8000/lost112/', attr
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
          return new Date(b.fdYmd) - new Date(a.fdYmd);
        })
      );
      console.log('오래된 순', control)
    }
    else {
      setControl(
        [...projects].sort((a, b) => {
          return new Date(a.fdYmd) - new Date(b.fdYmd);
        })
      );
      console.log('최신순', control)
    }

  };

  // 페이지 ---------------------------------------
  const [page, setPage] = useState(1);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Lost112에 등록된 분실물
          </Typography>



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
        <Lost112List products={control.slice(parseInt(page, 10) * 20 - 20, parseInt(page * 20, 10))} />
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