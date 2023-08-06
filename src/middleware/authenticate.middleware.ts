import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtHeader, JwtPayload } from "jsonwebtoken";
import { RequestWithUser } from "../utils/requestWithUser";
import { jwtPayload } from "../utils/jwtPayload.type";
import logger from "../logs/logger";

const authenticate = async (req: RequestWithUser, res: Response, next: NextFunction)=>{
    try{

        const token = getTokenFromRequestHeader(req);
        const payload: jwtPayload = jsonwebtoken.verify(token, process.env.JWT_SECRET) as jwtPayload;
        req.name = payload.name;
        req.role = payload.role;
        next();
    }catch(error){
        logger.warn("Invalid Token");
        next(error);
    }
}

const getTokenFromRequestHeader = (req: Request) =>{
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", ""): "";
    return token;
}

export default authenticate;