import { useState } from 'react'
import '../styles/sass/main.scss'
import { signin } from '../js/fetch'

function Form() {
    const [firstInputValue, setFirstInputValue] = useState('')
    const [lastInputValue, setLastInputValue] = useState('')
    const [emailInputValue, setEmailInputValue] = useState('')
    const [passwordInputValue, setPasswordInputValue] = useState('')

    const document = {
        nom: firstInputValue,
        prenom: lastInputValue,
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
                <h1>Venez discuter et décompresser avec vos collègues après le travail !</h1>
            </div>
            <div className='blockForm'>
                <h1>Toujours pas inscrit ?</h1>
                <p>Faîtes le en quelques clics</p>
                <form method="post" className='form'>
                    <div className='inputDiv'>
                        <label for="firstName">Prénom: </label><br></br>
                        <input type="text" name="firstName" id="firstName" value={firstInputValue} onChange={(e) => setFirstInputValue(e.target.value)} required/>
                    </div>
                    <div className='inputDiv'>
                        <label for="lastName">Nom: </label><br></br>
                        <input type="text" name="lasttName" id="lastName" value={lastInputValue} onChange={(e) => setLastInputValue(e.target.value)} required/>
                    </div>
                    <div className='inputDiv'>
                        <label for="email">Email: </label><br></br>
                        <input type="text" name="email" id="email" value={emailInputValue} onChange={(e) => setEmailInputValue(e.target.value)} required/>
                    </div>
                    <div className='inputDiv'>
                        <label for="password">Mot de passe: </label><br></br>
                        <input type="password" name="password" id="password" value={passwordInputValue} onChange={(e) => setPasswordInputValue(e.target.value)} required/>
                    </div>
                    <div className='button'>
                        <input type="submit" value="S'inscrire !" id="register" onClick={(e) => {
                            signin(options);
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

