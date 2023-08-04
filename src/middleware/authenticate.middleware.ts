import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtHeader, JwtPayload } from "jsonwebtoken";
import { RequestWithUser } from "../utils/requestWithUser";
import { jwtPayload } from "../utils/jwtPayload.type";

const authenticate = async (req: RequestWithUser, res: Response, next: NextFunction)=>{
    try{

        const token = getTokenFromRequestHeader(req);
        const payload: jwtPayload = jsonwebtoken.verify(token, "ABCDE") as jwtPayload;
        req.name = payload.name;
        req.email = payload.email;
        req.role = payload.role;
        next();
    }catch(error){
        next(error);
    }
}

const getTokenFromRequestHeader = (req: Request) =>{
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", ""): "";
    return token;
}

export default authenticate;