import icon from '../assets/icon.png'
import { useState, useEffect } from 'react'
import '../styles/sass/main.scss'
import { post } from '../js/fetch'


function Forum() {
    const urlGet = 'http://localhost:4000/api/post/get/';
    const [inputValue, setInputValue] = useState('')
    const [message, setMessage] = useState([])


    useEffect(() => {
        getMessage()
    }, [])

    useEffect(() => {
        console.log(message)
    }, [message])

    // Création de la requête GET de récupération des messages :
    async function getMessage() {
        fetch(urlGet)
            .then(resp => resp.json())

            .then((data) => {
                setMessage(data)
            })
    };

    const document = {
        prenom: sessionStorage.getItem("prenom"),
        nom: sessionStorage.getItem("nom"),
        userId: sessionStorage.getItem("userId"),
        email: sessionStorage.getItem("email"),
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
                    <input type='submit' className='submit' onClick={(e) => {
                        post(options);
                        e.preventDefault();
                        }}>
                    </input>
                </div>
            </article>
            <article className='conversation' id='conversation'>
                {
                    message.map((msg) => (
                        <div key={msg.id}>
                            <h2>{msg.utilisateur_id}</h2>
                            <p>{msg.message}</p>
                        </div>
                    ))
                }
            </article>
        </div>
    )

};

export default Forum

