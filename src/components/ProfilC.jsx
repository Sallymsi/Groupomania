import React from 'react';
import '../styles/sass/main.scss'
import { useState, useEffect } from 'react'
import { change, getImgById } from "../js/fetch"

function ProfilC() {
    const [imageInputValue, setImageInputValue] = useState(null);
    const [imageValue, setImageValue] = useState('')
    const [passwordInputValue, setPasswordInputValue] = useState('')
    const [repeatPasswordInputValue, setRepeatPasswordInputValue] = useState('')
    let userId = sessionStorage.getItem("userId");

    useEffect(() => {
        getImgById(userId).then((img) => setImageValue(img))
    }, [])

    const handleClick = (e) => {
        const form = new FormData();
        form.set('password', passwordInputValue);
        form.set('image', imageInputValue);
        form.set('imageB', imageValue);
        form.set('id', userId);
        e.preventDefault();

        const options = {
            method: "POST",
            body: form
        }

        if (passwordInputValue === repeatPasswordInputValue) {
            change(options);
        } else {
            alert('Les mots de passe ne sont pas identiques !')
        };
        
    }

    return (
        <div className='profilAccount'>
            <form className='containProfil' method='post'>
                <div className='containImg'>
                    <div className='changeImg'>
                        <img alt='profil' src={imageValue}></img>
                    </div>
                    <div className='inputDiv'>
                        <label for="image">Une envie de changer de photo de profil ? : </label><br></br>
                        <input type="file" name="image" id="image" onChange={(e) => setImageInputValue(e.target.files[0])} required/>
                    </div>
                </div>
                <div className='inputDiv'>
                    <label for="password">Vous voulez changer de mot de passe ?  </label><br></br>
                    <input type="password" name="password" id="password" value={passwordInputValue} onChange={(e) => setPasswordInputValue(e.target.value)} required/>
                </div>
                <div className='inputDiv'>
                    <label for="repeatPassword">Veuillez retaper votre mot de passe :  </label><br></br>
                    <input type="password" name="repeatPassword" id="repeatPassword" value={repeatPasswordInputValue} onChange={(e) => setRepeatPasswordInputValue(e.target.value)} required/>
                </div>
                <div className='button'>
                    <input type="submit" value="Envoyer !" id="register" onClick={handleClick}></input>
                </div>
            </form>
        </div>
    )
    
}

export default ProfilC