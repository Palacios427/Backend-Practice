import jwt from "jsonwebtoken";
import { Router } from "express";

export const validateJWT = Router();

validateJWT.use((req, res) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ msg: "se requiere de un token." });
        return;
    }

    if (token.startsWith("Bearer")) {
        token = token.split(" ")[1];
    }

    jwt.verify(token, process.env.JWT, (error, decoded) => {
        console.log(decoded.foo)
        if (error) {
            res.status(401).json({ msg: "error en la verificacion del token" + error.message });
        } else {
            req.decoded = decoded;
            next();
        }
    });
});