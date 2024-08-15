import React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Deals ikonu
import ExploreIcon from '@mui/icons-material/Explore'; // Discover ikonu
import Logo from '../shared/Logo';
import Auth from '../auth/Auth'; // Auth bileşeni

const Navbar: React.FC = () => {

  return (
    <nav className="flex justify-between items-center p-4">
      {/* Logo */}
      <Logo />

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-900 ml-auto"> {/* ml-auto navigasyonu sağa yaslar */}
        <a href="#" className="flex items-center hover:text-purple-700 font-medium">
          <LocalOfferIcon className="mr-1 text-lg text-purple-700" /> {/* İkon rengi inherit yapıldı */}
          Deals
        </a>
        <a href="#" className="flex items-center hover:text-purple-700 font-medium">
          <ExploreIcon className="mr-1 text-lg text-purple-700" /> {/* İkon rengi inherit yapıldı */}
          Discover
        </a>
      </div>

      {/* Auth */}
      <div className="ml-8">
        <Auth />
      </div>
    </nav>
  );
};

export default Navbar;
