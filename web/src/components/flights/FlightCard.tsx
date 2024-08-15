import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightIcon from '@mui/icons-material/Flight';
import { ApiFlightDto } from 'src/services/flightApiService';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { createFlight } from 'src/services/flightService';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FlightCardProps {
    delay: number;
    flight: ApiFlightDto;
    departureIATA: string;
    arrivalIATA: string;
    tripType: string;
}

const FlightCard: React.FC<FlightCardProps> = ({ delay, flight, departureIATA, arrivalIATA, tripType }) => {
    console.log('Flight:', flight);
    const [isPlaneVisible, setIsPlaneVisible] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const { userName, isAuthenticated } = useSelector((state: RootState) => state.auth); // Kullanıcı bilgilerini al

    const navigate = useNavigate();

    const distance = 90;
    const speed = 0.02;
    const duration = distance * speed;

    const flightIconVariants = {
        hidden: { x: '0%' },
        move: {
            x: `${distance}%`,
            transition: {
                duration: duration,
                ease: 'easeInOut',
                delay: delay,
            },
        },
    };

    const contentVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const formatTime = (timeString: string) => {
        return dayjs(timeString).format('h:mm A');
    };

    const calculateDuration = (departureTime: string, arrivalTime: string) => {
        const start = dayjs(departureTime);
        const end = dayjs(arrivalTime);
        const diff = end.diff(start, 'minute');
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}h ${minutes}m`;
    };

    const handleBookFlight = async () => {
        if (isAuthenticated && userName) {
            // const now = dayjs(); // Şu anki zaman
            // const flightTime = dayjs(flight.scheduleDateTime); // Uçuş zamanı
    
            // if (flightTime.isBefore(now)) {
            //     toast.error('You cannot book a flight with a past date and time.');
            //     return;
            // }
    
            try {
                const flightData = {
                    flightName: flight.flightName,
                    flightNumber: flight.flightNumber,
                    departure: departureIATA,
                    departureTime: flight.scheduleDateTime,
                    destination: arrivalIATA,
                    arrivalTime: flight.estimatedLandingTime,
                    airline: flight.prefixIATA,
                    duration: calculateDuration(flight.scheduleDateTime, flight.estimatedLandingTime),
                    price: flight.price, // Örnek fiyat
                    userName: userName, // Kullanıcı ID'si
                };
    
                await createFlight(flightData);                
                toast.success('Flight booked successfully!');
                navigate('/my-flights');
            } catch (error) {
                console.error('Error booking flight:', error);                
                toast.error('Failed to book flight.');
            }
        } else {
            toast.error('Please login to book a flight.');
        }
    };

    return (
        <>
            <motion.div
                className="relative bg-white shadow-md p-6 rounded-lg rounded-bl-none mb-16"
                initial="hidden"
                animate="visible"
                variants={contentVariants}
                transition={{ duration: 1, delay: delay }}
            >
                {isPlaneVisible && (
                    <motion.div
                        className="absolute w-full top-20 transform -translate-y-1/2"
                        variants={flightIconVariants}
                        initial="hidden"
                        animate="move"
                        onAnimationComplete={() => {
                            setIsPlaneVisible(false);
                        }}
                    >
                        <FlightIcon className="text-purple-700 text-4xl rotate-90" />
                    </motion.div>
                )}

                <div className="relative">
                    <motion.div
                        className="flex flex-col mb-2"
                        variants={contentVariants}
                        transition={{ duration: 0.5, delay: delay + 0.3 }}
                    >
                        <div>
                            <span className="font-semibold text-slate-700 text-sm">
                                {departureIATA}-{arrivalIATA} ({flight.flightNumber})
                            </span>
                        </div>
                    </motion.div>
                    <div className="flex justify-between items-start">
                        <motion.div
                            className="flex flex-col gap-4"
                            variants={contentVariants}
                            transition={{ duration: 0.5, delay: delay + 0.3 }}
                        >
                            <div className="flex items-center text-gray-700">
                                <FlightTakeoffIcon className="mr-2" />
                                <span className="font-semibold text-slate-500 text-xs">
                                    Departure
                                </span>
                            </div>
                            <span className="font-bold text-base">{formatTime(flight.scheduleDateTime)}</span>
                        </motion.div>

                        <motion.div
                            className="flex flex-row w-full px-14 items-center justify-center"
                            variants={contentVariants}
                            transition={{ duration: 0.5, delay: delay + 1 }}
                        >
                            <div className="border-t border-2 border-gray-300 w-full"></div>
                            <div className="flex flex-col items-center justify-center mx-4">
                                <span className="text-gray-700 font-bold">{flight.prefixIATA}</span>
                                <FlightIcon className="text-purple-700 my-1 transform rotate-90" />
                                <span className="text-gray-700 font-bold text-base min-w-max">
                                    {calculateDuration(flight.scheduleDateTime, flight.estimatedLandingTime)}
                                </span>
                                <span className="text-gray-700 font-bold text-sm min-w-max">
                                    ({flight.route.destinations.length > 1 ? 'With Stop' : 'Nonstop'})
                                </span>
                            </div>
                            <div className="border-b border-2 border-gray-300 w-full"></div>
                        </motion.div>
                        <motion.div
                            className="flex flex-col gap-4"
                            variants={contentVariants}
                            transition={{ duration: 0.5, delay: delay + 1.5 }}
                        >
                            <div className="flex items-center text-gray-700">
                                <FlightLandIcon className="mr-2" />
                                <span className="font-semibold text-slate-500 text-xs">
                                    Arrival
                                </span>
                            </div>
                            <span className="font-bold text-base">
                                {formatTime(flight.estimatedLandingTime)}
                            </span>
                        </motion.div>
                    </div>

                    <motion.div
                        className="flex flex-col justify-start max-w-fit items-center mt-4"
                        variants={contentVariants}
                        transition={{ duration: 0.5, delay: delay + 2 }}
                    >
                        <span className="text-purple-700 font-bold text-lg">Price: ${flight.price ?? '200'}</span>
                        <span className="text-sm text-gray-500 capitalize">{tripType}</span>
                    </motion.div>


                </div>
                <motion.div
                    variants={contentVariants}
                    transition={{ duration: 0.5, delay: delay + 2 }}
                    className='absolute bottom-0 right-0'
                >
                    <button className="bg-purple-700 text-white py-2 px-4 rounded-br-lg rounded-tl-lg hover:bg-secondaryBgColor hover:text-primaryTextColor" onClick={() => setOpenModal(true)}>
                        Book Flight
                    </button>
                </motion.div>

                <motion.div
                    variants={contentVariants}
                    transition={{ duration: 0.5, delay: delay + 2 }}
                    className="absolute -bottom-10 left-0 mt-4 bg-accentColor/10 p-2 z-10 rounded-bl-lg rounded-br-lg"
                >
                    <a href="#" className="text-purple-700 text-xs underline">
                        Check the details
                    </a>
                </motion.div>
            </motion.div>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Booking"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to book this flight?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="primary">
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            handleBookFlight();
                            setOpenModal(false);
                        }}
                        color="primary"
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FlightCard;
