import express, { NextFunction } from "express";
import DepartmentService from "../service/department.service";
import { plainToClass, plainToInstance } from "class-transformer";
import CreateDepartmentDto from "../dto/create-department.dto";
import { validate } from "class-validator";
import ValidateException from "../exception/validate.exception";
import UpdateDepartmentDto from "../dto/update-department.dto";
import DataFormat from "../utils/dataFromat";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import logger from "../logs/logger";


class DepartmentController{

    public router: express.Router;

    constructor(private departmentService: DepartmentService){
        this.router = express.Router();

        this.router.get('/',  authenticate, this.getAllDepartments);
        this.router.get('/:id', authenticate, this.getDepartmentById);
        this.router.post('/', authenticate,  authorize, this.createDepartment);
        this.router.put('/:id', authenticate,  authorize, this.updateDepartment);
        this.router.delete('/:id', authenticate,  authorize, this.deleteDepartment);
    }

    getAllDepartments = async(req: express.Request, res: express.Response)=>{
        const departments = await this.departmentService.getAllDepartments();
        logger.info("All departments retrieved");
        const resData = new DataFormat(departments, null, "OK")
        res.status(200).send(resData);
    }
    
    getDepartmentById = async(req: express.Request, res: express.Response, next: NextFunction)=>{
        try{
            const departmentId = Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(departmentId);
            logger.info(`Departments with id ${departmentId}retrieved`);
            const resData = new DataFormat([department], null, "OK")
            res.status(200).send(resData);
        }catch(error){
            logger.warn(`Department not found`);
            next(error);
        }
    }

    createDepartment = async(req: express.Request, res: express.Response, next: NextFunction)=>{

        try{
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if(errors.length>0){
                console.log(errors);
                logger.warn(`Validation error`);
                throw new ValidateException(errors); 
            }
            const department = await this.departmentService.createDepartment(createDepartmentDto);
            logger.info(`Departments created`);
            const resData = new DataFormat([department], null, "OK")
            res.status(200).send(resData);
        }catch(error){
            logger.warn(`Unable to create department`);
            next(error);
        }
    }

    updateDepartment = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
        const departmentId = Number(req.params.id);
        const updateDepartmentDto = plainToInstance(UpdateDepartmentDto, req.body);
        const errors = await validate(updateDepartmentDto);
        if(errors.length>0){
            console.log(errors);
            logger.warn(`Validation error`);
            throw new ValidateException(errors);
        }
        const department = await this.departmentService.updateDepartment(departmentId, updateDepartmentDto);
        logger.info(`Department updated`);
        const resData = new DataFormat([department], null, "OK")
        res.status(200).send(resData);
        }catch(error){
            logger.warn(`Unable to update department`);
            next(error)
        }
    }


    deleteDepartment = async(req: express.Request, res: express.Response, next: NextFunction)=>{
        try{
            const departmentId = Number(req.params.id);
            const department = await this.departmentService.deleteDepartment(departmentId);
            logger.info(`Department deleted`);
            res.status(201).send(department);
        }catch(error){
            logger.warn(`Unable to delete department`);
            next(error);
        }
    }
}

export default DepartmentController;