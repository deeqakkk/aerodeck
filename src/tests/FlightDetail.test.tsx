import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FlightDetail from '../components/FlightDetail';
import { useFlightData } from '../hooks/useFlightData';
import { describe, it, expect, Mock } from 'vitest';
import { vi } from 'vitest';

vi.mock('../hooks/useFlightData');
const mockUseFlightData = useFlightData as Mock;

const flightData = {
  id: 'AA123',
  airline: 'American Airlines',
  origin: 'JFK',
  destination: 'LAX',
  departureTime: '2024-09-17T10:00:00Z',
  status: 'On Time',
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

describe('FlightDetail Component', () => {
  it('shows loading spinner while data is loading', () => {
    mockUseFlightData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/flight/1']}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows an error message if data fetching fails', () => {
    mockUseFlightData.mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to load flight data',
    });

    render(
      <MemoryRouter initialEntries={['/flight/1']}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Failed to load flight data')).toBeInTheDocument();
  });

  it('shows a Snackbar when the "Book Ticket" button is clicked', () => {

    mockUseFlightData.mockReturnValue({
      data: flightData,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/flight/1']}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetail />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Book Ticket'));
    expect(screen.getByText('Ticket Booked Successfully!')).toBeInTheDocument();
  });

  it('navigates back when the "Go Back" button is clicked', () => {
    mockUseFlightData.mockReturnValue({
      data: flightData,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/flight/1']}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetail />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Go Back'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
