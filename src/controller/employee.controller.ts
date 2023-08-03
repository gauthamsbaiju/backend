import express from "express";
import EmployeeService from "../service/employee.service";

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
    getEmployeeById = async (req: express.Request, res: express.Response) => {
        const employeeId = Number(req.params.id);
        const employee = await this.employeeService.getEmployeeById(employeeId);
        if(!employee)
            res.status(404).send();
        else
            res.status(200).send(employee);
    }
    postEmployee = async(req: express.Request, res: express.Response)=> {
        const name = req.body.name;
        const email = req.body.email;
        const employee = await this.employeeService.createEmployee(name, email);
        res.status(200).send(employee);
    }
    updateEmployee = async (req: express.Request, res: express.Response) => {
        const employeeId = Number(req.params.id);
        const email = req.body.email;
        const name = req.body.name;
        const employee = await this.employeeService.updateEmployee(employeeId, email, name);
        if(!employee)
            res.status(404).send();
        else
            res.status(200).send(employee);
    }
    deleteEmployee = async (req: express.Request, res: express.Response) => {
        const employeeId = Number(req.params.id);
        const employee = await this.employeeService.deleteEmployee(employeeId);
        if(employee === false){
            res.status(404).send();
        }
        else
            res.status(204).send();
    }

}

export default EmployeeController;