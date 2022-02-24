import React from 'react'
import { updateMsg } from '../js/fetch'
import { useState } from 'react'
import '../styles/sass/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function ButtonUpdate ({getMessage, msg_id, userId, optionsGetMessage}) {
    const [inputValue, setInputValue] = useState('');
    const messageUtilisateurId = userId;
    const currentUserId = sessionStorage.getItem("userId");

    function openText() {
        const textArea = document.getElementsByClassName("inputTextarea");

        if (textArea[0].style.display == "none") {
            textArea[0].style.display = "block";
        } else {
            textArea[0].style.display = "none";
        }
    };

    function sendUpdate(even) {
        even.preventDefault();

        const document = {
            message_id: msg_id,
            userId: currentUserId,
            message: inputValue
        };

        const options = {
            method: "PUT",
            body: JSON.stringify(document),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };

        if (currentUserId == messageUtilisateurId) {
            updateMsg(options).then(() => getMessage(optionsGetMessage));
        } else {
            alert("Vous n'avez pas les droits");
        };
        
    };


    return (
        <div className='inputUpdate'>
            <button type="button"  onClick={() => openText()}>Modifier</button>
            <form className='inputTextarea'>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} required />
                <button type="submit" onClick={(e) => sendUpdate(e)}><FontAwesomeIcon icon={faPaperPlane}/></button>
            </form>
        </div>
    )
};

export default ButtonUpdate