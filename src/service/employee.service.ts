import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import Role from "../utils/role.enum";
import { jwtPayload } from "../utils/jwtPayload.type";
import CreateEmployeeDto from "../dto/create-employee.dto";
import UpdateEmployeeDto from "../dto/update-employee.dto";

class EmployeeService {
    
    
    constructor(private employeeRepository: EmployeeRepository) {
    }

    async getAllEmployees(): Promise<Employee[]>{
        return await this.employeeRepository.findAllEmployees();
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
        newAddress.line1 = employeeDto.address.line1;
        newAddress.pincode = employeeDto.address.pincode;
        
        const newEmployee = new Employee();
        newEmployee.name = employeeDto.name;
        newEmployee.email = employeeDto.email;
        newEmployee.address = newAddress;
        newEmployee.password = await bcrypt.hash(employeeDto.password,10);
        newEmployee.role = employeeDto.role;
        
        return this.employeeRepository.createEmployee(newEmployee);
    }
    
    
    async updateEmployee(id: number,employeeDto: UpdateEmployeeDto): Promise<Employee> | null {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        if(!employee)
        {
            throw new HttpException(404,`Employee not found with id: ${id}`);
        }
        // for(const x in employeeDto)
        // {
        //     const key = x as keyof typeof Employee;

        //     employee[key] = employeeDto[key];
        //     console.log(key);
        //     console.log(employee[key]);
        // }
        employee.email = employeeDto.email;
        employee.name = employeeDto.name;
        employee.address.line1 = employeeDto.address.line1;
        employee.address.pincode = employeeDto.address.pincode;
       
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
        const p = await bcrypt.hash(password,10)
        console.log(p);
        console.log(employee.password);
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