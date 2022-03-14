const jwt = require('jsonwebtoken');

// Middleware de verification du Token à l'aide de 'JSONWEBTOKEN' :
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];                      // Extrait le Token de l'entête 
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');              // Vérifie si le token est valide 
        const userId = decodedToken.userId;                                         // Extrait l'userId du token
        req.auth = { userId };
        if (req.body.userId && req.body.userId != userId) {
            throw 'UserId invalide !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authantifiée !' });
    }
};









