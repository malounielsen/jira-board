import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Layout } from './Layout';
import BoardProvider from './Context/BoardContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import { PrivateRoute } from './Components/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*<Layout>
        <App />
        </Layout>*/
root.render(
    <BoardProvider>
<BrowserRouter>
<Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<PrivateRoute><Layout><App/></Layout></PrivateRoute>}/>
          
    </Routes>
    </BrowserRouter>
    </BoardProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

