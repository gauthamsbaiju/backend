import express from "express";
import Employee from "./employee";

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

employeeRouter.get('/', (req,res)=>{
    console.log(req.url);
    res.status(200).send(employees);
});

employeeRouter.get('/:id', (req,res)=>{
    console.log(req.url);
    const id = parseInt(req.params.id);
    const employee = employees.find(eid=>eid.id===id)
    res.status(200).send(employee);
});

employeeRouter.post('/', (req,res)=>{
    console.log(req.body);
    const newEmployee = new Employee();
    newEmployee.id = ++count;
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    newEmployee.createdAt = new Date();
    newEmployee.updatedAt = new Date();
    res.status(200).send(newEmployee);
    employees.push(newEmployee);
});

employeeRouter.put('/:id', (req,res)=>{
    console.log(req.url);
    const id = parseInt(req.params.id);
    const employee = employees.find(eid=>eid.id===id)
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.updatedAt = new Date();

    res.status(200).send(employee);
});

employeeRouter.delete('/:id', (req,res)=>{
    console.log(req.url);
    console.log(req.url);
    const id = parseInt(req.params.id);
    let index = employees.findIndex(eid=>eid.id===id)
    employees.splice(index,1);
    res.status(204).send();
});

export default employeeRouter;