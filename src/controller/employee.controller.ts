import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../exception/http.exception";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import DeleteEmployeeDto from "../dto/delete-employee.dto";
import ValidateException from "../exception/validate.exception";

class EmployeeController {
    
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();

        this.router.get('/', this.getAllEmployees);
        this.router.get('/:id', this.getEmployeeById);
        this.router.post('/', this.postEmployee);
        this.router.put('/:id', this.updateEmployee);
        this.router.delete('/:id', this.deleteEmployee);

    }
    getAllEmployees = async(req: express.Request, res: express.Response)=> {
        const employee = await this.employeeService.getAllEmployees();
        res.status(200).send(employee);
    }
    getEmployeeById = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const employeeId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            res.status(200).send(employee);
        }catch(error){
            next(error);
        }
    }
    postEmployee = async(req: express.Request, res: express.Response, next: NextFunction)=> {

        try{
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
        const errors = await validate(createEmployeeDto);
        if(errors.length>0){
            // console.log(JSON.stringify(errors));
            console.log(errors);
            throw new ValidateException(400,"Validate Exception", errors);
        }
        const employee = await this.employeeService.createEmployee(name, email, address);
        res.status(200).send(employee);
        }catch(error){
            next(error);
        }
    }
    updateEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
        const employeeId = Number(req.params.id);
        const email = req.body.email;
        const name = req.body.name;
        const address = req.body.address;
        const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
        const errors = await validate(updateEmployeeDto);
        //const validateException = new ValidateException(400, "Validate Exception", errors)
        if(errors.length>0){
            // console.log(JSON.stringify(errors));
            console.log(errors);
            throw new ValidateException(400, "Validate Exception", errors);
        }
        const employee = await this.employeeService.updateEmployee(employeeId, email, name, address);
        res.status(200).send(employee);
        }catch(error){
            next(error)
        }
    }
    deleteEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
        const employeeId = Number(req.params.id);
        const deleteEmployeeDto = plainToInstance(DeleteEmployeeDto, req.params);
        // const errors = await validate(deleteEmployeeDto);
        // if(errors.length>0){
        //     // console.log(JSON.stringify(errors));
        //     console.log(errors);
        //     throw new HttpException(400, JSON.stringify(errors));
        // }
        const employee = await this.employeeService.deleteEmployee(employeeId);
        res.status(204).send();
        }catch(error){
            next(error);
        }
    }

}

export default EmployeeController;