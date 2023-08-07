import { NextFunction, Request, Response } from "express";
import { v1 as uuidv1 } from 'uuid';
import { RequestWithID } from "../utils/reqWithId";

const addTrace = (req: RequestWithID, res: Response, next: NextFunction)=>{
    var traceId = req.id;
        if(!traceId){
          traceId = uuidv1();
        }
        req.id = traceId;
    next();
}

export default addTrace;