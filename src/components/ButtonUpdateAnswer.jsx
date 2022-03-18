import React from 'react'
import { updateAnswer } from '../js/fetch'
import { useState } from 'react'
import '../styles/sass/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPen} from '@fortawesome/free-solid-svg-icons'

function ButtonUpdateAnswer ({getAnswers, answerId, userId, optionsGetAnswers}) {
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
            answerId: answerId,
            message: inputValue
        };

        const options = {
            method: "PUT",
            body: JSON.stringify(document),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };

        if (currentUserId == messageUtilisateurId) {
            updateAnswer(options).then(() => getAnswers(optionsGetAnswers));
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

export default ButtonUpdateAnswer