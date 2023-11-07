import { NextFunction, Request, Response } from "express";


export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let auth = req.headers.authorization

    if (auth === 'Basic YWRtaW46cXdlcnR5') {
        next()
    } else if (!auth) {
        res.send(401)
    } else {
        res.send(401)
    }
}