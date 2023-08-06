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
        const resData = new DataFormat(departments, null, "OK")
        res.status(200).send(resData);
    }
    
    getDepartmentById = async(req: express.Request, res: express.Response, next: NextFunction)=>{
        try{
            const departmentId = Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(departmentId);
            const resData = new DataFormat([department], null, "OK")
            res.status(200).send(resData);
        }catch(error){
            next(error);
        }
    }

    createDepartment = async(req: express.Request, res: express.Response, next: NextFunction)=>{

        try{
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if(errors.length>0){
                console.log(errors);
                throw new ValidateException(errors); 
            }
            const department = await this.departmentService.createDepartment(createDepartmentDto);
            const resData = new DataFormat([department], null, "OK")
            res.status(200).send(resData);
        }catch(error){
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
            throw new ValidateException(errors);
        }
        const department = await this.departmentService.updateDepartment(departmentId, updateDepartmentDto);
        const resData = new DataFormat([department], null, "OK")
        res.status(200).send(resData);
        }catch(error){
            next(error)
        }
    }


    deleteDepartment = async(req: express.Request, res: express.Response, next: NextFunction)=>{
        try{
            const departmentId = Number(req.params.id);
            const department = await this.departmentService.deleteDepartment(departmentId);
            res.status(201).send(department);
        }catch(error){
            next(error);
        }
    }
}

export default DepartmentController;