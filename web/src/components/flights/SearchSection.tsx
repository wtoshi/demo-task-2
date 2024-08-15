import React, { useState, useEffect } from 'react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { TextField, Button, ToggleButton, ToggleButtonGroup, Autocomplete } from '@mui/material';
import { getSuggestions } from '../../services/flightService';
import { toast } from 'react-toastify';

interface SearchSectionProps {
    onSearch: (criteria: any, tripType:string, departureIATA: string, arrivalIATA : string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
    const [tripType, setTripType] = useState('round');
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [departureOptions, setDepartureOptions] = useState([]);
    const [destinationOptions, setDestinationOptions] = useState([]);
    const [route, setRoute] = useState('');

    // Fetch suggestions for departure
    useEffect(() => {
        if (departure.length > 2) {
            getSuggestions(departure).then(setDepartureOptions);
            handleRoute();
        }
    }, [departure]);

    // Fetch suggestions for destination
    useEffect(() => {
        if (destination.length > 2) {
            getSuggestions(destination).then(setDestinationOptions);
            handleRoute();
        }
    }, [destination]);

    const handleRoute = () => {
        setRoute(departure + "-" + destination);
        console.log('Route:', route);
    }

    const handleTripType = (
        event: React.MouseEvent<HTMLElement>,
        newTripType: string
    ) => {
        if (newTripType !== null) {
            setTripType(newTripType);
        }
    };

    const handleSearch = () => {
        if (!departure || !destination) {
            toast.error("Departure and Destination fields cannot be empty!");
            return;
        }
   
        const params: any = {
            includedelays: false,
            page: 0,
            sort: '+scheduleTime',
        };
        const today = new Date().toISOString().split('T')[0];
   
        if (departureDate) {
            params.fromDateTime = `${departureDate}T00:00:00`;
   
            const fromDate = new Date(departureDate);
            fromDate.setDate(fromDate.getDate() + 3);
            params.toDateTime = `${fromDate.toISOString().split('T')[0]}T23:59:59`;
        } else {
            params.fromDateTime = `${today}T00:00:00`;
            setDepartureDate(today);
            const toDate = new Date();
            toDate.setDate(toDate.getDate() + 3);
            params.toDateTime = `${toDate.toISOString().split('T')[0]}T23:59:59`;
        }
   
        if (returnDate && tripType === 'round') {
            params.toDateTime = `${returnDate}T23:59:59`;
        }
   
        onSearch(params,tripType,departure,destination); 
    };

    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-purple-700 font-bold text-base">
                    <AirplanemodeActiveIcon className="mr-2 rotate-45" />
                    BOOK YOUR FLIGHT
                </div>
                <ToggleButtonGroup
                    value={tripType}
                    exclusive
                    onChange={handleTripType}
                    aria-label="trip type"
                    className="h-8"
                >
                    <ToggleButton
                        value="round"
                        aria-label="round trip"
                        className={`${tripType === 'round' ? 'bg-secondaryBgColor text-primaryTextColor' : 'bg-buttonBgColor text-buttonTextColor'} px-2 py-1 rounded-l-full`}
                        style={{ textTransform: 'none', fontWeight: '500', fontSize: '0.875rem' }}
                    >
                        Round Trip
                    </ToggleButton>
                    <ToggleButton
                        value="oneway"
                        aria-label="one way"
                        className={`${tripType === 'oneway' ? 'bg-secondaryBgColor text-primaryTextColor' : 'bg-buttonBgColor text-buttonTextColor'} px-2 py-1 rounded-r-full`}
                        style={{ textTransform: 'none', fontWeight: '500', fontSize: '0.875rem' }}
                    >
                        One Way
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
                <Autocomplete
                    options={departureOptions}
                    getOptionLabel={(option: any) =>
                        `${option.country} | ${option.city || ''} | ${option.iata}`
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Departure"
                            variant="outlined"
                            fullWidth
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: <FlightTakeoffIcon className="text-purple-700 mr-2" />,
                            }}
                            className="mb-4 md:mb-0"
                        />
                    )}
                    onChange={(event, value) => {
                        if (value) {
                            setDeparture(value.iata);
                        }
                    }}
                    style={{ width: '100%' }}
                />
                <Autocomplete
                    options={destinationOptions}
                    getOptionLabel={(option: any) =>
                        `${option.country} | ${option.city || ''} | ${option.iata}`
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Destination"
                            variant="outlined"
                            fullWidth
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: <FlightLandIcon className="text-purple-700 mr-2" />,
                            }}
                            className="mb-4 md:mb-0"
                        />
                    )}
                    onChange={(event, value) => {
                        if (value) {
                            setDestination(value.iata);
                        }
                    }}
                    style={{ width: '100%' }}
                />
                <TextField
                    type="date"
                    label="Departure Date"
                    variant="outlined"
                    fullWidth
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        startAdornment: <DateRangeIcon className="text-purple-700 mr-2" />,
                    }}
                    className="mb-4 md:mb-0"
                />
                {tripType === 'round' && (
                    <TextField
                        type="date"
                        label="Return Date"
                        variant="outlined"
                        fullWidth
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: <DateRangeIcon className="text-purple-700 mr-2" />,
                        }}
                    />
                )}
            </div>

            <div className="flex justify-start mt-6">
                <Button variant="contained" className='bg-buttonBgColor' onClick={handleSearch}>
                    Show Flights
                </Button>
            </div>
        </div>
    );
};

export default SearchSection;
