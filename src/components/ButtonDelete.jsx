import React from 'react'
import { deleteMsg } from '../js/fetch'
import '../styles/sass/main.scss'

function ButtonDelete ({getMessage, msg_id, userId, message, optionsGetMessage}) {
    const utilisateur_id = userId;
    const currentUserId = sessionStorage.getItem('userId');

    function sendDelete(even, msg_id) {
        even.preventDefault();

        const document = {
            message_id: msg_id,
            message: message
        };

        const options = {
            method: "DELETE",
            body: JSON.stringify(document),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };

        if (currentUserId == utilisateur_id) {
            deleteMsg(options).then(() => getMessage(optionsGetMessage));
        } else {
            alert("Vous n'avez pas les droits");
        };
        
    }

    return (
        <div>
            <button type="button" onClick={(e) => sendDelete(e, msg_id)}>Supprimer</button> 
        </div>
    )
};

export default ButtonDelete