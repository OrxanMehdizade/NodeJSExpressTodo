const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function authenticateRefreshToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        
        try {
            const currentUser = await User.findById(user.id);
            if (!currentUser) {
                return res.sendStatus(403);
            }

            res.locals.user = currentUser;
            next();
        } catch (error) {
            console.error(error);
            res.sendStatus(500); 
        }
    });
}

module.exports = authenticateRefreshToken;
