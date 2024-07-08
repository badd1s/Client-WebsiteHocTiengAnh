import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { DataProvider } from './context/DataContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);