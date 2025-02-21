import React from 'react'
import { wons, data2 } from '../database/Data'
import { Link, NavLink } from 'react-router-dom';
import Footer from './Footer';
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Wons() {
    return (
        <>
            <div className="wonscontainer">
                <div className="wonscontainerheader">
                <Link to="/"><p className="backbutton"><IoMdArrowRoundBack /> Back</p></Link>

                    <h1>Weeds of National Significance (WoNS)</h1>

                    <div className="para">
                        <p>The WoNS listed below are individual species or genera. Please note that some of these species or genera are grouped together as one of the 32 WoNS (e.g. Asparagus weeds, Brooms, Opuntioid cacti, and Bitou bush / Boneseed).</p>
                        <p>Under the National Weeds Strategy, 20 introduced plants were identified as Weeds of National Significance (WoNS).</p>
                        <p>These weeds are regarded as the worst weeds in Australia because of their invasiveness, potential for spread, and economic and environmental impacts.</p>
                        <h4>More information: <Link to="www.weeds.gov.au">Weeds of National Significance</Link></h4>
                    </div>

                    <div className="wonscontainer1">
                        {
                            wons.map((won) => {
                                const match = data2.find(item => item.common === won.title);
                                if ((match) && (won.declared === "old")) {
                                    return (
                                        <div key={won.id} className="listcol">
                                            <div className="list1">
                                                <Link to={`/plant/${match.commonid}`}>
                                                    <img className="imgplanting" src={match.imagesrc[0]} alt={won.title} />
                                                </Link>
                                            </div>
                                            <h4 className="cardlink">
                                                <NavLink to={`/plant/${match.commonid}`}> {won.title}</NavLink><span>{match.sciname}</span>
                                            </h4>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        }
                       
                    </div>
                </div>
                <div className="wonscontainerheader">
                    <h3>in April 2012 the following species where added to the list</h3>

                    <div className="wonscontainer2">
                        {
                            wons.map((won) => {
                                const match = data2.find(item => item.common === won.title);
                                if ((match) && (won.declared === "old")) {
                                    return (
                                        <div key={won.id} className="listcol">
                                            <div className="list1">
                                                <Link to={`/plant/${match.commonid}`}>
                                                    <img className="imgplanting" src={match.imagesrc[0]} alt={won.title} />
                                                </Link>
                                            </div>
                                            <h4 className="cardlink">
                                                <NavLink to={`/plant/${match.commonid}`}> {won.title}</NavLink><span>{match.sciname}</span>
                                            </h4>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        }
                    </div>
                </div>

                <div className="wonscontainerheader">
                    <h2>National Environmental Alert List Weeds</h2>
                    {/* add those
                        Garden geranium
                        Common horsetail
                        Horsetails
                        Rosewood
                        Subterranean cape sedge
                        Uruguayan rice grass */}
                    <p>Under the National Weeds Strategy, the environmental weeds listed  below were identified National Environmental Alert Weeds. Alert Weeds are non-native plant species that are in the early stages of establishment and have the potential to become a significant threat to biodiversity if they are not managed.</p>

                    <div className="wonscontainer3">
                        {
                            wons.map((won) => {
                                const match = data2.find(item => item.common === won.title);
                                if ((match) && (won.declared === "environmental")) {
                                    return (
                                        <div key={won.id} className="listcol">
                                            <div className="list1">
                                                <Link to={`/plant/${match.commonid}`}>
                                                    <img className="imgplanting" src={match.imagesrc[0]} alt={won.title} />
                                                </Link>
                                            </div>
                                            <h4 className="cardlink">
                                                <NavLink to={`/plant/${match.commonid}`}> {won.title}</NavLink><span>{match.sciname}</span>
                                            </h4>
                                        </div>
                                    );
                                }
                                // return {console.log(match)}
                                return null;
                            })
                        }
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}