import axios from 'axios';

const FLIGHT_API_URL = process.env.REACT_APP_FLIGHT_API_URL || '';
const APP_ID = process.env.REACT_APP_FLIGHT_APP_ID || '';
const APP_KEY = process.env.REACT_APP_FLIGHT_APP_KEY || '';

export interface ApiFlightDto {
  lastUpdatedAt: string;
  estimatedLandingTime: string;
  flightDirection: string;
  flightName: string;
  flightNumber: number;
  id: string;
  isOperationalFlight: boolean;
  mainFlight: string;
  prefixIATA: string;
  prefixICAO: string;
  airlineCode: number;
  publicFlightState: {
      flightStates: string[];
  };
  route: {
      destinations: string[];
      eu: string;
      visa: boolean;
  };
  scheduleDateTime: string;
  scheduleDate: string;
  scheduleTime: string;
  serviceType: string;
  schemaVersion: string;
  price?: number;
}

interface FlightResponse {
  flights: ApiFlightDto[];
}

// Uçuş bilgilerini almak için kullanılan fonksiyon
export const getFlights = async (): Promise<FlightResponse | null> => {
    const flightsUrl = `${FLIGHT_API_URL}/flights`;
  try {

    const response = await axios.get(flightsUrl, {
      headers: {
        "resourceversion": "v4",
        'app_id': APP_ID,
        'app_key': APP_KEY,
      },
    });

    if (response.status === 200) {
      const data: FlightResponse = response.data;
      console.log(`Found ${data.flights.length} flights`);
      return data;
    } else {
      console.error(`Oops something went wrong\nHttp response code: ${response.status}\nHttp response body: ${response.data}`);
      return null;
    }
  } catch (error) {
    console.error('An error occurred while fetching flights:', error);
    return null;
  }
};

export const getDestinations = async (searchTerm: string, page: number = 0) => {
  try {
    const response = await axios.get(`${FLIGHT_API_URL}/destinations`, {
      headers: {
        ResourceVersion: 'v4',
        app_id: APP_ID,
        app_key: APP_KEY,
      },
      params: {
        sort: `+iata`,
        page: page,
      },
    });

    if (response.status === 200) {
      const destinations = response.data.destinations.filter((destination: any) => 
        destination.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return destinations;
    } else {
      console.error(`Error fetching destinations: ${response.statusText}`);
      return [];
    }
  } catch (error) {
    console.error('An error occurred while fetching destinations:', error);
    return [];
  }
};