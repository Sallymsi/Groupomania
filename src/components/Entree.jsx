import React from 'react'
import '../styles/sass/main.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { reponse } from '../js/fetch'

function Entree(msg) {
    const [reponseInputValue, setReponseInputValue] = useState('')

    function answer(even, msg) {
        even.preventDefault();

        const documentR = {
            userId: sessionStorage.getItem("userId"),
            message_id: msg.id,
            message: reponseInputValue
        };

        const optionsR = {
            method: "POST",
            body: JSON.stringify(documentR),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };
        reponse(optionsR);
    };

    return (
        <div>
            <input type="text" className='text' value={reponseInputValue} onChange={(e) => setReponseInputValue(e.target.value)} required/>
            <button type="submit" className='submit' onClick={(e) => answer(e, msg)}><FontAwesomeIcon icon={faPaperPlane}/></button> 
        </div>
    )
};

export default Entree