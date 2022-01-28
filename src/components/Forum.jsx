import icon from '../assets/icon.png'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import '../styles/sass/main.scss'
import { post } from '../js/fetch'

function Forum() {
    const urlGet = 'http://localhost:4000/api/post/get/';
    const [inputValue, setInputValue] = useState('')
    const [message, setMessage] = useState([])

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
            <article className='conversation'>
                {message.map((msg, index) => (
                    <div key={`${msg}-${index}`} className="containMsg">
                        <h2>{msg.prenom} {msg.nom}</h2>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </article>
        </div>
    )

};

export default Forum

