
import React, { useState, useEffect, useCallback } from 'react';
import Home from "./Home/Home";
import Filter from "./Filter/Filter";
import Search from "./Filter/Search";
import Pagination from './navigation/Pagination';
import Hero from "./Home/Hero";
import { data2 } from "./database/Data";
import { useLocation } from 'react-router-dom';
import Footer from './Home/Footer';

function App() {
    const [searchValue, ] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [filterValue, setFilterValue] = useState('all');
    const [filterValue2, setFilterValue2] = useState('all');
    const [filterValue3, setFilterValue3] = useState('all');

    const [filteredData, setFilteredData] = useState(data2);
    const [filteredResults, setFilteredResults] = useState([]);
    const itemsPerPage = 6;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const claes = queryParams.get('claes');
    const type = queryParams.get('type');

    const filterData = useCallback(() => {
        const filtered = data2
          .filter(item => filterValue === 'all' || item.status === filterValue)
          .filter(item => filterValue2 === 'all' || (Array.isArray(item.claes) && item.claes.some(f => f === filterValue2)))
          .filter(item => filterValue3 === 'all' || item.mytype === filterValue3)
          .filter(item => item.common.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredData(filtered);
      }, [filterValue, filterValue2, filterValue3, searchTerm]);

    useEffect(() => {
        filterData();
    }, [filterValue, filterValue2, filterValue3, filterData]);

    const onSearchChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    function onFilterChange(value) { setFilterValue(value) }
    function onFilterChange2(value) { setFilterValue2(value) }
    function onFilterChange3(value) { setFilterValue3(value) }

    function changePage(pageNumber) { setCurrentPage(pageNumber) }



    useEffect(() => {
        if (status) { setFilterValue(status) }
        if (claes) { setFilterValue2(claes) }
        if (type) { setFilterValue3(type) }
    }, [status, claes, type]);

    return (
        <div className="maincard">
            <Hero />
            <Search
                Searchchange={onSearchChange}
            />
            <div className="main">
                <Filter
                    filterSearch={onFilterChange}
                    filterSearch2={onFilterChange2}
                    filterSearch3={onFilterChange3}
                    filteredResults={filteredResults}
                    setFilteredResults={setFilteredResults}
                />
                <Home
                    searchValue={searchValue}
                    filteredData={filteredData}
                    filterData2={onFilterChange2}
                    filterData3={onFilterChange3}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredData.length} 
                    />
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    changePage={changePage}
                    totalItems={filteredData.length}
                />
                <Footer />
            </div>

        </div>
    );
}



export default App;