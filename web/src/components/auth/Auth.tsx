import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { loginSuccess, logoutSuccess } from '../../redux/slices/authSlice';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import { initLoginData, clearLoginData, getUserData } from '../../utils/authUtils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { toast } from 'react-toastify';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userName, avatarUrl } = useSelector((state: RootState) => state.auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı oturum bilgilerini yükle
    const userData = getUserData();
    if (userData) {
      dispatch(loginSuccess({ userName: userData.username, avatarUrl: userData.avatarUrl || 'https://avatar.iran.liara.run/public/job/designer/male'}));
    }
  }, [dispatch]);

  const handleLogout = () => {
    clearLoginData();  // Login verilerini temizliyoruz
    dispatch(logoutSuccess());  // Kullanıcıyı çıkış yaptırıyoruz
    setAnchorEl(null);
    toast.info('Logged out successfully.');
    navigate('/'); // Ana sayfaya yönlendirme
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar alt={userName || undefined} src={avatarUrl || 'https://avatar.iran.liara.run/public/job/designer/male'} className="w-6 h-6" />
          <span className="text-gray-900">{userName}</span>
          <span onClick={handleMenuClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <ArrowDropDownIcon className="text-gray-700" />
          </span>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}><Link to="/my-flights">My Flights</Link></MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <LoginModal />
      )}
    </>
  );
};

export default Auth;
