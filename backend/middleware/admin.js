// Middleware de verification Admin :
module.exports = (req, res, next) => {
    try {
        let userId = sessionStorage.getItem("userId");
        let sql = "SELECT acces FROM utilisateur WHERE id = ?";

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
                res.status(201).json({ Admin: result })
            }); 
        })
        if (result !== 1) {
            throw 'Accès Admin non valide !';
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | 'Requête non authantifiée !' });
    }
};