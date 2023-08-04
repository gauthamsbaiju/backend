import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import Role from "../utils/role.enum";
import { jwtPayload } from "../utils/jwtPayload.type";

class EmployeeService {
    
    
    constructor(private employeeRepository: EmployeeRepository) {
    }

    getAllEmployees(): Promise<Employee[]>{
        return this.employeeRepository.findAllEmployees();
    }

    async getEmployeeById(id: number): Promise<Employee> | null {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        if(!employee)
        {
            throw new HttpException(404,`Employee not found with id: ${id}`);
        }
        return employee;
    }
    
    
    async createEmployee(name:string, email:string, address:any, password:string, role: Role): Promise<Employee> {
                
        const newAddress = new Address;
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.address = newAddress;
        newEmployee.password = await bcrypt.hash(password,10);
        newEmployee.role = role;
        
        return this.employeeRepository.createEmployee(newEmployee);
    }
    
    
    async updateEmployee(id: number, email: string, name: string, address:any): Promise<Employee> | null {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        if(!employee)
        {
            throw new HttpException(404,`Employee not found with id: ${id}`);
        }
        employee.email = email;
        employee.name = name;
        employee.address.line1 = address.line1;
        employee.address.pincode = address.pincode;
       
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

     loginEmployee = async(email: string, password: string) => {
        const employee = await this.employeeRepository.findAnEmployeeByEmail(email);
        if(!employee){
            throw new HttpException(401, "Incorrect username or password");
        }

        const result = await bcrypt.compare(password, employee.password);
        if(!result){
            throw new HttpException(401, "Incorrect username or password");
        }

        const payload: jwtPayload = {
            name: employee.name,
            email: employee.email,
            role: employee.role
        }

        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        return { token: token };
    }
}

export default EmployeeService;