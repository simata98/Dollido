import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';

import './css/paging.css';
import Pagination from '@mui/material/Pagination';

// @mui
import { Container, Stack, Typography, Menu, Button, MenuItem } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { ProductSort, Lost112List, ProductFilterSidebar } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'featured', label: '최신순' },
  { value: 'newest', label: '오래된 순' },
];

export default function Lost112Page({ products }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'http://127.0.0.1:8000/lost112/'
      );
      setTasks(response.data);
    };
    getData();
  }, []);
  // console.log(tasks)

  // 필터 사이드바 ---------------------------------

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
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
    // if (cur === "오래된 순") {
    //   setControl(
    //     [...projects].sort((a, b) => {
    //       return new Date(a.fdYmd) - new Date(b.fdYmd);
    //     })
    //   );
    //   console.log('오래된 순',control)
    // }
    // else {
    //   setControl(
    //     [...projects].sort((a, b) => {
    //       return new Date(b.fdYmd) - new Date(a.fdYmd);
    //     })
    //   );
    //   console.log('최신순',control)
    // }
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
      console.log('오래된 순',control)
    }
    else {
      setControl(
        [...projects].sort((a, b) => {
          return new Date(a.fdYmd) - new Date(b.fdYmd);
        })
      );
      console.log('최신순',control)
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
          Products
        </Typography>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
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
        <Stack  flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mt: 6 }}>
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