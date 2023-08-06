import { DataSource } from "typeorm";
import { when } from "jest-when";
import DepartmentService from "../../service/department.service";
import DepartmentRepository from "../../repository/department.repository";
import Department from "../../entity/department.entity";

describe('Department Service tests', ()=>{

    let departmentService: DepartmentService;
    let departmentRepository: DepartmentRepository;
    beforeAll(()=>{
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
        departmentService = new DepartmentService(departmentRepository);
    })

    describe("Test for getdepartmentById", ()=>{

        test('test department for id 1 found', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce({"id":1, "name":"abc"});
            departmentRepository.findDepartmentById = mockFunction;
            const department = await departmentService.getDepartmentById(1);
            expect(department).toStrictEqual({id:1, name:"abc"});
        })
        
        
        test('test department for id 1 not found', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(null);
            departmentRepository.findDepartmentById = mockFunction;
            // const department = await departmentService.getdepartmentById(1);
            // expect(department).toEqual({id:1, name:"abcd"});
            expect(async()=>{await departmentService.getDepartmentById(1)}).rejects.toThrowError();
            
        })

    })
})