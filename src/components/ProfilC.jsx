import React from 'react';
import '../styles/sass/main.scss'
import { useState, useEffect } from 'react'
import { updateProfil, getImgById, deleteUser } from "../js/fetch"

function Profil() {
    const [imageInputValue, setImageInputValue] = useState(null);
    const [imageValue, setImageValue] = useState('')
    const [passwordInputValue, setPasswordInputValue] = useState('')
    const [repeatPasswordInputValue, setRepeatPasswordInputValue] = useState('')
    const userId = sessionStorage.getItem("userId");

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
            body: form,
            headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}
        }

        if (passwordInputValue === repeatPasswordInputValue) {
            updateProfil(options);
        } else {
            alert('Les mots de passe ne sont pas identiques !')
        };
    };

    const deleteAccount = (e) => {
        e.preventDefault();

        const document = {
            userId: userId,
            image: imageValue
        };

        const options = {
            method: 'DELETE',
            body: JSON.stringify(document),
            headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")},
        }

        deleteUser(options);
    };

    return (
        <div className='profilAccount'>
            <form className='containProfil' method='post'>
                <div className='containImg'>
                    <div className='changeImg'>
                        <img alt='profil' src={imageValue}></img>
                    </div>
                    <div className='inputDiv'>
                        <label for="image"><h2>Une envie de changer de photo de profil  ? </h2></label><br></br>
                        <input type="file" name="image" id="image" onChange={(e) => setImageInputValue(e.target.files[0])} required/>
                    </div>
                </div>
                <h2>Pour plus de sécurité, changez de mot de passe régulièrement : </h2>
                <div className='inputDiv'>
                    <label for="password"><p>Veuillez taper votre mot de passe :  </p></label><br></br>
                    <input type="password" name="password" id="password" aria-required="true" value={passwordInputValue} onChange={(e) => setPasswordInputValue(e.target.value)} required/>
                </div>
                <div className='inputDiv'>
                    <label for="repeatPassword"><p>Veuillez retaper votre mot de passe :  </p></label><br></br>
                    <input type="password" name="repeatPassword" id="repeatPassword" aria-required="true" value={repeatPasswordInputValue} onChange={(e) => setRepeatPasswordInputValue(e.target.value)} required/>
                </div>
                <div className='button'>
                    <input type="submit" value="Envoyer !" id="register" onClick={handleClick}></input>
                </div>
            </form>
            <aside>
                <label><h2>Souhaitez-vous supprimer votre compte définitivement ? </h2></label>
                <button type="button" onClick={deleteAccount}>Supprimer</button>
            </aside>
        </div>
    )
    
}

export default Profil