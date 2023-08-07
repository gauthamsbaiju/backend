import { DataSource } from "typeorm";
import { when } from "jest-when";
import DepartmentService from "../../service/department.service";
import DepartmentRepository from "../../repository/department.repository";
import Department from "../../entity/department.entity";
import CreateDepartmentDto from "../../dto/create-department.dto";
import UpdateDepartmentDto from "../../dto/update-department.dto";

describe('Department Service tests', ()=>{

    let departmentService: DepartmentService;
    let departmentRepository: DepartmentRepository;

    const departments = [
        {
            "createdAt": "2022-09-29T06:57:29.684Z",
            "updatedAt": "2022-09-29T06:57:29.684Z",
            "deletedAt": null,
            "id": 1,
            "name": "Product Engineering"
          },
          {
            "createdAt": "2022-09-29T06:57:29.684Z",
            "updatedAt": "2022-09-29T06:57:29.684Z",
            "deletedAt": null,
            "id": 2,
            "name": "Human Resources"
          },
          {
            "createdAt": "2022-09-29T06:57:29.684Z",
            "updatedAt": "2022-09-29T06:57:29.684Z",
            "deletedAt": null,
            "id": 3,
            "name": "Finance"
          },
          {
            "createdAt": "2022-10-04T00:47:02.282Z",
            "updatedAt": "2022-10-04T01:31:37.260Z",
            "deletedAt": null,
            "id": 6,
            "name": "QA"
          },
          {
            "createdAt": "2022-10-04T08:24:42.448Z",
            "updatedAt": "2022-10-04T08:24:42.448Z",
            "deletedAt": null,
            "id": 8,
            "name": "Design"
          },
          {
            "createdAt": "2022-10-04T09:05:26.989Z",
            "updatedAt": "2022-10-04T09:05:26.989Z",
            "deletedAt": null,
            "id": 9,
            "name": "Hr"
          }
    ]
    
    beforeAll(()=>{
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
        departmentService = new DepartmentService(departmentRepository);
    })

    describe("Test for getAllDepartments", ()=>{

        test('test for getting all departments', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith().mockResolvedValueOnce(departments);
            departmentRepository.findAllDepartments = mockFunction;
            const department = await departmentService.getAllDepartments();
            expect(department).toStrictEqual(departments);
        })

    })

    describe("Test for getDepartmentById", ()=>{

        test('test for department id found', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(departments[0]);
            departmentRepository.findDepartmentById = mockFunction;
            const department = await departmentService.getDepartmentById(1);
            expect(department).toStrictEqual(departments[0]);
        })
        
        
        test('test for department id not found', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(10).mockResolvedValueOnce(null);
            departmentRepository.findDepartmentById = mockFunction;
            // const department = await departmentService.getdepartmentById(1);
            // expect(department).toEqual({id:1, name:"abcd"});
            expect(async()=>{await departmentService.getDepartmentById(10)}).rejects.toThrowError();
            
        })

    })

    describe("Test for createDepartment", ()=>{

        const dto: CreateDepartmentDto = {
            name: "Product Engineering"
        }
        const dept: Department = {
            name: "Product Engineering"
        } as Department
        test('test for department creation', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(dept).mockResolvedValueOnce(dept);
            departmentRepository.createDepartment = mockFunction;
            const department = await departmentService.createDepartment(dto);
            expect(department).toStrictEqual(dept);
        })

    })

    describe("Test for updateDepartment", ()=>{

        const dto: UpdateDepartmentDto = {
            name: "Product Engineering"
        }
        const dept: Department = {
            id: 2,
            name: "Product"
        } as Department
        const deptUdt: Department = {
            id: 2,
            name: "Product Engineering"
        } as Department
        test('test for department updation successful', async()=>{
            const mockFunction = jest.fn();
            const mockFunction2 = jest.fn();
            when(mockFunction).calledWith(dept).mockResolvedValueOnce(deptUdt);
            when(mockFunction2).calledWith(2).mockResolvedValueOnce(dept);
            departmentRepository.updateDepartment = mockFunction;
            departmentRepository.findDepartmentById = mockFunction2;
            const department = await departmentService.updateDepartment(2,dto);
            expect(department).toStrictEqual(deptUdt);
        })
        
        
        test('test department id for update not found', async()=>{
            const mockFunction = jest.fn();
            const mockFunction2 = jest.fn();
            when(mockFunction2).calledWith(10).mockResolvedValueOnce(null);
            departmentRepository.findDepartmentById = mockFunction2;
            expect(async()=>{await departmentService.updateDepartment(10, dto)}).rejects.toThrowError();
            
        })

    })

    describe("Test for deleteDepartment", ()=>{

        const dto: UpdateDepartmentDto = {
            name: "Product Engineering"
        }
        const dept: Department = {
            id: 2,
            name: "Product Engineering"
        } as Department
        const deptDel: Department = {
            id: 2,
            name: "Product Engineering",
            deletedAt: new Date()
        } as Department
        test('test for department deletion successful', async()=>{
            const mockFunction = jest.fn();
            const mockFunction1 = jest.fn();
            const mockFunction2 = jest.fn();
            when(mockFunction).calledWith(2).mockResolvedValueOnce(dept);
            when(mockFunction1).calledWith(dept).mockResolvedValueOnce(null);
            when(mockFunction2).calledWith(2).mockResolvedValueOnce(deptDel);
            departmentRepository.findDepartmentById = mockFunction;
            departmentRepository.deleteDepartment = mockFunction1;
            departmentRepository.findDeleted = mockFunction2;
            const department = await departmentService.deleteDepartment(2);
            expect(department).toStrictEqual(deptDel);
        })

        test('test for department deletion successful', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(20).mockResolvedValueOnce(null);
            departmentRepository.findDepartmentById = mockFunction;
            expect(async()=>{await departmentService.deleteDepartment(20)}).rejects.toThrowError();
        })

    })
})