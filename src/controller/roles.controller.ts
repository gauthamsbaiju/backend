import DataFormat from "../utils/dataFromat";
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

    getRoles = async(req: express.Request, res: express.Response)=> {
        for(const role in Role){
            this.roles.push(role);
        }
        const resData = new DataFormat(this.roles, null, "OK")
        res.status(200).send(resData);
    }

}
export default RolesController;