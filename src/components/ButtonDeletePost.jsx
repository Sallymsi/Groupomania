import React from 'react'
import { deleteMsg, getAdmin } from '../js/fetch'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../styles/sass/main.scss'

function ButtonDeletePost ({getMessage, msg_id, userId, message, optionsGetMessage}) {
    const [adminValue, setAdminValue] = useState('');
    const utilisateur_id = userId;
    const currentUserId = sessionStorage.getItem('userId');

    const optionsgetAdmin = {
        method: "GET",
        headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token") + ' ' + currentUserId},
    };

    useEffect(() => {
            getAdmin(optionsgetAdmin).then((data) => setAdminValue(data));
    },'')

    // Création de la requête DELETE afin de supprimer un post :
    function sendDelete(even, msg_id) {
        even.preventDefault();

        const documentDeletePost = {
            message_id: msg_id,
            message: message
        };

        const optionsDeletePost = {
            method: "DELETE",
            body: JSON.stringify(documentDeletePost),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };

        if ((currentUserId == utilisateur_id) || adminValue == 1) {
            deleteMsg(optionsDeletePost).then(() => getMessage(optionsGetMessage));
        } else {
            alert("Vous n'avez pas les droits");
        };
        
    }

    return (
        <div>
            <button type="button" className="buttonDelete" onClick={(e) => sendDelete(e, msg_id)}><FontAwesomeIcon icon={faTrash} /></button> 
        </div>
    )
};

export default ButtonDeletePost