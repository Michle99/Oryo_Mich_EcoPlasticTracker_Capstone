import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Paper } from '@mui/material';
// import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/SignUp';
import Login from './components/Login';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Container 
        component="main"
        sx={{
          padding: '1rem',
        }}
      >
        {/* <Header /> */}
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login />}/> 
            <Route path="/submit" element={<ReportForm/>} />
            <Route path="/list" element={<ReportList/>} />
          </Routes>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
