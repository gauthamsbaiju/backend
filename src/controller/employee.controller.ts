import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../exception/http.exception";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import ValidateException from "../exception/validate.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import DataFormat from "../utils/dataFromat";

// const tracer = require('dd-trace').init({
//     logInjection: true,
    
// });

import logger from "../logs/logger";
import { RequestWithID } from "../utils/reqWithId";


class EmployeeController {
    
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        // this.router.get('/', authenticate, this.getAllEmployees);
        // this.router.get('/:id',authenticate, this.getEmployeeById);
        // this.router.post('/',authenticate, this.postEmployee);
        // this.router.put('/:id',  authenticate, authorize,this.updateEmployee);
        // this.router.delete('/:id',  authenticate, authorize,this.deleteEmployee);
        // this.router.post("/login", this.logInEmployee);


        this.router.get('/', authenticate, this.getAllEmployees);
        this.router.get('/:id', authenticate,  this.getEmployeeById);
        this.router.post('/',  authenticate, authorize, this.createEmployee);
        this.router.patch('/:id', authenticate, authorize, this.updateEmployee);
        this.router.delete('/:id',  authenticate, authorize, this.deleteEmployee);
        this.router.post("/login", this.logInEmployee);

    }
    
    
    getAllEmployees = async(req: RequestWithID, res: express.Response)=> {
        const employee = await this.employeeService.getAllEmployees();
        console.log(req.id)
        logger.info(req.id.toString(), {message: "All employees retrieved"});
        const resData = new DataFormat(employee, null, "OK")
        res.status(200).send(resData);
    }
    
    
    getEmployeeById = async (req: RequestWithID, res: express.Response, next: NextFunction) => {
        try{
            const employeeId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            logger.info(req.id.toString(), {message: `Employee with id ${employeeId} retrieved`});
            const resData = new DataFormat([employee], null, "OK")
            res.status(200).send(resData);
        }catch(error){
            logger.warn(req.id.toString(), {message: "Employee not found"});
            next(error);
        }
    }
    
    
    createEmployee = async(req: RequestWithID, res: express.Response, next: NextFunction)=> {

        try{
        const { name, email, password, address, role} = req.body;
        const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
        const errors = await validate(createEmployeeDto);
        if(errors.length>0){
            console.log(errors);
            logger.warn(req.id.toString(), {message: "Validation failed"});
            throw new ValidateException(errors); 
        }
        const employee = await this.employeeService.createEmployee(createEmployeeDto);
        logger.info(req.id.toString(), {message: "Employee created"});
        const resData = new DataFormat([employee], null, "OK")
        res.status(200).send(resData);
        }catch(error){
            logger.warn(req.id.toString(), {message: "Unable to create employee"});
            next(error);
        }
    }
    
    
    updateEmployee = async (req: RequestWithID, res: express.Response, next: NextFunction) => {
        try{
        const employeeId = Number(req.params.id);
        const email = req.body.email;
        const name = req.body.name;
        const address = req.body.address;
        const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
        const errors = await validate(updateEmployeeDto);
        if(errors.length>0){
            console.log(errors);
            logger.warn(req.id.toString(), {message:`Validation error`});
            throw new ValidateException(errors);
        }
        const employee = await this.employeeService.updateEmployee(employeeId, updateEmployeeDto);
        logger.info(req.id.toString(), {message:`Employee updated`});
        const resData = new DataFormat([employee], null, "OK")
        res.status(200).send(resData);
        }catch(error){
            logger.warn(req.id.toString(), {message:`Unable to update employee`});
            next(error)
        }
    }
     
    
    deleteEmployee = async (req: RequestWithID, res: express.Response, next: NextFunction) => {
        try{
        const employeeId = Number(req.params.id);
        // const deleteEmployeeDto = plainToInstance(DeleteEmployeeDto, req.params);
        // const errors = await validate(deleteEmployeeDto);
        // if(errors.length>0){
        //     console.log(errors);
        //     throw new ValidateException(400, "Validate Exception", errors);
        // }
        const employee = await this.employeeService.deleteEmployee(employeeId);
        logger.info(req.id.toString(), {message:`Employee deleted`});
        const resData = new DataFormat([], null, "OK");
        res.status(204).send();
        }catch(error){
            logger.warn(req.id.toString(), {message:`Unable to delete employee`});
            next(error);
        }
    }
    
    public logInEmployee = async(req: RequestWithID, res: express.Response, next: express.NextFunction)=>{

        const {username, password} = req.body;
        try{
            const data = await this.employeeService.loginEmployee(username, password);
            const resData = new DataFormat([data], null, "OK")
            logger.info(req.id.toString(), {message:`Successfully logged in`});
            res.status(200).send(resData);
        }catch(error){
            logger.warn(req.id.toString(), {message:`Log in failed`});
            next(error);
        }
    
    }

}

export default EmployeeController;