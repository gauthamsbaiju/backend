import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";
import Role from "../utils/role.enum";
import { RequestWithUser } from "../utils/requestWithUser";

const authorize = async(req: RequestWithUser, res: Response, next: NextFunction)=>{

    try{
        const role = req.role;
        if(role !== Role.HR){
            throw new HttpException(403, "You are not authorized to perfome this action");
        }
        next();
    }catch(error){
        next(error);
    }
}
export default authorize;