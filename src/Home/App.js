import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './navigation/Nav';
import PageOne from './PageOne';
import About from './Home/About';
import PlantDetails from './Home/PlantDetails';

function App() {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<PageOne />} />
                <Route path="/about" element={<About />} />
                <Route path="/plant/:id" element={<PlantDetails />} />
            </Routes>
        </Router>
    );
}

export default App;