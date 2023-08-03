import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";

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
    createEmployee(name:string, email:string, address:any): Promise<Employee> {
        
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        
        const newAddress = new Address;
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        newEmployee.address = newAddress;
        
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
}

export default EmployeeService;