import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import MapsPage from './pages/MapsPage';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <Provider store={store}>
            <ChakraProvider >
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/home' element={
                      <ProtectedRoute>
                        <MapsPage />
                      </ProtectedRoute>
                    } />
                </Routes>
            </Router>
            </ChakraProvider>
        </Provider>
    );
};

export default App;
