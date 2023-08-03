import { DataSource, Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import dataSource from "../db/postgres.db";

class EmployeeRepository {
    [x: string]: any;

    private dataSource: DataSource;
    
    constructor(private employeeRepository: Repository<Employee>) {
    }

    findAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find();

    }

    findAnEmployeeById(id: number): Promise<Employee> | null {
        return this.employeeRepository.findOneBy({
            id: id,
        });   
    }
    createEmployee(employee: Employee): Promise<Employee> {
        return this.employeeRepository.save(employee); 
    }
    updateEmployee(employee: Employee): Promise<Employee> | null {
        return this.employeeRepository.save(employee);  
    }
    deleteEmployee(employee: Employee): Promise<void> {
        this.employeeRepository.softRemove(employee);  
        return null;
    }

}

export default EmployeeRepository;