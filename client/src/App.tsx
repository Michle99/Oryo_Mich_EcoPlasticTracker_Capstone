import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Paper } from '@mui/material';
// import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/SignUp';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        {/* <Header /> */}
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Routes>
            <Route path="/" >
              <Home />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Routes>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
