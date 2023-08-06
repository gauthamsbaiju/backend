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
    
    describe("Test for createEmployee", ()=>{

        test('test for create', async()=>{
            const mockFunction = jest.fn();
            const employee = new Employee();
            when(mockFunction).calledWith(employee).mockResolvedValueOnce({
                "name":"Ashok",
                "username":"ash",
                "password":"ashok",
                "joiningDate":"11/02/2012",
                "experience":8,
                "departmentId":"2",
                "role":"admin",
                "address":{
                    "address_line_1":"Edachira",
                    "address_line_2":"Kakkanad",
                    "city":"Ernakulam",
                    "state":"Kerala",
                    "country":"India",
                    "pincode":"682024"
                }
            });
            employeeRepository.createEmployee = mockFunction;
            //const employee = await employeeService.getEmployeeById(1);
            expect(employee).toStrictEqual({
                "name":"Ashok",
                "username":"ash",
                "password":"ashok",
                "joiningDate":"11/02/2012",
                "experience":8,
                "departmentId":"2",
                "role":"admin",
                "address":{
                    "address_line_1":"Edachira",
                    "address_line_2":"Kakkanad",
                    "city":"Ernakulam",
                    "state":"Kerala",
                    "country":"India",
                    "pincode":"682024"
                }
            });
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