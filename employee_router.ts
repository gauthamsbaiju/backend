import express from "express";
import Employee from "./employee";
import { DataSource, FindManyOptions, FindOptionsWhere, Like, QueryBuilder } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dataSource from "./data-source";

const employeeRouter = express.Router();
let count = 3;


employeeRouter.get('/', async(req,res)=>{

    const nameFilter = req.query.name as string;
    const emailFilter = req.query.email as string;
    const employeeRepository = dataSource.getRepository(Employee);

    const filters: FindOptionsWhere<Employee> = {};
    
    const qb = employeeRepository.createQueryBuilder().select([Employee.name]);
    if(nameFilter){
        qb.andWhere("name like :n", {n: `${nameFilter}%`})
    }
    if(emailFilter){
        qb.andWhere("email like :n", {n: `${emailFilter}%`})
    }
    
    const employee = await qb.getMany();
    res.status(200).send(employee);
});

employeeRouter.get('/:id', async(req,res)=>{
    
    const id = parseInt(req.params.id);
    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id
    })
    if(employee)
        res.status(200).send(employee);
    else
        res.status(404).send();
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
    await employeeRepository.softRemove(employee);
    res.status(204).send();
});



// employeeRouter.patch('/:id', async(req,res)=>{
    
//     const id = parseInt(req.params.id);
//     const employeeRepository = dataSource.getRepository(Employee);
//     const employee = await employeeRepository.findOneBy({
//         id
//     })
//     employee.name = req.body.name;
//     employee.email = req.body.email;
//     const updatedEmployee = await employeeRepository.save(employee)
//     res.status(200).send(updatedEmployee);
// });
export default employeeRouter;