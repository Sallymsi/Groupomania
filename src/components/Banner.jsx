import '../styles/sass/main.scss'
import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faSignOutAlt, faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { getImgById } from "../js/fetch"

function Banner() {
    const [imageValue, setImageValue] = useState('');
    let userId = sessionStorage.getItem("userId");

    useEffect(() => {
        getImgById(userId).then((img) => setImageValue(img))
    }, [])

    function disconnect() {
        sessionStorage.clear();
    };

    return (
        <div className='barAccount'>
            <div>
                <div className='blockImg'>
                    <img alt='profil' src={imageValue}></img>
                </div>
                <nav>
                    <li><Link to="/homepage"><a><FontAwesomeIcon icon={faChalkboard}/></a></Link></li>
                    <li><Link to="/profil"><a><FontAwesomeIcon icon={faAddressCard}/></a></Link></li>
                    <li><Link to="/" onClick={disconnect}><a><FontAwesomeIcon icon={faSignOutAlt}/></a></Link></li>
                </nav>
            </div>
        </div>
    )
}

export default Banner

