import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Paper } from '@mui/material';
import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/SignUp';
import Login from './components/Login';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import Footer from './components/Footer';
import PollutionMap from './components/PollutionMap';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <CssBaseline />
        <Container 
          component="main"
          sx={{
            padding: '1rem',
            flex: 1
          }}
        >
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login />}/> 
              <Route path="/submit" element={<ReportForm/>} />
              <Route path="/list" element={<ReportList/>} />
              <Route path='/map' element={<PollutionMap/>} />
            </Routes>
          </Paper>
        </Container>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
