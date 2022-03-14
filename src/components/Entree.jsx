import React from 'react'
import '../styles/sass/main.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { sendAnswer } from '../js/fetch'

function Entree({msg_id, getAnswers, optionsGetAnswers}) {
    const [reponseInputValue, setReponseInputValue] = useState('')

    function answer(even, msg_id) {
        even.preventDefault();

        const document = {
            userId: sessionStorage.getItem("userId"),
            message_id: msg_id,
            message: reponseInputValue
        };

        const options = {
            method: "POST",
            body: JSON.stringify(document),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };

        if (reponseInputValue !== '') {
            sendAnswer(options).then(() => getAnswers(optionsGetAnswers));
        };
    };

    return (
        <div className='entreeMsg'>
            <input type="text" className='text' value={reponseInputValue} onChange={(e) => setReponseInputValue(e.target.value)} required/>
            <button type="submit" className='submit' onClick={(e) => answer(e, msg_id)}><FontAwesomeIcon icon={faPaperPlane}/></button> 
        </div>
    )
};

export default Entree