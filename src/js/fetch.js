const url = 'http://localhost:4000/api/auth/signup/';
const urlLogin = 'http://localhost:4000/api/auth/login/';
const urlGetImg = 'http://localhost:4000/api/auth/getImgById/';
const urlChange = 'http://localhost:4000/api/auth/changeInfo/';
const urlDeleteUser = 'http://localhost:4000/api/auth/deleteUser/';
const urlGetAdmin = 'http://localhost:4000/api/auth/getAdmin/';

const urlPost = 'http://localhost:4000/api/post/post/';
const urlDelete = 'http://localhost:4000/api/post/delete/';
const urlUpdate = 'http://localhost:4000/api/post/update/';
const urlResponse = 'http://localhost:4000/api/post/response/';
const urlDeleteAnswer = 'http://localhost:4000/api/post/deleteAnswer/';
const urlUpdateAnswer = 'http://localhost:4000/api/post/updateAnswer/';
const urlGetLike = 'http://localhost:4000/api/post/getLike/';
const urlGetLikeAnswer = 'http://localhost:4000/api/post/getLikeAnswer/';
const urlGetLikeUser = 'http://localhost:4000/api/post/getLikeUser/';
const urlGetLikeUserAnswer = 'http://localhost:4000/api/post/getLikeUserAnswer/';
const urlGetLikeUp = 'http://localhost:4000/api/post/likeUp/';
const urlGetLikeUpAnswer = 'http://localhost:4000/api/post/likeUpAnswer/';
const urlGetLikeDown = 'http://localhost:4000/api/post/likeDown/';
const urlGetLikeDownAnswer = 'http://localhost:4000/api/post/likeDownAnswer/';

// Création de la requête POST pour la connexion :
export function login(options) {
    fetch(urlLogin, options)
        .then(resp => resp.json())

        .then((data) => {
            console.table(data);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userId", data.userId);
            if (data.token) {
                window.location.href = `/homepage`;
            }
        })
};

// Création de la requête POST pour l'inscription :
export function signin(options) {
    fetch(url, options)
        .then(resp => resp.json())
  
        .then((data) => {
            console.table(data);
            window.location.href = `/register`;
        })
};


// Création de la requête POST pour les posts (message): 
export async function addMessage(options) {
    return fetch(urlPost, options)
        .then(resp => resp.json())

        .then((data) => {
            console.table(data)
        })
};

// Création de la requête POST pour les posts (reponse):
export async function sendAnswer(options) {
    return fetch(urlResponse, options)
        .then(resp => resp.json())

        .then((data) => {
            console.table(data)
        })
};

// Création de la requête GET de récupération d'image de profil :
export async function getImgById(userId) {
    return fetch(urlGetImg + userId)
        .then(resp => resp.json())

        .then((data) => {
            return data.image
        })
};

// Création de la requête POST de changement d'image & Password : 
export function updateProfil(options) {
    fetch(urlChange, options)
        .then(resp => resp.json())

        .then((data) => {
            console.table(data)
        })
};

// Création de la requête DELETE afin de supprimer un post de la BDD :
export async function deleteMsg(options) {
    return fetch(urlDelete, options)
        .then(resp => resp.json())
};

// Création de la requête PUT afin de modifier un message :
export async function updateMsg(options) {
    return fetch(urlUpdate, options)
        .then(resp => resp.json())
};

// Création de la requête DELETE afin de supprimer un utilisateur :
export async function deleteUser(options) {
    fetch(urlDeleteUser, options)
        .then(resp => resp.json())

        .then((data) => {
            console.log(data);
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("token");
            window.location.href = `/`;
        })
};

// Création de la requête DELETE afin de supprimer une réponse :
export async function deleteAnswer(options) {
    return fetch(urlDeleteAnswer, options)
        .then(resp => resp.json())
};

// Création de la requête PUT afin de modifier un message :
export async function updateAnswer(options) {
    return fetch(urlUpdateAnswer, options)
        .then(resp => resp.json())
};

// Création de la requête GET afin de récuperer les droits d'admin :
export async function getAdmin(options) {
    return fetch(urlGetAdmin, options)
        .then(resp => resp.json())

        .then((data) => {
            return data.acces;
        })
};

// Création de la requête GET afin de récupérer les likes des posts :
export async function getLike(options) {
    return fetch(urlGetLike, options)
        .then(resp => resp.json())

        .then((data) => {
            return data;
        })
};

// Création de la requête GET afin de récupérer les likes des reponses :
export async function getLikeAnswer(options) {
    return fetch(urlGetLikeAnswer, options)
        .then(resp => resp.json())

        .then((data) => {
            return data;
        })
};

// Création de la requête GET afin de récupérer les likes des posts :
export async function getLikeUser(options) {
    return fetch(urlGetLikeUser, options)
        .then(resp => resp.json())

        .then((data) => {
            return data;
        })
};

// Création de la requête GET afin de récupérer les likes des reponses :
export async function getLikeUserAnswer(options) {
    return fetch(urlGetLikeUserAnswer, options)
        .then(resp => resp.json())

        .then((data) => {
            return data;
        })
};

// Création de la requête POST afin d'ajouter un likes sur un post :
export async function getLikeUp(options) {
    return fetch(urlGetLikeUp, options)
        .then(resp => resp.json())

};

// Création de la requête POST afin d'ajouter un likes sur un reponses :
export async function getLikeUpAnswer(options) {
    return fetch(urlGetLikeUpAnswer, options)
        .then(resp => resp.json())

};

// Création de la requête POST afin d'ajouter un likes sur un post :
export async function getLikeDown(options) {
    return fetch(urlGetLikeDown, options)
        .then(resp => resp.json())
};

// Création de la requête POST afin d'ajouter un likes sur un reponses :
export async function getLikeDownAnswer(options) {
    return fetch(urlGetLikeDownAnswer, options)
        .then(resp => resp.json())
};