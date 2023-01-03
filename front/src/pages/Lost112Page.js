import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';

import './css/paging.css';
import SweetPagination from "sweetpagination";
import Pagination from "react-js-pagination";

// @mui
import { Container, Stack, Typography, Menu, Button, MenuItem } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ProductsPage({products}) {
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
  console.log(tasks)

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
  const [cur, setCur] = useState("Newest")
  const handleOpen = (event) => {
    setOpen(event.target);
  };

  const handleClose = (event) => {
    setOpen(null);
    setCur(event.currentTarget.textContent)
    // window.location.reload()

    if (cur === "Newest") {
      console.log(cur)
      setTasks(tasks.sort((a, b) => a.fdYmd - b.fdYmd));
    }
    else {
      console.log(cur)
      setTasks(tasks.sort((a, b) => b.fdYmd - a.fdYmd));
    }
  };
  // 페이지 ---------------------------------------
    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
      setPage(page);
    };

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
          <ProductList products={tasks.slice(0, 20)} />
          {/* <ProductList products={tasks} /> */}
          <Pagination>
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={<ProductList products={tasks.slice(0, 20)} />}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
          {/* <ProductList products={tasks.slice(0, 100)} /> */}
          </Pagination>
        </Container>
      </>
    );
  }