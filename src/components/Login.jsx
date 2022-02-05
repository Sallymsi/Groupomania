import React from 'react';
import { useState } from 'react'
import { login } from '../js/fetch'
import '../styles/sass/main.scss'

function Form() {
    const [emailInputValue, setEmailInputValue] = useState('')
    const [passwordInputValue, setPasswordInputValue] = useState('')

    const document = {
        email: emailInputValue,
        password: passwordInputValue
    };

    const options = {
        method: "POST",
        body: JSON.stringify(document),
        headers: {"Content-type": "application/json"},
    };


    return (
        <aside>
            <div className='textForm'>
                <h1>Connectez-vous !</h1>
            </div>
            <div className='blockForm'>
                <h1>Toujours pas inscrit ?</h1>
                <p>Faîtes le en quelques clics</p>
                <form method="post" className='form'>
                    <div className='inputDiv'>
                        <label for="email">Email: </label><br></br>
                        <input type="text" name="email" id="email" value={emailInputValue} onChange={(e) => setEmailInputValue(e.target.value)} required/>
                    </div>
                    <div className='inputDiv'>
                        <label for="password">Password: </label><br></br>
                        <input type="password" name="password" id="password" value={passwordInputValue} onChange={(e) => setPasswordInputValue(e.target.value)} required/>
                    </div>
                    <div className='button'>
                        <input type="submit" value="Se connecter !" id="register" onClick={(e) => {
                            login(options);
                            e.preventDefault();
                            }}>
                        </input>
                    </div>  
                </form>
            </div>
        </aside>
    )
}

export default Form