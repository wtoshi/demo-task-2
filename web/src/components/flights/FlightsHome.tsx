import React, { useState } from 'react';
import SearchSection from './SearchSection';
import FlightCard from './FlightCard';
import FilterSection from './FilterSection';
import EmptyFlight from './EmptyFlight';
import { ApiFlightDto } from 'src/services/flightApiService';
import { fetchFlights } from 'src/services/flightService';
import { Button } from '@mui/material';

const FlightsHome: React.FC = () => {
    const [flights, setFlights] = useState<ApiFlightDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Sayfa numarası state
    const flightsPerPage = 3; // Her sayfada gösterilecek uçuş sayısı
    const [pageKey, setPageKey] = useState(0); // Her sayfa için benzersiz key
    const [departureIATA, setDepartureIATA] = useState('');
    const [arrivalIATA, setArrivalIATA] = useState('');
    const [tripType, setTripType] = useState('round');
    const [filters, setFilters] = useState<any>({}); // Filtreleme kriterlerini saklama
    const [filteredFlights, setFilteredFlights] = useState<ApiFlightDto[]>([]);


    const searchFlights = async (searchCriteria: any, tripType: string, departureIATA: string, arrivalIATA: string) => {
        setLoading(true);

        setTripType(tripType);
        setArrivalIATA(arrivalIATA);
        setDepartureIATA(departureIATA);

        const response = await fetchFlights(searchCriteria, tripType, departureIATA, arrivalIATA);
        console.log('flights response', response);
        if (response) {

            // Her bir uçuşa rastgele bir fiyat
            const flightsWithPrices = response.map((flight: any) => ({
                ...flight,
                price: `${Math.floor(Math.random() * (400 - 200 + 1)) + 200}`, // 200 ile 400 arasında rastgele bir fiyat
            }));

            setFlights(flightsWithPrices); // Tüm uçuşları kaydet
            setFilteredFlights(flightsWithPrices); // Filtrelenmemiş uçuşlar
            setCurrentPage(1); // Arama yapıldıktan sonra sayfa numarasını sıfırla
            setPageKey(0); // İlk sayfa için key sıfırla
        } else {
            setFlights([]);
            setFilteredFlights([]);
        }
        setLoading(false);
    };

    // Filtreleme işlemi
    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
        let filtered = flights.filter((flight) => {
            const airlineMatch = newFilters.airlines.length === 0 || newFilters.airlines.includes(flight.prefixIATA);
            const stopsMatch = newFilters.stops === '' ||
                (newFilters.stops === 'nonstop' && flight.route.destinations.length <= 1) ||
                (newFilters.stops === '1-stop' && flight.route.destinations.length === 2) ||
                (newFilters.stops === '2+-stops' && flight.route.destinations.length > 2);
            const arrivalTime = new Date(flight.estimatedLandingTime).getHours();
            const arrivalTimeMatch =
                newFilters.arrivalTime === 'all' ||
                (newFilters.arrivalTime === 'morning' && arrivalTime >= 0 && arrivalTime < 8) ||
                (newFilters.arrivalTime === 'afternoon' && arrivalTime >= 8 && arrivalTime < 16) ||
                (newFilters.arrivalTime === 'night' && arrivalTime >= 16 && arrivalTime <= 24);

            return airlineMatch && stopsMatch && arrivalTimeMatch;
        });

        // Fiyat sıralama işlemi
        if (newFilters.priceOrder) {
            filtered = filtered.sort((a: any, b: any) => {
                const priceA = parseFloat(a.price.replace('$', ''));
                const priceB = parseFloat(b.price.replace('$', ''));

                if (newFilters.priceOrder === 'asc') {
                    return priceA - priceB; // Fiyatı küçükten büyüğe sırala
                } else if (newFilters.priceOrder === 'desc') {
                    return priceB - priceA; // Fiyatı büyükten küçüğe sırala
                }

                return 0; // Varsayılan sıralama (değişiklik yapma)
            });
        }

        setFilteredFlights(filtered);
        setCurrentPage(1); // Filtreleme sonrası sayfa numarasını sıfırla
        setPageKey(0); // İlk sayfa için key sıfırla
    };

    // Şu anki sayfada gösterilecek uçuşları hesapla
    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPageKey(prevKey => prevKey + 1); // Key'i güncelleyerek animasyonları tetikle
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Sayfayı en üste kaydır
        }
    };

    const handleNextPage = () => {
        if (indexOfLastFlight < filteredFlights.length) {
            setCurrentPage(currentPage + 1);
            setPageKey(prevKey => prevKey + 1); // Key'i güncelleyerek animasyonları tetikle
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Sayfayı en üste kaydır
        }
    };

    // Dinamik olarak airlines listesini al
    const uniqueAirlines = Array.from(new Set(flights.map(flight => flight.prefixIATA)));

    return (

        <>
            <SearchSection onSearch={searchFlights} />

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                    {loading ? (
                        <p>Loading...</p>
                    ) : !filteredFlights || filteredFlights.length === 0 ? (
                        <EmptyFlight />
                    ) : (
                        currentFlights.map((flight, index) => (
                            <FlightCard
                                key={`${pageKey}-${index}`} // Benzersiz key ile animasyonları tetikleme
                                flight={flight}
                                tripType={tripType}
                                departureIATA={departureIATA}
                                arrivalIATA={arrivalIATA}
                                delay={index * 0.5}
                            />
                        ))
                    )}
                </div>
                {/* Filtreler sadece uçuşlar bulunduğunda gösterilecek */}
                {flights && flights.length > 0 && (
                    <FilterSection airlines={uniqueAirlines} onFilterChange={handleFilterChange} />
                )}
            </div>

            {
                filteredFlights && filteredFlights.length > 0 &&
                <div className="flex justify-center mt-6 px-6">
                    <Button
                        variant="text"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1} // Eğer önceki sayfa yoksa buton pasif olur
                    >
                        Prev
                    </Button>
                    <Button
                        variant="text"
                        onClick={handleNextPage}
                        disabled={indexOfLastFlight >= filteredFlights.length} // Eğer sonraki sayfa yoksa buton pasif olur
                    >
                        Next
                    </Button>
                </div>
            }
        </>
    );
};

export default FlightsHome;
