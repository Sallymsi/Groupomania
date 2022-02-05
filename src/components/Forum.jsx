import React from 'react'
import icon from '../assets/icon.png'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import '../styles/sass/main.scss'
import { post } from '../js/fetch'
import Discussion from '../components/Discussion'

function Forum() {
    const [inputValue, setInputValue] = useState('')

    const document = {
        userId: sessionStorage.getItem("userId"),
        message: inputValue
    };

    const options = {
        method: "POST",
        body: JSON.stringify(document),
        headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
    };

    return (
        <div className='boxMessage'>
            <article className='message'>
                <div className='note'>
                    <img className='logo' src={icon} alt='logo'></img>
                    <input type='text' className='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} required/>
                    <button type='submit' className='submit' onClick={(e) => {
                        post(options);
                        e.preventDefault();
                        }}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            </article>
            <Discussion />
        </div>
    )
};

export default Forum

