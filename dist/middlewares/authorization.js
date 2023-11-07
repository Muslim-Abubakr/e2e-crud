"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const authorizationMiddleware = (req, res, next) => {
    let auth = req.headers.authorization;
    if (auth === 'Basic YWRtaW46cXdlcnR5') {
        next();
    }
    else if (!auth) {
        res.send(401);
    }
    else {
        res.send(401);
    }
};
exports.authorizationMiddleware = authorizationMiddleware;
