const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Enregistre un nouvel utilisateur dans la base de donnée :
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            var nom = req.body.nom;
            var prenom = req.body.prenom;
            var email = req.body.email;
            var password = hash;
            let sql = "INSERT INTO utilisateur (nom, prenom, email, password) VALUES (?, ?, ?, ?)";
        
            const db = mysql.createConnection({
                database: "groupomania",
                host: "localhost",
                user: "root",
                password: "peluche",
            })
        
            db.connect(function(err) {
                if (err) throw err;
                console.log("Connecté à la base de données MySQL!");
                db.query(sql, [nom, prenom, email, password], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: 'Utilisateur créé !' })
                }); 
            })
        })
        .catch(error => res.status(500).json({ message: error }));
};

// Recherche si les identifiants sont correct et accorde un Token valable 24h afin de sécuriser la session de l'utilisateur :
exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sql = "SELECT * FROM  utilisateur WHERE email= ?";

    const db = mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [email], function (err, result) {
            if (err) throw err;
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    console.table(result)
                    res.status(200).json({
                        prenom: result[0].prenom,
                        nom: result[0].nom,
                        email: result[0].email,
                        userId: result[0].id,
                        token: jwt.sign(
                            { userId: result[0].id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        }); 
    })
};

// Récupère l'userId de l'utilisateur :
exports.getUserId = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            res.status(200).json({userId});
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authantifiée !' });
    }
};
