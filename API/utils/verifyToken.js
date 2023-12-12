import Jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "Authentication token not provided."));
    }
    Jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(401, "Token is not valid.", err));
        }
        req.user = user;
        next();
    });
};


export const verifyuser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err); // Pass the error to the error handling middleware
        }

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            // You don't need to check for 'err' here, and you should call next with the error
            return next(createError(403, "You are not authorized."));
        }
    });
};

export const verifAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(err); // Pass the error to the error handling middleware
        }

        if (req.user.isAdmin) {
            next();
        } else {
            // You don't need to check for 'err' here, and you should call next with the error
            return next(createError(403, "You are not authorized."));
        }
    });
};
