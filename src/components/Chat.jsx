import React from 'react'
import '../styles/sass/main.scss'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Chat({msg_id}) {
    const urlGet = 'http://localhost:4000/api/post/getAnswers/'
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        getAnswers()
    }, [])

    // Création de la requête GET de récupération des réponses :
    async function getAnswers() {
        fetch(urlGet)
            .then(resp => resp.json())

            .then((data) => {
                setAnswers(data)
            })
    };

    let resultAnswers = answers.filter(answer => answer.message_id == msg_id);

    return (
        <div className='boxChat'>
            {resultAnswers.map((msg, index) => (
                <article className='chat'>
                    <div key={`${msg}-${index}`} className="containAnswers">
                        <div className='img'>
                            <FontAwesomeIcon icon={faArrowRight} className="iconArrow"/>
                            <div>
                                <img alt='profil' src={msg.image}></img>
                            </div>
                            <h2>{msg.prenom} {msg.nom}</h2>
                        </div>

                        <p>{msg.message}</p>

                    </div>
                </article>
           ))} 
        </div>
    ) 
};

export default Chat