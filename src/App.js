
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './navigation/Nav';
import PageOne from './PageOne';
import About from './Home/About';
import PlantDetails from './Home/PlantDetails';
import ListofPlants from './Home/ListofPlants';
import Wons from './Home/Wons';
import NotFound from './Home/NotFound';

function App() {
   

    return (
        <Router>
            <Nav/>
            <Routes>
                <Route path="/" element={<PageOne />} />
                <Route path="/about" element={<About />} />
                <Route path="/plant/:id" element={<PlantDetails />} />
                <Route path="/ListofPlants/" element={<ListofPlants />} />
                <Route path="/Wons/" element={<Wons />} />
                <Route component={NotFound} />
            </Routes>
        </Router>
    );
}

export default App;