import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFlights } from 'src/services/flightService';
import { getUserData, isAuth } from 'src/utils/authUtils';
import { Collapse, List, ListItem, ListItemText, Button } from '@mui/material';
import { UserFlight } from 'src/types/UserFlight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const MyFlights: React.FC = () => {
  const [flights, setFlights] = useState<UserFlight[]>([]); // Uçuşları tutmak için state
  const [openIndex, setOpenIndex] = useState<number | null>(null);  // Detayların açıldığı uçuşu belirlemek için state
  const navigate = useNavigate();

  // Kullanıcı giriş durumu kontrol ediliyor
  useEffect(() => {
    const isAuthenticated = isAuth(); // Kullanıcının oturum durumu kontrol ediliyor
    if (!isAuthenticated) {
      navigate('/');
    } else {
      fetchUserFlights();
    }
  }, [navigate]);

  // Kullanıcı uçuşlarını almak için API çağrısı yapılıyor
  const fetchUserFlights = async () => {
    try {
      const user = getUserData();
      const data = await getUserFlights(user?.username!);
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights', error);
    }
  };

  // Uçuş detaylarını açıp kapatma işlevi
  const toggleDetails = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Flights</h2>
      <List>
        {flights.map((flight, index) => (
          <div key={flight._id} className='bg-white hadow-md rounded-lg mb-4'>
            <ListItem button onClick={() => toggleDetails(index)}>
              <ListItemText
                primary={`${flight.flightName} - ${flight.departure} to ${flight.destination}`}
                secondary={`Departure: ${flight.departureTime} - Arrival: ${flight.arrivalTime}`}
              />
              <Button variant="text" color="primary" size="small" onClick={() => toggleDetails(index)}>
                {openIndex === index ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Button>
            </ListItem>
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p><strong>Airline:</strong> {flight.airline}</p>
                <p><strong>Duration:</strong> {flight.duration}</p>
                <p><strong>Price:</strong> {flight.price}</p>
              </div>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default MyFlights;