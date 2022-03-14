import React from 'react'
import '../styles/sass/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ButtonDeleteAnswer from './ButtonDeleteAnswer'
import ButtonUpdateAnswer from './ButtonUpdateAnswer'
import ButtonLikeAnswer from './ButtonLikeAnswer'

function Chat({msg_id, answers, getAnswers, optionsGetAnswers}) {

    let resultAnswers = answers.filter(answer => answer.message_id == msg_id);

    return (
        <div className='boxChat'>
            {resultAnswers.map((msg, index) => (
                <article className='chat'>
                    <div key={`${msg}-${index}`} className="containAnswers">
                        <div className='img'>
                            <div className='blockLeft'>
                                <FontAwesomeIcon icon={faArrowRight} className="iconArrow"/>
                                <div className='profilCercle'>
                                    <img alt='profil' src={msg.image}></img>
                                </div>
                                <h2>{msg.prenom} {msg.nom}</h2>
                            </div>
                            {msg.utilisateur_id == sessionStorage.getItem('userId') && (
                                <div className='blockRight'>
                                    <ButtonDeleteAnswer getAnswers ={getAnswers} optionsGetAnswers = {optionsGetAnswers} answerId = {msg.id} userId = {msg.utilisateur_id}/>
                                    <ButtonUpdateAnswer getAnswers ={getAnswers} optionsGetAnswers = {optionsGetAnswers} answerId = {msg.id} userId = {msg.utilisateur_id}/>
                                    <ButtonLikeAnswer msgId = {msg.id}/> 
                                </div>
                            )}                             
                        </div>
                        <p>{msg.message}</p>
                    </div>
                </article>
           ))} 
        </div>
    ) 
};

export default Chat