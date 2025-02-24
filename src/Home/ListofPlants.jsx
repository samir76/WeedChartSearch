import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Footer from './Footer';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoMdArrowRoundBack } from "react-icons/io";
import { data2 } from '../database/Data';

export default function ListofPlants() {
    const [groupedData, setGroupedData] = useState({});
    const [activeLetter, setActiveLetter] = useState('');
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const alphabetListRef = useRef(null);

    const scrollList = (direction) => {
        if (alphabetListRef.current) {
            alphabetListRef.current.scrollLeft += direction === 'left' ? -100 : 100;
        }
    };

    useEffect(() => {
        const sortedData = [...data2].sort((a, b) => a.common.localeCompare(b.common));
        const grouped = sortedData.reduce((grouped, plant) => {
            const letter = plant.common[0].toUpperCase();
            if (!grouped[letter]) {
                grouped[letter] = [];
            }
            grouped[letter].push(plant);
            return grouped;
        }, {});
        setGroupedData(grouped);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveLetter(entry.target.id);
                    }
                });
            },
            { threshold: 0.1 }
        );

        Object.keys(groupedData).forEach(letter => {
            const element = document.getElementById(letter);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            Object.keys(groupedData).forEach(letter => {
                const element = document.getElementById(letter);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [groupedData]);

    const handleLetterClick = (letter) => {
        setActiveLetter(letter);
        const element = document.getElementById(letter);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="headlist">
                <p className="backbutton1"><Link to="/"><IoMdArrowRoundBack /> Back</Link></p>
                <p className="listp">List of Weed Plants</p>
            </div>
            <div className="nav-bar">
                <IoIosArrowDropleftCircle className="backarrow" onClick={() => scrollList('left')} />
                <div className="alphabet-list" ref={alphabetListRef}>
                    {alphabets.map(letter => (
                        <a
                            key={letter}
                            href={`#${letter}`}
                            onClick={() => handleLetterClick(letter)}
                            style={{ 
                                backgroundColor: activeLetter === letter ? 'green' : 'white',
                                color: activeLetter === letter ? 'white' : 'gray',
                                borderRadius: activeLetter === letter ? '50%' : '0%',
                                border: activeLetter === letter ? '1px solid green' : 'none',
                                padding: activeLetter === letter ? '4px 8px' : '4px 8px',
                                margin: activeLetter === letter ? '0 5px' : '0 5px'
                            }} // Change color based on active letter
                        >
                            {letter}
                        </a>
                    ))}
                </div>
                <IoIosArrowDroprightCircle className="forwardarrow" onClick={() => scrollList('right')} />
            </div>

            <div className="listdisplays22">
                {Object.keys(groupedData).sort().map(letter => (
                    <div key={letter} id={letter}>
                        <h2>{letter}</h2>
                        {groupedData[letter].map((plant) => (
                            <div key={plant.commonid} className="listcol">
                                <Link to={`/plant/${plant.commonid}`}>
                                    <img className="imgplanting" src={plant.imagesrc[0]} alt={plant.common} />
                                </Link>
                                <NavLink className="cardlink" to={`/plant/${plant.commonid}`}> {plant.common}</NavLink>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}