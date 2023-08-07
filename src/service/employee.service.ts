import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {Role} from "../utils/role.enum";
import { jwtPayload } from "../utils/jwtPayload.type";
import CreateEmployeeDto from "../dto/create-employee.dto";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import Department from "../entity/department.entity";
import DepartmentService from "./department.service";
import dataSource from "../db/postgres.db";
import DepartmentRepository from "../repository/department.repository";

class EmployeeService {
    
    
    constructor(private employeeRepository: EmployeeRepository, private departmentService: DepartmentService) {
    }

    async getAllEmployees(offset:number, limit:number): Promise<Employee[]>{
        return await this.employeeRepository.findAllEmployees(offset, limit);
    }

    async getEmployeeById(id: number): Promise<Employee> | null {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        if(!employee)
        {
            throw new HttpException(404,`Employee not found with id: ${id}`);
        }
        return employee;
    }
    
    
    async createEmployee(employeeDto: CreateEmployeeDto): Promise<Employee> {
                
        const newAddress = new Address;
        newAddress.address_line_1 = employeeDto.address.address_line_1;
        newAddress.address_line_2 = employeeDto.address.address_line_2;
        newAddress.city = employeeDto.address.city;
        newAddress.state = employeeDto.address.state;
        newAddress.country = employeeDto.address.country;
        newAddress.pincode = employeeDto.address.pincode;
        
        const newEmployee = new Employee();
        newEmployee.name = employeeDto.name;
        newEmployee.username = employeeDto.username;
        newEmployee.password = await bcrypt.hash(employeeDto.password,10);
        newEmployee.joiningDate = employeeDto.joiningDate;
        newEmployee.experience= employeeDto.experience;

        // const departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
        // const departmentService = new  DepartmentService(departmentRepository);

        const department = await this.departmentService.getDepartmentById(employeeDto.departmentId);

        newEmployee.department = department;
        newEmployee.address = newAddress;
        newEmployee.role = employeeDto.role;
        
        return this.employeeRepository.createEmployee(newEmployee);
    }
    
    
    async updateEmployee(id: number,employeeDto: UpdateEmployeeDto): Promise<Employee> | null {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        if(!employee)
        {
            throw new HttpException(404,`Employee not found with id: ${id}`);
        }
        this.checkUpdate(employee, employeeDto);
        // employee.name = employeeDto.name;
        // employee.address.address_line_1 = employeeDto.address.address_line_1;
        // employee.address.address_line_2 = employeeDto.address.address_line_2;
        // employee.address.city = employeeDto.address.city;
        // employee.address.state = employeeDto.address.state;
        // employee.address.country = employeeDto.address.country;
        // employee.address.pincode = employeeDto.address.pincode;
       
        return this.employeeRepository.updateEmployee(employee);
    }
    
    
    async deleteEmployee(id: number): Promise<void | boolean> {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        if(employee)
            this.employeeRepository.deleteEmployee(employee);
        else
            throw new HttpException(404,`Employee not found with id: ${id}`);
        return null;
    }

    
    loginEmployee = async(username: string, password: string) => {
        const employee = await this.employeeRepository.findAnEmployeeByUsername(username);
        if(!employee){
            throw new HttpException(401, "Incorrect username or password");
        }
        const p = await bcrypt.hash(password,10)
        console.log(p);
        console.log(employee.password);
        const result = await bcrypt.compare(password, employee.password);
        if(!result){
            throw new HttpException(401, "Incorrect username or password");
        }

        const payload: jwtPayload = {
            name: employee.username,
            role: employee.role
        }

        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "5h"
        });

        return { token: token, employeeDetails: employee};
    }

    checkUpdate = async(employee: Employee, dto: UpdateEmployeeDto)=>{
        let array = Object.getOwnPropertyNames(dto);
        for(const a in array){
            if(array[a]==="address"){
                this.checkUpdateAddress(employee, dto[array[a]]);
                //employee[array[a]] = dto[array[a]];
            }
            else if(array[a]==="password"){
                continue;
            }
            else{
                //this.checkUpdateAddress(employee, dto[array[a]]);
                employee[array[a]] = dto[array[a]];
            }
        }
    }
    checkUpdateAddress = async(employee: Employee, address:Object)=>{
        let array = Object.getOwnPropertyNames(address);
        for(const a in array){
             employee["address"][array[a]] = address[array[a]];         
        }
    }

}

export default EmployeeService;