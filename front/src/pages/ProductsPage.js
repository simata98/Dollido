import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';

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
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={tasks} />
      </Container>
    </>
  );
}
