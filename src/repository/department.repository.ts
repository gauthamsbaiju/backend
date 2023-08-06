import { DataSource, Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository{

    private datasource: DataSource;

    constructor(private departmentRepository: Repository<Department>){
    }

    findAllDepartments(): Promise<Department[]>{
        return this.departmentRepository.find({})
    }

    findDepartmentById(id: number): Promise<Department>{
        return this.departmentRepository.findOne({
            where : {id : id}
        });
    } 

    createDepartment(department: Department): Promise<Department>{
        return this.departmentRepository.save(department);
    }

    updateDepartment(department: Department): Promise<Department> | null {
        return this.departmentRepository.save(department);  
    }
    deleteDepartment(department: Department): Promise<Department> {
        return this.departmentRepository.softRemove(department);  
    }
    findDeleted(id: number): Promise<Department>{
        return this.departmentRepository.findOne({
            where: {id:id},
            withDeleted: true
        })
    }

}
export default DepartmentRepository;