import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/admin/Login';

export default function App() {


  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>

  );
}
