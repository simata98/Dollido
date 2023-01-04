import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

Lost112Card.propTypes = {
  product: PropTypes.object,
};

export default function Lost112Card({ product }) {
  const { atcId, category, clrNm, depPlace, fdFilePathImg, fdPrdNm, fdSbjt, fdYmd } = product;
  const link = '/dashboard/lost112/'.concat(atcId)
  console.log(link)
  return (
    <Card id={atcId}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && (

          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )} */}
        <StyledProductImg alt={category} src={fdFilePathImg} />

      </Box>
      
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link href={link} color="inherit" underline="hover">
          <Typography variant="h6" noWrap>
            {category}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            {fdYmd}
          </Typography>
          <Typography variant="subtitle1">
            &nbsp;
            {clrNm}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
