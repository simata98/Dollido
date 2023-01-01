import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
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

export default function ProductsPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        'http://127.0.0.1:8000/lost112/'
      );
      setTasks(response.data);
    };
    getData();
  },[]);
  console.log('list')
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
        {/* <ProductList products={tasks} /> */}
        <ProductList products={tasks.slice(0,32)} />
      </Container>
    </>
  );
}
