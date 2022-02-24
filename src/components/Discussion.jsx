import React from 'react'
import '../styles/sass/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Entree from '../components/Entree'
import Chat from '../components/Chat'
import ButtonDelete from './ButtonDelete'
import ButtonUpdate from './ButtonUpdate'


function Discussion({message, getMessage}) {

    return (
        <div className='boxMessage'>
            <article className='conversation'>
                {message.map((msg, index) => (
                    <div key={`${msg}-${index}`} className="containMsg">
                        <div className='containMsgBox'>
                            <div className='boxImg'>
                                <div className='img'>
                                    <img alt='profil' src={msg.image}></img>
                                </div>
                                <div>
                                    <h2>{msg.prenom} {msg.nom}</h2>
                                    <p>{msg.message}</p>
                                    <div>
                                        <img alt='file' src={msg.file}></img>
                                    </div>
                                </div>
                                <ButtonDelete msg_id = {msg.id} userId = {msg.utilisateur_id} message = {msg} getMessage = {getMessage} />
                                <ButtonUpdate msg_id = {msg.id} userId = {msg.utilisateur_id} message = {msg.message} getMessage = {getMessage} />
                            </div>
                            <Entree msg_id = {msg.id} />
                        </div>
                        <Chat />
                    </div>
                ))}
            </article>
        </div>
    )
};

export default Discussion

/*
<div>
    <button className='btn'><FontAwesomeIcon icon={faThumbsUp}/></button>
    <button className='btn'><FontAwesomeIcon icon={faThumbsDown}/></button>
    
</div>
*/