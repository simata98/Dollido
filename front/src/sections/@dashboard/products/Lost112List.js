import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './Lost112Card';

// ----------------------------------------------------------------------

Lost112List.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function Lost112List({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.atcId} item xs={12} sm={6} md={3}>

          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

