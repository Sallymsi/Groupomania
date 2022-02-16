const mysql = require('mysql');

exports.post = (req, res, next) => {
    let message = req.body.message;
    let utilisateur_id = req.body.userId;
    let sql = "INSERT INTO message (message, utilisateur_id) VALUES (?, ?)";

    const db = mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })

    db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
        db.query(sql, [message, utilisateur_id], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "message ajouté à la BDD !" });
        }); 
    })
};

exports.reponse = (req, res, next) => {
    let message = req.body.message;
    let utilisateur_id = req.body.userId;
    let message_id = req.body.message_id
    let sql = "INSERT INTO reponse (message, utilisateur_id, message_id) VALUES (?, ?, ?)";

    const db = mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })

    db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
        db.query(sql, [message, utilisateur_id, message_id], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: "reponse ajouté à la BDD !" });
        }); 
    })
};

exports.get = (req, res, next) => {
    let sql = "SELECT nom, prenom, message, image, message.id FROM message JOIN utilisateur ON utilisateur.id = message.utilisateur_id";

    const db = mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })

    db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        }); 
    })
};

exports.getAnswers = (req, res, next) => {
    let sql = "SELECT nom, prenom, message, image, message_id FROM reponse JOIN utilisateur ON utilisateur.id = reponse.utilisateur_id";

    const db = mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })

    db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.status(201).json(result);
        }); 
    })
};

exports.deleteMsg = (req, res, next) => {
    let message_id = req.body.message_id;
    let sql1 = "DELETE FROM message WHERE id= ?";
    let sql2 = "DELETE FROM reponse WHERE message_id= ?";

    const db = mysql.createConnection({
        database: "groupomania",
        host: "localhost",
        user: "root",
        password: "peluche",
    })

    db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
        db.query(sql1, [message_id], function (err, result) {
            if (err) throw err;
        }); 

        db.query(sql2, [message_id], function (err, result) {
            if (err) throw err;
        res.status(201).json({ message: "All supprimé à la BDD !" });
        }); 
    })
};