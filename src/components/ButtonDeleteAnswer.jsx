import React from 'react'
import { deleteAnswer, getAdmin } from '../js/fetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../styles/sass/main.scss'

function ButtonDeleteAnswer ({getAnswers, answerId, userId, optionsGetAnswers}) {
    const utilisateur_id = userId;
    const currentUserId = sessionStorage.getItem('userId');

    // Création de la requête DELETE afin de supprimer un post :
    function sendDelete(e) {
        e.preventDefault();

        const documentDeleteAnswer = {
            answerId: answerId
        };

        const documentGetAdmin = {
            userId: currentUserId
        };

        const optionsDeleteAnswer = {
            method: "DELETE",
            body: JSON.stringify(documentDeleteAnswer),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };

        const optionsgetAdmin = {
            method: "GET",
            body: JSON.stringify(documentGetAdmin),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };

        let acces = getAdmin(optionsgetAdmin);

        console.log(acces);

        if (currentUserId == utilisateur_id || acces == 1) {
            deleteAnswer(optionsDeleteAnswer).then(() => getAnswers(optionsGetAnswers));
        } else {
            alert("Vous n'avez pas les droits");
        };  
    }

    return (
        <div>
            <button type="button" className="buttonDelete" onClick={(e) => sendDelete(e)}><FontAwesomeIcon icon={faTrash} /></button> 
        </div>
    )
};

export default ButtonDeleteAnswer