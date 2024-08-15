import React from 'react';
import { motion } from 'framer-motion';

const EmptyFlight: React.FC = () => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.img 
                src={`${process.env.PUBLIC_URL}/no-flights.webp`} 
                alt="No Flights" 
                className="w-36 h-36 mb-8"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            />
            <motion.h2 
                className="text-2xl font-semibold text-gray-700"
                initial={{ y: -60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                No Flights Found
            </motion.h2>
            <motion.p 
                className="text-gray-500"
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Try searching with different criteria.
            </motion.p>
        </motion.div>
    );
};

export default EmptyFlight;
