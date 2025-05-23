const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Token Not Found" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired" });
        }

        return res.status(401).json({ message: "Token not valid" });
    }
};
