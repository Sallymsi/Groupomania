import React from 'react'
import { updateMsg } from '../js/fetch'
import { useState } from 'react'
import '../styles/sass/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPen} from '@fortawesome/free-solid-svg-icons'

function ButtonUpdatePost ({getMessage, msg_id, userId, optionsGetMessage}) {
    let [inputValue, setInputValue] = useState('');
    let [isActive, setIsActive] = useState(false);
    let messageUtilisateurId = userId;
    let currentUserId = sessionStorage.getItem("userId");

    function openText() {
        if (isActive == false) {
            setIsActive(true);
        } else {
            setIsActive(false)
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
            <button type="button" className="buttonUpdate" onClick={() => openText()}><FontAwesomeIcon icon={faPen} /></button>
            <form className={isActive ? '' : 'visible'}>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} required />
                <button type="submit" onClick={(e) => sendUpdate(e)}><FontAwesomeIcon icon={faPaperPlane}/></button>
            </form>
        </div>
    )
};

export default ButtonUpdatePost