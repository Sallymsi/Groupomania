import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Profil from "./pages/Profil";
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/homepage" element={<Homepage />}></Route>
                <Route path="/profil" element={<Profil />}></Route>
            </Routes>     
        </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
