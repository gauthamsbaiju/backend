import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";
import express from "express";
import ValidateException from "../exception/validate.exception";
const errorMiddleware = (error: Error, req: express.Request, res: express.Response, next: express.NextFunction)=>{
    if(error instanceof ValidateException ){
        res.status(error.status).send({error: error.errors});
        return;
    }
    else if(error instanceof HttpException){
        res.status(error.status).send({error: error.message});
        return;
    }
    res.status(500).send({error: error.message});
}

export default errorMiddleware;