import React,{ useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screen/Home';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';

const App = () => {


    useEffect(() => {
        
        store.dispatch(loadUser());
        
    }, []);

    return( 
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/login' element={<LoginScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
