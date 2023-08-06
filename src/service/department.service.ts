import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import Department from "../entity/department.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService{

    constructor(private departmentRepository: DepartmentRepository){
    }

    async getAllDepartments(): Promise<Department[]>{
        return await this.departmentRepository.findAllDepartments();
    }

    async getDepartmentById(id: number): Promise<Department>{
        const department = await this.departmentRepository.findDepartmentById(id);
        if(!department){
            throw new HttpException(404,`Department not found with id: ${id}`);
        }
        return department;
    }

    async createDepartment(departmentDto: CreateDepartmentDto): Promise<Department>{

        const department = new Department();
        department.name = departmentDto.name;

        return await this.departmentRepository.createDepartment(department);
    }

    async updateDepartment(id: number, departmentDto: UpdateDepartmentDto): Promise<Department> | null {
        
        const department = await this.departmentRepository.findDepartmentById(id);
        if(!department){
            throw new HttpException(404,`Department not found with id: ${id}`);
        }
        department.name = departmentDto.name;
        return this.departmentRepository.updateDepartment(department);
    }

    async deleteDepartment(id: number): Promise<Department>{
        
        const department = await this.departmentRepository.findDepartmentById(id);
        if(!department){
            throw new HttpException(404,`Department not found with id: ${id}`);
        }
        this.departmentRepository.deleteDepartment(department);
        return await this.departmentRepository.findDeleted(id);
    }
}
export default DepartmentService;