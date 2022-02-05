import React from 'react';
import '../styles/sass/main.scss'
import Banner from "../components/Banner"
import ProfilC from "../components/ProfilC"

function Profil() {
    return (
        <div className='homepage'>
            <Banner />
            <ProfilC />
        </div>
    )
}

export default Profil