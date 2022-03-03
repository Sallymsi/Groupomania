import React from 'react'
import '../styles/sass/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Entree from '../components/Entree'
import Chat from '../components/Chat'
import ButtonDelete from './ButtonDelete'
import ButtonUpdate from './ButtonUpdate'


function Discussion({message, getMessage, optionsGetMessage}) {

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
                                        <ButtonDelete msg_id = {msg.id} userId = {msg.utilisateur_id} message = {msg} getMessage = {getMessage} optionsGetMessage = {optionsGetMessage}/>
                                        <ButtonUpdate msg_id = {msg.id} userId = {msg.utilisateur_id} message = {msg.message} getMessage = {getMessage} optionsGetMessage = {optionsGetMessage}/> 
                                    </div>
                                </div>
                                <div className='boxMsg'>
                                    <h2>{msg.message}</h2>
                                    {msg.file && (
                                        <div className='imgFile'>
                                            <img alt='file' src={msg.file}></img>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='boxCommentaire'>
                                <Entree msg_id = {msg.id} />
                            </div>
                        </div>
                        <Chat msg_id = {msg.id}/>
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


