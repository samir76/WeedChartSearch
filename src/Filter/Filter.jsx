
import Search from './Search.jsx';

import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { data2 } from "../database/Data";

export default function Filter({ setFilteredResults }) {

    // let totalItems = buttons3.length;

    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const queryParams = new URLSearchParams(location.search);

    const [selectedButtons, setSelectedButtons] = useState({
        status: queryParams.get('status') || 'all',
        claes: queryParams.get('claes') || 'all',
        type: queryParams.get('type') || 'all',
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setSearchTerm(queryParams.get('search') || '');
        setSelectedButtons({
            status: queryParams.get('status') || 'all',
            claes: queryParams.get('claes') || 'all',
            type: queryParams.get('type') || 'all',
        });
    }, [location.search]);

    const categories = {
        status: selectedButtons.status,
        claes: selectedButtons.claes,
        type: selectedButtons.type,
      };
    
      const handleSearchChange = (searchTerm, category) => {
        setSearchTerm(searchTerm);
        if (category) {
          setSelectedButtons(prevButtons => ({ ...prevButtons, [category]: searchTerm }));
        }
      };
    

    const navigate = useNavigate();

    const buttons = useMemo(() => ['all', 'Priority Weed', 'Non-priority Weed'], []);
    const buttons2 = useMemo(() => ['all', 'Environmental', 'Agricultural', 'Nuisance Weed', 'Native Lookalike', 'Invasive Garden Plant'], []);
    const buttons3 = useMemo(() => ['all', 'Aquatic', 'Grassy', 'Herbaceous', 'Woody', 'Vines', 'Cacti/Succulents'], []);

    const buttonValueChange = useCallback((index) => {
        const status = buttons[index];
        setSelectedButtons(prevButtons => ({
            ...prevButtons,
            status,
        }));
    }, [buttons, setSelectedButtons]);

    const buttonValueChange2 = useCallback((index) => {
        const claes = buttons2[index];
        setSelectedButtons(prevButtons => ({
            ...prevButtons,
            claes,
        }));
    }, [buttons2, setSelectedButtons]);

    const buttonValueChange3 = useCallback((index) => {
        const type = buttons3[index];
        setSelectedButtons(prevButtons => ({
            ...prevButtons,
            type,
        }));
    }, [buttons3, setSelectedButtons]);

    // Update the URL when the selected buttons change
    useEffect(() => {
        const queryString = Object.entries(selectedButtons)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        navigate(`/?${queryString}`);
    }, [selectedButtons, navigate]);

    useEffect(() => {
        const results = data2.filter(item =>
            item.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResults(results);
    }, [searchTerm, setFilteredResults]);

    return (

       
        <div style={{display:'none'}}> 
       <Search Searchchange={handleSearchChange} categories={categories} />
            <form id="cats" name="cats">
           {/* <form > */}
            <div>
                    <h2>Weed Status</h2> 
                    {<div className="button-container">
                        <select onChange={(e) => buttonValueChange(e.target.value)}>
                            {buttons.map((button, index) => (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    {button}
                                </option>
                            ))}
                        </select>
                    </div>}
                </div>

                <div>
                    <h2>Weed Class</h2>
                    {<div className="button-container">
                        <select onChange={(e) => buttonValueChange2(e.target.value)}>
                            {buttons2.map((button, index) => (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    {button}
                                </option>
                            ))}
                        </select>
                    </div>}
                </div>


                <div>
                    <h2>Weed Type</h2>
                    {<div className="button-container">
                        <select onChange={(e) => buttonValueChange3(e.target.value)}>
                            {buttons3.map((button, index) => (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    {button}
                                </option>
                            ))}
                        </select>
                    </div>}
                </div>
                
            </form>
        </div>
        
    )
    // Clean up the event listener when the component unmounts

}


