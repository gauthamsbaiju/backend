import logger from "../logs/logger";
import RolesService from "../service/roles.service";
import DataFormat from "../utils/dataFromat";
import { RequestWithID } from "../utils/reqWithId";
import { Role } from "../utils/role.enum";
import express, { NextFunction } from "express";

class RolesController{
    public roles: string[] = [];
    public router: express.Router;
    static router: any;
    constructor(private rolesService: RolesService){
        this.router = express.Router();
        this.router.get('/', this.getAllRoles);
    }

    getAllRoles = async(req: RequestWithID, res: express.Response)=> {
        // for(const role in Role){
        //     this.roles.push(role);
        // }
        this.roles = this.rolesService.getAllRoles();
        //const roles
        const resData = new DataFormat(this.roles, null, "OK")
        logger.info(req.id.toString(), {message:`Roles retrieved`});
        res.status(200).send(resData);
    }

}
export default RolesController;