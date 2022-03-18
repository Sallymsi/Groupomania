const mysql = require('mysql');
const fs = require('fs');
const dbCon = require("../others/ConDB");

// Enregistre un nouveau Post du forum :
exports.post = (req, res, next) => {
    let message = req.body.message;
    let utilisateur_id = req.body.userId;

    const db = dbCon();

    if (req.file) {
        let file = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
        let sql = "INSERT INTO message (message, utilisateur_id, file) VALUES (?, ?, ?)";

        db.connect(function(err) {
            if (err) throw err;
            db.query(sql, [message, utilisateur_id, file], function (err, result) {
                if (err) throw err;
                res.status(201).json({ message: "message ajouté à la BDD !" });
            }); 
        })
    } else if (!req.file) {
        let sql = "INSERT INTO message (message, utilisateur_id) VALUES (?, ?)";
    
        db.connect(function(err) {
            if (err) throw err;
            db.query(sql, [message, utilisateur_id], function (err, result) {
                if (err) throw err;
                res.status(201).json({ message: "message ajouté à la BDD !" });
            }); 
        })
    };
};

// Enrgistre une nouvelle réponse du forum :
exports.reponse = (req, res, next) => {
    let message = req.body.message;
    let utilisateur_id = req.body.userId;
    let message_id = req.body.message_id
    let sql = "INSERT INTO reponse (message, utilisateur_id, message_id) VALUES (?, ?, ?)";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [message, utilisateur_id, message_id], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "reponse ajouté à la BDD !" });
        }); 
    })
};

// Récupère tous les Posts :
exports.get = (req, res, next) => {
    let sql = "SELECT nom, prenom, message, image, message.id, message.utilisateur_id, message.file FROM message JOIN utilisateur ON utilisateur.id = message.utilisateur_id";

    const db = mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        }); 
    })
};

// Récupère toutes les réponses :
exports.getAnswers = (req, res, next) => {
    let sql = "SELECT nom, prenom, message, image, message_id, reponse.utilisateur_id, reponse.id FROM reponse JOIN utilisateur ON utilisateur.id = reponse.utilisateur_id";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        }); 
    })
};

// Supprime un post :
exports.deleteMsg = (req, res, next) => {
    let message_id = req.body.message_id;
    let sql1 = "DELETE FROM message WHERE id= ?";
    let sql2 = "DELETE FROM reponse WHERE message_id= ?";
    let sql3 = "DELETE FROM message_like WHERE messageId = ?";

    const db = dbCon();

    if (req.body.message.file) {
        let file = req.body.message.file;
        let filename = file.split('/files/')[1];
        
        fs.unlink(`files/${filename}`, ((err) => {
            if (err) throw err;
            else {
                console.log("Image supprimée !")
            }
        }))

        db.connect(function(err) {
            if (err) throw err;
            db.query(sql1, [message_id], function (err, result) {
                if (err) throw err;
            }); 
    
            db.query(sql2, [message_id], function (err, result) {
                if (err) throw err;
            });

            db.query(sql3, [message_id], function (err, result) {
                if (err) throw err;
                res.status(201).json({ message: "Message supprimé à la BDD !" });
            });  
        })  
    } else {

        db.connect(function(err) {
            if (err) throw err;
            db.query(sql1, [message_id], function (err, result) {
                if (err) throw err;
            }); 
    
            db.query(sql2, [message_id], function (err, result) {
                if (err) throw err;
            }); 

            db.query(sql3, [message_id], function (err, result) {
                if (err) throw err;
                res.status(201).json({ message: "Message supprimé à la BDD !" });
            }); 
        })      
    };
};

// Mets à jour un Post :
exports.updateMsg = (req, res, next) => {
    let message_id = req.body.message_id;
    let message = req.body.message;
    let sql = "UPDATE message SET message = ? WHERE id= ?";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [ message, message_id] , function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "Modifié !"});
        }); 
    })
};

// Supprime une réponse :
exports.deleteAnswer = (req, res, next) => {
    let answerId = req.body.answerId;
    let sql = "DELETE FROM reponse WHERE id = ?";
    let sql2 = "DELETE FROM reponse_like WHERE reponseId = ?";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [ answerId ], function (err, result) {
            if (err) throw err;
        }); 
        db.query(sql2, [ answerId ], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "Réponse Supprimée !"});
        }); 
    })
};

// Mets à jour une réponse :
exports.updateAnswer = (req, res, next) => {
    let answerId = req.body.answerId;
    let message = req.body.message;
    let sql = "UPDATE reponse SET message = ? WHERE id = ?";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [ message, answerId ] , function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "Modifié !"});
        }); 
    })
};

// Récupère les likes des Post :
exports.getLike = (req, res, next) => {
    let messageId = req.headers.authorization.split(' ')[2]; 
    let sql = "SELECT * FROM message JOIN message_like ON message.id = message_like.messageId WHERE message.id = ?" ;

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [messageId], function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        }); 
    })
};

// Récupère les like d'une réponse :
exports.getLikeAnswer = (req, res, next) => {
    let reponseId = req.headers.authorization.split(' ')[2]; 
    let sql = "SELECT * FROM reponse JOIN reponse_like ON reponse.id = reponse_like.reponseId WHERE reponse.id = ?" ;

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [reponseId], function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        }); 
    })
};

// Ajoute un like à un Post :
exports.likeUp = (req, res, next) => {
    let messageId = req.body.messageId;
    let userId = req.body.userId;
    let sql = "INSERT INTO message_like (messageId, userId) VALUES (?, ?)";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [messageId, userId] , function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "Like ajouté au post !" });
        }); 
    })
};

// Ajoute un like à une réponse :
exports.likeUpAnswer = (req, res, next) => {
    let reponseId = req.body.messageId;
    let userId = req.body.userId;
    let sql = "INSERT INTO reponse_like (reponseId, userId) VALUES (?, ?)";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [reponseId, userId] , function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "Like ajouté au post !" });
        }); 
    })
};

// Supprime un like d'un Post :
exports.likeDown = (req, res, next) => {
    let messageId = req.body.messageId;
    let userId = req.body.userId;
    let sql = "DELETE FROM message_like WHERE messageId = ? AND userId = ?";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [messageId, userId] , function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "Like ajouté au post !" });
        }); 
    })
};

// Supprime un like d'une reponse :
exports.likeDownAnswer = (req, res, next) => {
    let reponseId = req.body.messageId;
    let userId = req.body.userId;
    let sql = "DELETE FROM reponse_like WHERE reponseId = ? AND userId = ?";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [reponseId, userId] , function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "Like ajouté au post !" });
        }); 
    })
};

// vérifie si l'utilisateur à liker un Post :
exports.getLikeUser = (req, res, next) => {
    let messageId = req.headers.authorization.split(' ')[2]; 
    let userId = req.headers.authorization.split(' ')[3];
    let sql = "SELECT * FROM message_like WHERE messageId = ? AND userId = ?";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [messageId, userId] , function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        }); 
    })
};

// vérifie si l'utilisateur à liker une réponse :
exports.getLikeUserAnswer = (req, res, next) => {
    let reponseId = req.headers.authorization.split(' ')[2]; 
    let userId = req.headers.authorization.split(' ')[3];
    let sql = "SELECT * FROM reponse_like WHERE reponseId = ? AND userId = ?";

    const db = dbCon();

    db.connect(function(err) {
        if (err) throw err;
        db.query(sql, [reponseId, userId] , function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        }); 
    })
};