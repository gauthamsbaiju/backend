import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";

describe('Employee Service tests', ()=>{

    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    beforeAll(()=>{
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService = new EmployeeService(employeeRepository);
    })

    describe("Test for getEmployeeById", ()=>{

        test('test employee for id 1 found', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce({"id":1, "name":"abc"});
            employeeRepository.findAnEmployeeById = mockFunction;
            const employee = await employeeService.getEmployeeById(1);
            expect(employee).toStrictEqual({id:1, name:"abc"});
        })
        
        
        test('test employee for id 1 not found', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(null);
            employeeRepository.findAnEmployeeById = mockFunction;
            // const employee = await employeeService.getEmployeeById(1);
            // expect(employee).toEqual({id:1, name:"abcd"});
            expect(async()=>{await employeeService.getEmployeeById(1)}).rejects.toThrowError();
            
        })

    })
})