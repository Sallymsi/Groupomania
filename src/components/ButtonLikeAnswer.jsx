import React from 'react'
import '../styles/sass/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as fasFaThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import { useState, useEffect } from 'react'
import { getLikeAnswer, getLikeUpAnswer, getLikeDownAnswer, getLikeUserAnswer } from "../js/fetch"


function ButtonLikeAnswer({msgId}) {
    let [nbrLike, setNbrLike] = useState(0);
    let [isActiveUp, setIsActiveUp] = useState('');
    let [isActiveDown, setIsActiveDown] = useState('');
    let currentUserId = sessionStorage.getItem('userId');

    const document = {
        messageId: msgId,
        userId: currentUserId
    };

    const optionsGetLikeAnswer = {
        method: "GET",
        headers: {"Authorization": "Bearer " + sessionStorage.getItem("token") + ' ' + msgId}
    };

    const optionsGetLikeUpAnswer = {
        method: "POST",
        body: JSON.stringify(document),
        headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")}
    };

    const optionsGetLikeUserAnswer = {
        method: "GET",
        headers: {"Authorization": "Bearer " + sessionStorage.getItem("token") + ' ' + msgId + ' ' + currentUserId}
    };

    useEffect(() => {
        getLikeAnswer(optionsGetLikeAnswer).then((like) => setNbrLike(like.length))
    },[])
    
    useEffect(() => {
        getLikeUserAnswer(optionsGetLikeUserAnswer).then((likeUser) => {
            console.log(msgId);
            console.table(likeUser.length);
            if (likeUser.length > 0) {
                console.log("Like trouvé !")
                setIsActiveUp(true);
                setIsActiveDown(false);
            } else {
                console.log("Aucun Like !")
                setIsActiveUp(false);
                setIsActiveDown(true);
            }
        })
    },[])

    function likeUp() {
        
        if (isActiveUp == false) {
            getLikeUpAnswer(optionsGetLikeUpAnswer).then(() => getLikeAnswer(optionsGetLikeAnswer).then((like) => {
                setNbrLike(like.length);
                setIsActiveUp(true);
                setIsActiveDown(false);
            }));
        } else if (isActiveDown == false) {
            getLikeDownAnswer(optionsGetLikeUpAnswer).then(() => getLikeAnswer(optionsGetLikeAnswer).then((like) => {
                setNbrLike(like.length);
                setIsActiveUp(false);
                setIsActiveDown(true);
            }));
        }
        
    };

    return (
        <button className='btnLike' onClick={() => likeUp()}>
            <FontAwesomeIcon icon={fasFaThumbsUp} className={isActiveUp ? '' : 'active'} />
            <FontAwesomeIcon icon={faThumbsUp} className={isActiveDown ? '' : 'active'} />
            {nbrLike > 0 && (
                <p>{nbrLike}</p>
            )}
        </button>
    )
};

export default ButtonLikeAnswer