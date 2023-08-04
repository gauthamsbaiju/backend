import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' })
import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express";
import employeeRouter from "./route/employee.route";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import HttpException from "./exception/http.exception";
import errorMiddleware from "./middleware/error.middleware";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees', employeeRouter)

server.get('/*', (req,res)=>{
    const data = req.body;
    console.log(req.url);
    console.log(data);
    res.status(200).send("Hello world typescript");
});

server.use(errorMiddleware);

(async ()=> {
    await dataSource.initialize();
    server.listen(3000, ()=>{
        console.log("Server is listening to port 3000");
    });
})();


