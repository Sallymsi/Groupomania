import React from 'react'
import icon from '../assets/icon.png'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import '../styles/sass/main.scss'
import { addMessage } from '../js/fetch'
import Discussion from '../components/Discussion'

function Forum() {
    const [inputValue, setInputValue] = useState('')
    const urlGet = 'http://localhost:4000/api/post/get/'
    const [message, setMessage] = useState([])

    function sendPost(even) {
        even.preventDefault();

        const document = {
            userId: sessionStorage.getItem("userId"),
            message: inputValue
        };

        const options = {
            method: "POST",
            body: JSON.stringify(document),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        };

        addMessage(options).then(() => getMessage())
    }


    useEffect(() => {
        getMessage()
    }, [])

    // Création de la requête GET de récupération des messages :
    async function getMessage() {
        fetch(urlGet)
            .then(resp => resp.json())

            .then((data) => {
                setMessage(data)
            })
    };

    return (
        <div className='boxMessage'>
            <article className='message'>
                <div className='note'>
                    <img className='logo' src={icon} alt='logo'></img>
                    <input type='text' className='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} required/>
                    <button type='submit' className='submit' onClick={(e) => sendPost(e)}><FontAwesomeIcon icon={faPaperPlane}/></button>
                </div>
            </article>
            <Discussion message = {message}/>
        </div>
    )
};

export default Forum

