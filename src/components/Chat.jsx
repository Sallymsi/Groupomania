import React from 'react'
import '../styles/sass/main.scss'
import { useState, useEffect } from 'react'

function Chat() {
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

    return (
        <div className='boxChat'>
            <article className='chat'>
                {answers.map((msg, index) => (
                    <div key={`${msg}-${index}`} className="containAnswers">
                        <div className='img'>
                            <img alt='profil' src={msg.image}></img>
                        </div>
                        <div>
                            <h2>{msg.prenom} {msg.nom}</h2>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))}
            </article>
        </div>
    )
};

export default Chat