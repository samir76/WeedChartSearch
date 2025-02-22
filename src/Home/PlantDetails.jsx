import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { data2 } from "../database/Data.js";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from './Footer.jsx';


export default function PlantDetails() {
    let { id } = useParams();
    id = Number(id);


    const [selectedImage, setSelectedImage] = useState(null);

    const plant = data2.find(plant => Number(plant.commonid) === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (plant) {
            setSelectedImage(plant.imagesrc[0]);
        }
    }, [plant]);


    if (!plant) {
        return <div>Plant not found</div>;
    } else {
        return (
            <>
                <div className="weeddesc">
                    <div className="image-container">
                        <img className="weedimg" src={selectedImage} alt={plant.common} />
                        <div className="small-images">
                            {plant.imagesrc.map((src, index) => (
                                <img
                                    key={index}
                                    className="small-weedimg"
                                    src={src}
                                    alt={plant.common}
                                    onClick={() => setSelectedImage(src)}
                                />
                            ))}
                        </div>
                        <p className="clickthumb">Click on the thumbnails for larger view</p>
                    </div>

                    <div className="moreonweed">
                        <Link to="/"><p className="backbutton"><IoMdArrowRoundBack /> Back</p></Link>
                        <h2>{plant.common}</h2>
                        <h3>{plant.sciname}</h3>

                    </div>

                    <div className="weeddetail">
                        <div>
                            <h4 className="family">Family <span>{plant.family}</span></h4>
                        </div>

                        <div>
                            <h4>Status <span><Link to={`/?status=${plant.status}`}>{plant.status}</Link></span></h4>
                        </div>

                        
                            {plant.mytype && (
                                <div>
                                <h4>Type <span><Link to={`/?type=${plant.mytype}`}>{plant.mytype}</Link></span></h4>
                                </div>
                            )}
                        

                       
                            {plant.claes && (
                                <>
                                 <div>
                                    <h4>Class
                                        <ul>
                                            {plant.claes.map((claes, index) => (
                                                <li key={index}><Link to={`/?claes=${claes}`}>{claes}</Link></li>
                                            ))
                                            }
                                        </ul>
                                    </h4>
                                    </div>
                                </>
                            )}
                        
                    </div>
                    <div className="weeddesk">
                        <p>{plant.desc.split('\n').map((line, index) => {
                            if (line.includes(': ')) {
                                const [heading, ...rest] = line.split(': ');
                                const text = rest.join(': ');

                                return (
                                    <span key={index}>
                                        <strong>{heading}:</strong> {text}
                                        <br />
                                    </span>
                                );
                            } else {
                                return (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                );
                            }
                        })}</p>

                    </div>
                    <div className="weedinfo">
                        {plant.territoryprofiles && plant['territoryprofileshref'] && plant.territoryprofiles.length > 0 && plant['territoryprofileshref'].length > 0 && (
                            <>
                                <h4>Territory Profiles (for detailed information): </h4>
                                <ul >
                                    {plant.territoryprofiles.map((profile, index) => (
                                        <li key={index}>
                                            <a href={plant['territoryprofileshref'][index]} target="_blank" rel="noopener noreferrer">
                                                {profile}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </>
        );

    }

}