import express from "express";
import Employee from "./employee";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dataSource from "./data-source";

const employeeRouter = express.Router();
let count = 3;

const employees: Employee[] = [
    {
        id:1,
        name: "Name1",
        email: "name1@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id:2,
        name: "Name2",
        email: "name2@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id:3,
        name: "Name3",
        email: "name3@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]

employeeRouter.get('/', async(req,res)=>{

    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.find();
    res.status(200).send(employee);
});

employeeRouter.get('/:id', async(req,res)=>{
    
    const id = parseInt(req.params.id);
    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id
    })
    res.status(200).send(employee);
});

employeeRouter.post('/', async(req,res)=>{
    
    const employeeRepository = dataSource.getRepository(Employee);

    const newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    const savedEmployee = await employeeRepository.save(newEmployee);
    res.status(200).send(savedEmployee);
});

employeeRouter.put('/:id', async(req,res)=>{
    
    const id = parseInt(req.params.id);
    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id
    })
    employee.name = req.body.name;
    employee.email = req.body.email;
    const updatedEmployee = await employeeRepository.save(employee)
    res.status(200).send(updatedEmployee);
});

employeeRouter.delete('/:id', async(req,res)=>{
    const id = parseInt(req.params.id);
    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id
    })
    await employeeRepository.remove(employee);
    res.status(204).send();
});

export default employeeRouter;