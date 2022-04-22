import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Booking } from './components/Booking/Booking';
import { NotFound } from './components/NotFound';
import { Contact } from './components/Contact';
import { Admin } from './components/Admin';

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container as Element);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/booking" element={<Booking></Booking>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
