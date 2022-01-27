const url = 'http://localhost:4000/api/auth/signup/';
const urlLogin = 'http://localhost:4000/api/auth/login/';
const urlPost = 'http://localhost:4000/api/post/post/';
// const urlGet = 'http://localhost:4000/api/post/get/';
const urlGetUserId = 'http://localhost:4000/api/auth/getUserId/'

// Création de la requête POST pour la connexion :
export function login(options) {
    fetch(urlLogin, options)
        .then(resp => resp.json())

        .then((data) => {
            console.table(data);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("prenom", data.prenom);
            sessionStorage.setItem("nom", data.nom);
            window.location.href = `/homepage`;
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


// Création de la requête POST pour les posts :
export function post(options) {
    fetch(urlPost, options)
        .then(resp => resp.json())

        .then((data) => {
            console.table(data)
        })
};


// Création de la requête GET de récupération de l'userId :
export function getUserId() {
    fetch(urlGetUserId)
        .then(resp => resp.json())
};

