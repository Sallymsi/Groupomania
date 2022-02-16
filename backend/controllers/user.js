const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');


// Enregistre un nouvel utilisateur dans la base de donnée :
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let nom = req.body.nom;
            let prenom = req.body.prenom;
            let email = req.body.email;
            let password = hash;
            let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            let sql = "INSERT INTO utilisateur (nom, prenom, email, password, image) VALUES (?, ?, ?, ?, ?)";

            const db = mysql.createConnection({
                database: "groupomania",
                host: "localhost",
                user: "root",
                password: "peluche",
            })

            db.connect(function(err) {
                if (err) throw err;
                console.log("Connecté à la base de données MySQL!");
                db.query(sql, [nom, prenom, email, password, image], function (err, result) {
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
            if (!result[0]) {
                return res.status(401).json({ error: "utilisateur introuvable" })
            };
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    console.table(result)
                    res.status(200).json({
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


// Récupère la photo de profil de l'utilisateur :
exports.getImgById = (req, res, next) => {
    let userId = req.params.userId;
    let sql = "SELECT `image` FROM `utilisateur` WHERE `id` = ?";
    console.log(userId);

    const db = mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })

    db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
        db.query(sql, [userId], function (err, result) {
            if (err) throw err;
            console.log(result)
            res.status(201).json({
                image: result[0].image
            });
        }); 
    })
};


// Update l'image & password :
exports.changeInfo = (req, res, next) => {
    let imageB = req.body.imageB;
    let filename = imageB.split('/images/')[1];

    fs.unlink(`images/${filename}`, ((err) => {
        if (err) throw err;
        else {
            console.log("Image supprimée !")
        }
    }))
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log(req.body);
            let password = hash;
            let id = req.body.id;
            let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            let sql = "UPDATE utilisateur SET password = ?, image = ? WHERE id = ?";
            
            const db = mysql.createConnection({
                database: "groupomania",
                host: "localhost",
                user: "root",
                password: "peluche",
            })

            db.connect(function(err) {
                if (err) throw err;
                console.log("Connecté à la base de données MySQL!");
                db.query(sql, [password, image, id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: 'Utilisateur mis à jour !' })
                }); 
            })
        })
        .catch(error => res.status(500).json({ message: error }));
};

