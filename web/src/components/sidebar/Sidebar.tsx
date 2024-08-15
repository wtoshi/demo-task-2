import React from 'react';
import { motion } from 'framer-motion';
import SidebarCard from './SidebarCard';


const Sidebar: React.FC = () => {
    // Framer Motion animasyon ayarları
    const sidebarVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.2, // Her kartın animasyonu sırayla başlaması için gecikme
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
            },
        }),
    };

    const sidebarItems = ['Car Rentals', 'Hotels', 'Tour Packages'];

    return (
        <div className="md:w-1/5 flex flex-col gap-6">
            {sidebarItems.map((title, index) => (
                <motion.div
                    key={title}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={sidebarVariants}
                >
                    <SidebarCard
                        title={title}
                        imageUrl={`/banners/${title.toLowerCase().replace(' ', '-')}.jpg`}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default Sidebar;
