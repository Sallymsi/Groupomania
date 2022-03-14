import React from 'react'
import '../styles/sass/main.scss'
import { useState, useEffect } from 'react'
import Entree from '../components/Entree'
import Chat from '../components/Chat'
import ButtonDeletePost from './ButtonDeletePost'
import ButtonUpdatePost from './ButtonUpdatePost'
import ButtonLikePost from './ButtonLikePost'


function Discussion({message, getMessage, optionsGetMessage}) {
    const urlGetAnswers = 'http://localhost:4000/api/post/getAnswers/'
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        getAnswers(options)
    }, [])

    const options = {
        method: "GET",
        headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}
    };

    // Création de la requête GET de récupération des réponses :
    async function getAnswers(options) {
        fetch(urlGetAnswers, options)
            .then(resp => resp.json())

            .then((data) => {
                setAnswers(data)
            })
    };

    return (
        <div className='boxMessageBlock'>
            <article className='conversation'>
                {message.map((msg, index) => (
                    <div key={`${msg}-${index}`} className="containMsg">
                        <div className='containMsgBox'>
                            <div className='boxImg'>
                                <div className='imgName'>
                                    <div className='blockLeft'>
                                        <div className='img'>
                                            <img alt='profil' src={msg.image}></img>
                                        </div>
                                        <h2>{msg.prenom} {msg.nom}</h2>
                                    </div>
                                    <div className='blockRight'>
                                        <ButtonDeletePost msg_id = {msg.id} userId = {msg.utilisateur_id} message = {msg} getMessage = {getMessage} optionsGetMessage = {optionsGetMessage}/>
                                        <ButtonUpdatePost msg_id = {msg.id} userId = {msg.utilisateur_id} message = {msg.message} getMessage = {getMessage} optionsGetMessage = {optionsGetMessage}/>
                                        <div className='blockLike'>
                                            <ButtonLikePost msg_id = {msg.id} />
                                        </div>
                                    </div>
                                </div>
                                <div className='boxMsg'>
                                    <h2>{msg.message}</h2>
                                    {msg.file && (
                                        <div className='imgFile'>
                                            <img alt='file' src={msg.file}></img>
                                            <video controls src={msg.file} type="video/mp4" alt='file'></video>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='boxCommentaire'>
                                <Entree msg_id = {msg.id} getAnswers = {getAnswers} optionsGetAnswers = {options}/>
                            </div>
                        </div>
                        <Chat answers = {answers} getAnswers = {getAnswers} optionsGetAnswers = {options} msg_id = {msg.id} />
                    </div>
                ))}
            </article>
        </div>
    )
};

export default Discussion

