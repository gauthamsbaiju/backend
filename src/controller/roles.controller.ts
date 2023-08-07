import logger from "../logs/logger";
import DataFormat from "../utils/dataFromat";
import { RequestWithID } from "../utils/reqWithId";
import { Role } from "../utils/role.enum";
import express, { NextFunction } from "express";

class RolesController{
    public roles: string[] = [];
    public router: express.Router;
    static router: any;
    constructor(){
        this.router = express.Router();
        this.router.get('/', this.getRoles);
    }

    getRoles = async(req: RequestWithID, res: express.Response)=> {
        for(const role in Role){
            this.roles.push(role);
        }
        const resData = new DataFormat(this.roles, null, "OK")
        logger.info(req.id.toString(), {message:`Roles retrieved`});
        res.status(200).send(resData);
    }

}
export default RolesController;