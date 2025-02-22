import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Home({ filteredData = [], currentPage, itemsPerPage, searchValue }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const claes = queryParams.get('claes');
  const status = queryParams.get('status');

  let message = 'Total Weed Plants listed ';
  const totalItems = filteredData.length;

  if (filteredData && filteredData.length > 0) {
    message += ``;
  }
  if (type && type !== 'all') {
    message += ` under Type '${type}'`;
  }
  if (claes && claes !== 'all') {
    message += ` under Class '${claes}'`;
  }
  if (status && status !== 'all') {
    message += ` under Status '${status}'`;
  }

  return (
    <div className="cards">
      <div className="totallisted">
        <p>{message}: <span>{totalItems}</span></p>
      </div>

      {
        (() => {
          const filteredSearchedData = filteredData
            .filter((plant) => {
              return search ? plant.common.toLowerCase().includes(search.toLowerCase()) : true;
            });

          const sortedData = filteredSearchedData.sort((a, b) => a.common > b.common ? 1 : -1);

          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const itemsToDisplay = sortedData.slice(startIndex, endIndex);

          return itemsToDisplay.map((plant) => {
            return (
              <div key={plant.commonid} className="card">
                <Link to={`/plant/${plant.commonid}`}>
                  <img
                    className="plantimg"
                    src={plant.imagesrc[0] || plant.imagesrc[1] || 'defaultImage.jpg'}
                    alt={plant.common}
                  />
                </Link>
                <div className="container">
                  <h2><NavLink className="cardlink" to={`/plant/${plant.commonid}`}> {plant.common}</NavLink></h2>
                  <div className="features">
                    {plant.mytype && (<p className="mapspan1"><Link to={`/?type=${plant.mytype}`}>{plant.mytype}</Link></p>)}
                    <>{plant.claes && plant.claes.map((claesItem, index) => <p className="mapspan2" key={index}><Link to={`/?claes=${claesItem}`}>{claesItem}</Link></p>)} </>
                  </div>
                  {plant.desc && (<p className="desclimit">{plant.desc.split(" ").slice(0, 40).join(" ")} ... </p>)}
                  <NavLink className="readmore" to={`/plant/${plant.commonid}`}> Read More ...</NavLink>
                </div>
              </div>
            );
          })
        })()
      }

    </div>
  );
}