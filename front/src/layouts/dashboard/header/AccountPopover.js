/* eslint-disable */
import { useEffect, useState } from "react";
import cookies from 'react-cookies';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';

// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const username = localStorage.getItem("username");
  const [open, setOpen] = useState(null);
  const token = cookies.load('access');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);


  const onLogout = () => {
    const token = cookies.load('access');
    if (token) {
      cookies.remove('access', { path: '/' });
      cookies.remove('refresh', { path: '/' });
      localStorage.clear();
      localStorage.setItem("username", '로그인 해주세요')
      delete axios.defaults.headers.common.Authorization;
      toast.success("로그아웃 되었습니다😎", {
        position: "top-right",
        autoClose: 1000,
      })
      setTimeout(() => window.location.href = "/login", 2000);
    }
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <ToastContainer/>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        {isAuth ? (
          <>
            <MenuItem onClick={onLogout} sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            
          </>
        )}

      </Popover>
    </>
  );
}
