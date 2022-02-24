import '../styles/sass/main.scss'
import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faUsers, faSignOutAlt, faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { getImgById } from "../js/fetch"

function Banner() {
    const [imageValue, setImageValue] = useState('');
    let userId = sessionStorage.getItem("userId");

    useEffect(() => {
        getImgById(userId).then((img) => setImageValue(img))
    }, [])

    return (
        <div className='barAccount'>
            <div className='blockImg'>
                <img alt='profil' src={imageValue}></img>
            </div>
            <nav>
                <li><Link to="/homepage"><a><FontAwesomeIcon icon={faChalkboard}/></a></Link></li>
                <li><Link to="/profil"><a><FontAwesomeIcon icon={faAddressCard}/></a></Link></li>
                <li><Link to="/amis"><a><FontAwesomeIcon icon={faUsers}/></a></Link></li>
                <li><Link to="/"><a><FontAwesomeIcon icon={faSignOutAlt}/></a></Link></li>
            </nav>
        </div>
    )
}

export default Banner

