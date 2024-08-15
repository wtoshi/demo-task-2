import axios from 'axios';
import { getToken } from 'src/utils/authUtils';

const FLIGHT_API_URL = `${process.env.REACT_APP_API_URL}/flight`;

// Kullanıcıya ait uçuşları getiren fonksiyon
export const getUserFlights = async (userName: string) => {
  try {
    const token = getToken(); // Token'ı al
    const response = await axios.get(`${FLIGHT_API_URL}/user/${userName}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Authorization başlığı
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user flights:', error);
    throw error;
  }
};

// Veritabanındaki tüm uçuşları getiren fonksiyon
export const getAllFlights = async () => {
  try {
    const response = await axios.get(`${FLIGHT_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all flights:', error);
    throw error;
  }
};

// Yeni bir uçuş ekleyen fonksiyon
export const createFlight = async (flightData: any) => {
  try {
    const token = getToken(); 

    const response = await axios.post(`${FLIGHT_API_URL}/add-flight`, flightData, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    throw error;
  }
};

export const fetchFlights = async (searchCriteria: any, tripType: string, departureIATA:string, arrivalIATA:string) => {
  try {
    let searchParams = searchCriteria;
    searchParams.page = 1;
    const response = await axios.get(`${FLIGHT_API_URL}/search`, {
      params: searchParams,
    });

    const flights = response.data.flights;    

    // const filteredFlights = flights.filter((flight: any) => {

    //   if (tripType === 'oneway') {
    //     return flight.flightDirection === 'd' && flight.route.destinations.includes(arrivalIATA);
    //   } else if (tripType === 'round') {
    //     return (
    //       (flight.flightDirection === 'd' && flight.route.destinations.includes(arrivalIATA)) ||
    //       (flight.flightDirection === 'a' && flight.route.destinations.includes(departureIATA))
    //     );
    //   }
    //   return false;
    // });

    // return {
    //   flights: flights,
    //   next: response.data.next,
    //   prev: response.data.prev,
    // };

    return flights;
    
  } catch (error : any) {
    if (error.response && error.response.status === 204) {
      return { message: 'No flights found for the selected criteria.' };
    } else {
      console.error('Error searching flights:', error);
      throw error;
    }
  }
};

export const getSuggestions = async (query: string) => {
    const response = await axios.get(`${FLIGHT_API_URL}/suggest-destinations`, {
      params: { query }
    });
    return response.data;
  };



