import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
    
    
    constructor(private employeeRepository: EmployeeRepository) {
   
    }

    getAllEmployees(): Promise<Employee[]>{
        return this.employeeRepository.findAllEmployees();
    }

    getEmployeeById(id: number): Promise<Employee> | null {
        return this.employeeRepository.findAnEmployeeById(id);
    }
    createEmployee(name:string, email:string): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        return this.employeeRepository.createEmployee(newEmployee);
    }
    async updateEmployee(id: number, email: string, name: string): Promise<Employee> | null {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        employee.email = email;
        employee.name = name;
        return this.employeeRepository.updateEmployee(employee);
    }
    async deleteEmployee(id: number): Promise<void | boolean> {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        if(employee)
            this.employeeRepository.deleteEmployee(employee);
        else
            return false;
        return null;
    }
}

export default EmployeeService;