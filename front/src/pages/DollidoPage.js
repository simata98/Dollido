/* eslint-disable */

import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { ProductSort, DollidoList, ProductFilterSidebar } from '../sections/@dashboard/products';
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

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
  }, []);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const link = '/dashboard/dollido/addPost'
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Products
          </Typography>
          <Button href={link} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            새 게시물
          </Button>
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        {/* <DollidoList products={tasks} /> */}
        <DollidoList products={tasks.slice(0,10)} />
      </Container>
    </>
  );
}