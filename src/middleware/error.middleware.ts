import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";
import express from "express";
import ValidateException from "../exception/validate.exception";
import DataFormat from "../utils/dataFromat";
const errorMiddleware = (error: Error | HttpException | ValidateException, req: express.Request, res: express.Response, next: express.NextFunction)=>{
    const resData = new DataFormat([], error, "Error")
    if(error instanceof ValidateException ){
        res.status(error.status).send(resData);
        return;
    }
    else if(error instanceof HttpException){
        res.status(error.status).send(resData);
        return;
    }
        res.status(500).send(resData);
}

export default errorMiddleware;