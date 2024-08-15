import React, { useState, useEffect } from 'react';

interface FilterSectionProps {
  airlines: string[];
  onFilterChange: (filters: any) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ airlines, onFilterChange }) => {
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<string>('');
  const [selectedArrivalTime, setSelectedArrivalTime] = useState<string>('all');
  const [priceOrder, setPriceOrder] = useState<string>(''); // Fiyat sıralama durumu

  useEffect(() => {
    onFilterChange({
      airlines: selectedAirlines,
      stops: selectedStops,
      arrivalTime: selectedArrivalTime,
      priceOrder: priceOrder, // Fiyat sıralama kriteri
    });
  }, [selectedAirlines, selectedStops, selectedArrivalTime,priceOrder]);

  const handleAirlineChange = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]
    );
  };

  return (
    <div className="px-6">
      {/* Price Order Dropdown */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Sort by Price:</label>
        <select
          className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          value={priceOrder}
          onChange={(e) => setPriceOrder(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      {/* Arrival Time filtresi*/}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Arrival Time:</label>
        <div className="flex flex-col">
        <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="form-checkbox text-purple-600"
              value="all"
              onChange={() => setSelectedArrivalTime('all')}
              checked={selectedArrivalTime === 'all'}
            />
            <span className="ml-2">All</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="form-checkbox text-purple-600"
              value="morning"
              onChange={() => setSelectedArrivalTime('morning')}
              checked={selectedArrivalTime === 'morning'}
            />
            <span className="ml-2">00:00 AM - 08:00 AM</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              className="form-checkbox text-purple-600"
              value="afternoon"
              onChange={() => setSelectedArrivalTime('afternoon')}
              checked={selectedArrivalTime === 'afternoon'}
            />
            <span className="ml-2">08:00 AM - 16:00 PM</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-checkbox text-purple-600"
              value="night"
              onChange={() => setSelectedArrivalTime('night')}
              checked={selectedArrivalTime === 'night'}
            />
            <span className="ml-2">16:00 PM - 24:00 PM</span>
          </label>
        </div>
      </div>

      {/* Stops filtresi*/}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">Stops:</label>
        <div className="flex flex-col">
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              name="stops"
              className="form-radio text-purple-600"
              value="nonstop"
              onChange={() => setSelectedStops('nonstop')}
              checked={selectedStops === 'nonstop'}
            />
            <span className="ml-2">Nonstop</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              type="radio"
              name="stops"
              className="form-radio text-purple-600"
              value="1-stop"
              onChange={() => setSelectedStops('1-stop')}
              checked={selectedStops === '1-stop'}
            />
            <span className="ml-2">1 Stop</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="stops"
              className="form-radio text-purple-600"
              value="2+-stops"
              onChange={() => setSelectedStops('2+-stops')}
              checked={selectedStops === '2+-stops'}
            />
            <span className="ml-2">2+ Stops</span>
          </label>
        </div>
      </div>

      {/* Airlines filtresi */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">Airlines Included:</label>
        <div className="flex flex-col">
          {airlines.map((airline) => (
            <label key={airline} className="inline-flex items-center mb-2">
              <input
                type="checkbox"
                className="form-checkbox text-purple-600"
                value={airline}
                onChange={() => handleAirlineChange(airline)}
                checked={selectedAirlines.includes(airline)}
              />
              <span className="ml-2">{airline}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
