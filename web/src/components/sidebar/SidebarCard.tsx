import React from 'react';

const SidebarCard: React.FC<{ title: string; imageUrl: string }> = ({ title, imageUrl }) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden mb-2">
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-50 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </div>
      <div className="absolute bottom-0 left-0 text-white bg-black/40 w-full p-4">
        <h3 className="font-bold text-white">{title}</h3>
      </div>
    </div>
  );
};

export default SidebarCard;
