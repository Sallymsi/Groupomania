import React from 'react'
import { deleteMsg } from '../js/fetch'
import '../styles/sass/main.scss'

function ButtonDelete (props) {
    const msg_id = props.msg_id;

    function sendDelete(even, msg_id) {
        even.preventDefault();

        const document = {
            message_id: msg_id,
        };

        const options = {
            method: "DELETE",
            body: JSON.stringify(document),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };
        deleteMsg(options);
    }

    return (
        <div>
            <button type="button" onClick={(e) => sendDelete(e, msg_id)}>Supprimer</button> 
        </div>
    )
};

export default ButtonDelete