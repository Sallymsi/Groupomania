import React from 'react'
import '../styles/sass/main.scss'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Entree from '../components/Entree'


function Discussion() {
    const urlGet = 'http://localhost:4000/api/post/get/'
    const [message, setMessage] = useState([])

    useEffect(() => {
        getMessage()
    }, [])

    // Création de la requête GET de récupération des messages :
    async function getMessage() {
        fetch(urlGet)
            .then(resp => resp.json())

            .then((data) => {
                setMessage(data)
            })
    };

    return (
        <div className='boxMessage'>
            <article className='conversation'>
                {message.map((msg, index) => (
                    <div key={`${msg}-${index}`} className="containMsg">
                        <div className='img'>
                            <img alt='profil' src={msg.image}></img>
                        </div>
                        <div>
                            <h2>{msg.prenom} {msg.nom}</h2>
                            <p>{msg.message}</p>
                        </div>
                        <Entree msg={msg} />
                        <div>
                            <button className='btn'><FontAwesomeIcon icon={faThumbsUp}/></button>
                            <button className='btn'><FontAwesomeIcon icon={faThumbsDown}/></button>
                        </div>
                    </div>
                ))}
            </article>
        </div>
    )
};

export default Discussion