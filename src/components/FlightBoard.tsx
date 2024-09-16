import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, TablePagination, TextField, IconButton,
} from '@mui/material';
import { useFlightData } from '../hooks/useFlightData';
import { Link } from 'react-router-dom';
import { Flight as FlightIcon, AccessTime, ListAlt, OpenInNew, FlightLand, FlightTakeoff, ConnectingAirports } from '@mui/icons-material';
import Flight from '../types/FlightTypes';
import StatusChip from '../components/common/StatusChip';
import TableHeaderCell from '../components/common/TableHeaderCell';

const filterFlights = (flights: Flight[], searchQuery: string): Flight[] => {
  if (!searchQuery) return flights;
  const query = searchQuery.toLowerCase();
  return flights.filter((flight) => flight.searchText.includes(query));
};

const FlightBoard: React.FC = () => {
  const { data, loading, error } = useFlightData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [filteredData, setFilteredData] = useState<Flight[]>([]);

  // Handle search query changes and update filtered data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredFlights = filterFlights(data, searchQuery);
      setFilteredData(filteredFlights);
    }
  }, [searchQuery, data]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Paper>
      <TextField
        label="Search Flights"
        variant="filled"
        fullWidth
         sx={{ my:0 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by Flight Number, Airline, Origin, Destination"
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableHeaderCell icon={ListAlt} text="Flight Number" />
              <TableHeaderCell icon={FlightIcon} text="Airline" />
              <TableHeaderCell icon={FlightTakeoff} text="Origin" />
              <TableHeaderCell icon={FlightLand} text="Destination" />
              <TableHeaderCell icon={AccessTime} text="Departure Time" />
              <TableHeaderCell icon ={ConnectingAirports} text='Status'/>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ?
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((flight: Flight) => (
                  <TableRow key={flight.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' } }}>
                    <TableCell >
                      <Link to={`/flight/${flight.id}`}>
                        {flight.flightNumber}
                        <IconButton>
                          <OpenInNew fontSize="small" />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell>{flight.airline}</TableCell>
                    <TableCell>{flight.origin}</TableCell>
                    <TableCell>{flight.destination}</TableCell>
                    <TableCell>{new Date(flight.departureTime).toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusChip status={flight.status} />
                    </TableCell>
                  </TableRow>
                ))
            : (
                <TableRow>
                <TableCell colSpan={6} align="center">
                <Alert severity="warning">
                    No flights found for the search query, Please try again.
                </Alert>
                </TableCell>
                </TableRow>
            )
            }
          </TableBody>
        </Table>
      </TableContainer>

      {filteredData.length > 0 && (
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[6, 12, 18]}
        />
      )}
    </Paper>
  );
};

export default FlightBoard;
