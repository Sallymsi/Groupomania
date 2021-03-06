import React from 'react'
import icon from '../assets/icon.png'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons'
import '../styles/sass/main.scss'
import { addMessage } from '../js/fetch'
import Discussion from '../components/Discussion'

function Forum() {
    const urlGet = 'http://localhost:4000/api/post/get/';
    const userId = sessionStorage.getItem("userId");
    const [inputValue, setInputValue] = useState('');
    const [fileInputValue, setFileInputValue] = useState(null);
    const [message, setMessage] = useState([]);
    

    const handleClick = (e) => {

        const form = new FormData();
        form.set('userId', userId);
        form.set('message', inputValue);
        
        if (fileInputValue !== null) {
            form.set('file', fileInputValue);
        }
        e.preventDefault();

        const options = {
            method: "POST",
            body: form,
            headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}
        };

        if(inputValue !== '') {
            addMessage(options).then(() => getMessage(optionsGetMessage));
        };
    };

    useEffect(() => {
        getMessage(optionsGetMessage)
    }, []);

    const optionsGetMessage = {
        method: "GET",
        headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}
    };

    // Création de la requête GET de récupération des messages :
    async function getMessage(optionsGetMessage) {
        fetch(urlGet, optionsGetMessage)
            .then(resp => resp.json())

            .then((data) => {
                    setMessage(data);
            })
            .catch(error => {
                sessionStorage.clear();
                window.location.href = `/register`;
            })
    };

    return (
        <div className='boxMessage'>
            <article className='message'>
                <div className='note'>
                    <img className='logo' src={icon} alt='logo'></img>
                    <input type='text' name="message"className='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} required/>
                    <label for="file" class="label-file"><FontAwesomeIcon icon={faImage} /></label>
                    <input type='file' id='file' name="file" className='file' onChange={(e) => setFileInputValue(e.target.files[0])} />
                    <button type='submit' className='submit' onClick={handleClick}><FontAwesomeIcon icon={faPaperPlane}/></button>
                </div>
            </article>
            <Discussion message = {message} getMessage = {getMessage} optionsGetMessage = {optionsGetMessage}/>
        </div>
    )
};

export default Forum

