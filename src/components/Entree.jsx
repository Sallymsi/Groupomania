import React from 'react'
import '../styles/sass/main.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { reponse } from '../js/fetch'

function Entree(props) {
    const [reponseInputValue, setReponseInputValue] = useState('')
    const msg_id = props.msg_id;

    function answer(even, msg_id) {
        even.preventDefault();

        const documentR = {
            userId: sessionStorage.getItem("userId"),
            message_id: msg_id,
            message: reponseInputValue
        };

        console.log(msg_id);
        console.table(documentR);

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
            <button type="submit" className='submit' onClick={(e) => answer(e, msg_id)}><FontAwesomeIcon icon={faPaperPlane}/></button> 
        </div>
    )
};

export default Entree