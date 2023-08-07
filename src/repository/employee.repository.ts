import { DataSource, RelationId, Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import dataSource from "../db/postgres.db";
import { RelationIdLoader } from "typeorm/query-builder/RelationIdLoader";

class EmployeeRepository {
    [x: string]: any;

    private dataSource: DataSource;
    
    constructor(private employeeRepository: Repository<Employee>) {
    }

    findAllEmployees(offset:number, limit:number): Promise<Employee[]> {
        return this.employeeRepository.find({
            order: {
                id: 'ASC'
            },
            skip: offset,
            take: limit
            // loadRelationIds: {
            //     relations:["department"],
            // },
        });

    }

    findAnEmployeeById(id: number): Promise<Employee> | null {
        return this.employeeRepository.findOne({
            where: { id: id },
            relations: {
                address: true,
            },
            // loadRelationIds: {
            //     relations: ["department"]
            // }
        });   
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        const emp = await this.employeeRepository.save(employee);
        return this.employeeRepository.findOne({
            where: { id: emp.id},
            relations: {
                address: true,
            },
            // loadRelationIds: {
            //     relations:["department"],
            // },
        }); 
    }
    
    updateEmployee(employee: Employee): Promise<Employee> | null {
        return this.employeeRepository.save(employee);  
    }
    
    deleteEmployee(employee: Employee): Promise<void> {
        this.employeeRepository.softRemove(employee);  
        return null;
    }

    findAnEmployeeByUsername(name: string): Promise<Employee> {
        return this.employeeRepository.findOne({
            where: { username: name },
            // loadRelationIds : {
            //     relations: ["department"]
            // }
        });
    }



}

export default EmployeeRepository;