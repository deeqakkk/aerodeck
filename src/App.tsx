import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import FlightBoard from './components/FlightBoard';
import FlightDetail from './components/FlightDetail';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container component="main" sx={{ flex: 1, py: 3 }}>
          <Routes>
            <Route path="/" element={<FlightBoard />} />
            <Route path="/flight/:id" element={<FlightDetail />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;
