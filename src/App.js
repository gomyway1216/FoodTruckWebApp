import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RefProvider } from './Provider/RefProvider';
import RouteList from './RouteList';
import ApplicationBar from './Component/NavBar/ApplicationBar';
import { AuthProvider } from './Provider/AuthProvider';
import './app.scss';

const App = () => {
  return (
    <BrowserRouter >
      <AuthProvider>
        <RefProvider>
          <ApplicationBar />
          <RouteList />
        </RefProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;