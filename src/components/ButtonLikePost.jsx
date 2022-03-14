import React from 'react'
import '../styles/sass/main.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as fasFaThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons"
import { useState, useEffect } from 'react'
import { getLike, getLikeUp, getLikeDown, getLikeUser } from "../js/fetch"


function ButtonLikePost({msg_id}) {
    let [nbrLike, setNbrLike] = useState(0);
    let [isActiveUp, setIsActiveUp] = useState('');
    let [isActiveDown, setIsActiveDown] = useState('');
    let currentUserId = sessionStorage.getItem('userId');

    const document = {
        messageId: msg_id,
        userId: currentUserId
    };

    const optionsGetLike = {
        method: "GET",
        headers: {"Authorization": "Bearer " + sessionStorage.getItem("token") + ' ' + msg_id}
    };

    const optionsGetLikeUp = {
        method: "POST",
        body: JSON.stringify(document),
        headers: {"Content-type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("token")}
    };

    const optionsGetLikeUser = {
        method: "GET",
        headers: {"Authorization": "Bearer " + sessionStorage.getItem("token") + ' ' + msg_id + ' ' + currentUserId}
    };

    useEffect(() => {
        getLike(optionsGetLike).then((like) => setNbrLike(like.length))
    },[])
    
    useEffect(() => {
        getLikeUser(optionsGetLikeUser).then((likeUser) => {
            if (likeUser.length > 0) {
                setIsActiveUp(true);
                setIsActiveDown(false);
            } else {
                setIsActiveUp(false);
                setIsActiveDown(true);
            }
        })
    },[])

    function likeUp() {
        if (isActiveUp == false) {
            getLikeUp(optionsGetLikeUp).then(() => getLike(optionsGetLike).then((like) => {
                setNbrLike(like.length);
                setIsActiveUp(true);
                setIsActiveDown(false);
            }));
        } else if (isActiveDown == false) {
            getLikeDown(optionsGetLikeUp).then(() => getLike(optionsGetLike).then((like) => {
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

export default ButtonLikePost