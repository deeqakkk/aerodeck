import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlightBoard from '../components/FlightBoard';
import { useFlightData } from '../hooks/useFlightData';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';
import { Mock } from 'vitest';

vi.mock('../hooks/useFlightData');
const mockUseFlightData = useFlightData as Mock;

describe('FlightBoard Component', () => {
    it('shows loading spinner while fetching data', () => {
        mockUseFlightData.mockReturnValue({
            data: null,
            loading: true,
            error: null,
        });

        render(
            <MemoryRouter>
                <FlightBoard />
            </MemoryRouter>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('displays an error message if fetching data fails', () => {
        mockUseFlightData.mockReturnValue({
            data: null,
            loading: false,
            error: 'Failed to fetch flight data',
        });

        render(
            <MemoryRouter>
                <FlightBoard />
            </MemoryRouter>
        );

        expect(screen.getByText('Failed to fetch flight data')).toBeInTheDocument();
    });

    it('renders flight data in a table', () => {
        const mockFlights = [
            {
                id: '1',
                flightNumber: 'AA123',
                airline: 'American Airlines',
                origin: 'JFK',
                destination: 'LAX',
                departureTime: '2024-09-17T10:00:00Z',
                status: 'On Time',
                searchText: 'aa123 american airlines jfk lax',
            },
            {
                id: '2',
                flightNumber: 'DL456',
                airline: 'Delta Airlines',
                origin: 'SFO',
                destination: 'ATL',
                departureTime: '2024-09-18T12:00:00Z',
                status: 'Delayed',
                searchText: 'dl456 delta airlines sfo atl',
            },
        ];

        mockUseFlightData.mockReturnValue({
            data: mockFlights,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter>
                <FlightBoard />
            </MemoryRouter>
        );

        expect(screen.getByText('AA123')).toBeInTheDocument();
        expect(screen.getByText('American Airlines')).toBeInTheDocument();
        expect(screen.getByText('JFK')).toBeInTheDocument();
        expect(screen.getByText('LAX')).toBeInTheDocument();
        expect(screen.getByText('DL456')).toBeInTheDocument();
        expect(screen.getByText('Delta Airlines')).toBeInTheDocument();
        expect(screen.getByText('SFO')).toBeInTheDocument();
        expect(screen.getByText('ATL')).toBeInTheDocument();
    });

    it('filters flights based on search query', () => {
        const mockFlights = [
            {
                id: '1',
                flightNumber: 'AA123',
                airline: 'American Airlines',
                origin: 'JFK',
                destination: 'LAX',
                departureTime: '2024-09-17T10:00:00Z',
                status: 'On Time',
                searchText: 'aa123 american airlines jfk lax',
            },
            {
                id: '2',
                flightNumber: 'DL456',
                airline: 'Delta Airlines',
                origin: 'SFO',
                destination: 'ATL',
                departureTime: '2024-09-18T12:00:00Z',
                status: 'Delayed',
                searchText: 'dl456 delta airlines sfo atl',
            },
        ];

        mockUseFlightData.mockReturnValue({
            data: mockFlights,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter>
                <FlightBoard />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Search Flights'), { target: { value: 'AA123' } });

        expect(screen.getByText('AA123')).toBeInTheDocument();
        expect(screen.queryByText('DL456')).toBeNull();
    });

    it('shows a message when no flights match the search query', () => {
        const mockFlights = [
            {
                id: '1',
                flightNumber: 'AA123',
                airline: 'American Airlines',
                origin: 'JFK',
                destination: 'LAX',
                departureTime: '2024-09-17T10:00:00Z',
                status: 'On Time',
                searchText: 'aa123 american airlines jfk lax',
            },
        ];

        mockUseFlightData.mockReturnValue({
            data: mockFlights,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter>
                <FlightBoard />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Search Flights'), { target: { value: 'XYZ999' } });

        expect(screen.getByText('No flights found for the search query, Please try again.')).toBeInTheDocument();
    });

});
