import { useState, useEffect } from 'react';
import  Flight  from '../types/FlightTypes';
import { API_URL } from '../utils/constants';


export const useFlightData = (flightId?: string) => {
  const [data, setData] = useState<Flight[]| Flight | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = flightId ? `${API_URL}/${flightId}` : API_URL;
        const response = await fetch(url);
        const result = await response.json();

        // If we're fetching a list of flights
        if (!flightId) {
          const flights = result.map((flight: Flight) => ({
            ...flight,
            // Add searchText field to concatenate relevant data for search
            searchText: `${flight.flightNumber} ${flight.airline} ${flight.origin} ${flight.destination}`.toLowerCase(),
          }));
          setData(flights);
        } else {
          // If we're fetching details of a single flight
          setData(result);
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch flight data');
        setLoading(false);
      }
    };

    fetchData();
  }, [flightId]);

  return { data, loading, error };
};
