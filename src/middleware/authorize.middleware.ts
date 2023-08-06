import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";
import {AdminRole} from "../utils/role.enum";
import { RequestWithUser } from "../utils/requestWithUser";
import logger from "../logs/logger";

const authorize = async(req: RequestWithUser, res: Response, next: NextFunction)=>{

    try{
        const role = req.role;
        if(role in AdminRole){
            next();
        }
        else{
            throw new HttpException(403, "You are not authorized to perfome this action");
        }
        //next();
    }catch(error){
        logger.error("Unauthorized accees");
        next(error);
    }
}
export default authorize;