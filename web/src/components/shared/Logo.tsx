import React from 'react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Ana sayfaya yönlendirme
  };

  return (
    <div 
      className="flex items-center text-purple-700 text-lg font-bold cursor-pointer"
      onClick={handleLogoClick}
    >
      <AirplanemodeActiveIcon className="text-white bg-accentColor rounded-full mr-2 rotate-90 " />
      PLANE SCAPE
    </div>
  );
};

export default Logo;
