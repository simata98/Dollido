/* eslint-disable */

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

DollidoCard.propTypes = {
  product: PropTypes.object,
};

export default function DollidoCard({ product }) {
  const { id, lstPrdtNm, lstFilePathImg, lstcontent, lstYmd, lstPlace, find_status, clrNm, writer_id, create_date } = product;
  const link = '/dashboard/dollido/'.concat(id)
  const src ='../../../images/' + lstFilePathImg.split('/').pop()
  return (
    <Card id={id}>
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
        <StyledProductImg alt={id} src={src} />

      </Box>
      
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link href={link} color="inherit" underline="hover">
          <Typography variant="h6" noWrap>
            {lstPrdtNm}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            {lstYmd}
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
