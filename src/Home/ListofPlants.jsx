
import { data2 } from '../database/Data'
import { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Footer from './Footer';
import { IoIosArrowDropleftCircle,IoIosArrowDroprightCircle, IoMdArrowRoundBack } from "react-icons/io";


export default function ListofPlants() {
    const [groupedData, setGroupedData] = useState({});
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

    return (
        <>
            <div className="headlist">
            <p className="backbutton1"><Link to="/"><IoMdArrowRoundBack /> Back</Link></p>
            <p className="listp">List of Weed Plants</p>
            </div>
            <div className="nav-bar">
                    <IoIosArrowDropleftCircle className="backarrow" onClick={()=>scrollList('left')} />
                <div className="alphabet-list" ref={alphabetListRef}>
                    {alphabets.map(letter => (
                        <a key={letter} href={`#${letter}`}>{letter}</a>
                    ))}
                </div>
                    <IoIosArrowDroprightCircle  className="forwardarrow" onClick={()=>scrollList('right')} />
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