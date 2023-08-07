import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import { Role } from "../../utils/role.enum";
import CreateEmployeeDto from "../../dto/create-employee.dto";
import CreateAddressDto from "../../dto/create-address.dto";
import Department from "../../entity/department.entity";
import DepartmentRepository from "../../repository/department.repository";
import DepartmentService from "../../service/department.service";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import UpdateEmployeeDto from "../../dto/update-employee.dto";

jest.mock('bcrypt');
jest.mock('jsonwebtoken')

//const mockBcrypt = jest.mocked(bcrypt.hash);

describe('Employee Service tests', ()=>{

    let departmentService: DepartmentService;
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    let departmentRepository: DepartmentRepository;
    const employees = [
        {
            "createdAt": "2022-10-04T05:34:26.315Z",
            "updatedAt": "2022-10-04T05:36:21.808Z",
            "deletedAt": null,
            "id": "1b5368d2-1cbd-4a28-a275-38670b56b846",
            "name": "amal",
            "username": "ama",
            "password": "$2b$10$S9uZH54.S3HBHDjcKLvEt.wIhGTgw4wQnBQumcdMTRY0XC1nTSwpi",
            "joiningDate": "11/02/2012",
            "isActive": true,
            "experience": 8,
            "department": 2,
            "role": "admin"
          },
          {
            "createdAt": "2022-10-04T08:23:49.661Z",
            "updatedAt": "2022-10-04T08:23:49.661Z",
            "deletedAt": null,
            "id": "1af769f7-b34e-4da8-837d-7350ec32e5eb",
            "name": "malathy",
            "username": "mal",
            "password": "$2b$10$adSMa/0K4b0X1ZUg/EjX/eVafRF3NoK3A0vNINHtRb3Vu0CIq4wiS",
            "joiningDate": "11/02/2012",
            "isActive": true,
            "experience": 8,
            "department": 2,
            "role": "user"
          },
          {
            "createdAt": "2022-10-04T08:58:29.669Z",
            "updatedAt": "2022-10-04T08:58:29.669Z",
            "deletedAt": null,
            "id": "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
            "name": "Ashok",
            "username": "ash",
            "password": "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
            "joiningDate": "11/02/2012",
            "isActive": true,
            "experience": 8,
            "department": 2,
            "role": "admin"
          }
        ]
    beforeAll(()=>{
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;

        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        departmentService = new DepartmentService(departmentRepository)
        employeeService = new EmployeeService(employeeRepository, departmentService);
    })

    describe("Test for getEmployeeById", ()=>{

        test('test employee for id 1 found', async()=>{
            
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(employees[1]);
            employeeRepository.findAnEmployeeById = mockFunction;
            const employee = await employeeService.getEmployeeById(1);
            expect(employee).toStrictEqual(employees[1]);
        })
        
        
        test('test employee for id 1 not found', async()=>{
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(100).mockResolvedValueOnce(null);
            employeeRepository.findAnEmployeeById = mockFunction;
            // const employee = await employeeService.getEmployeeById(1);
            // expect(employee).toEqual({id:1, name:"abcd"});
            expect(async()=>{await employeeService.getEmployeeById(100)}).rejects.toThrowError();
            
        })

    })
    
    describe("Test for createEmployee", ()=>{

        const employeeDto : CreateEmployeeDto = {
        
                "name":"Ashok",
                "username":"ash",
                "password":"ashok",
                "joiningDate":"11/02/2012",
                "experience":8,
                "department":2,
                "role":Role.admin,
                "address": {
                    "address_line_1":"Edachira",
                    "address_line_2":"Kakkanad",
                    "city":"Ernakulam",
                    "state":"Kerala",
                    "country":"India",
                    "pincode":"682024"
                } 
            
        } as CreateEmployeeDto 

        // const employeeDto2 : CreateEmployeeDto = {
        
        //     "username":"ash",
        //     "password":"ashok",
        //     "joiningDate":"11/02/2012",
        //     "experience":8,
        //     "department":2,
        //     "role":Role.admin,
        //     "address": {
        //         "address_line_1":"Edachira",
        //         "address_line_2":"Kakkanad",
        //         "city":"Ernakulam",
        //         "state":"Kerala",
        //         "country":"India",
        //         "pincode":"682024"
        //     } 
        
        // } as CreateEmployeeDto 

        const department : Department = {
            "id": 2,
            "name": "Human Resources" 
        } as Department

        test('test for create', async()=>{
            const mockFunction = jest.fn();
            const mockFunction2 = jest.fn();
            const hashMock = jest.fn();
            //when(hashMock).calledWith(undefined).mockResolvedValueOnce("sdfsdf");
            when(mockFunction).calledWith(employeeDto).mockResolvedValueOnce(employees[0]);
            when(mockFunction2).calledWith(2).mockResolvedValueOnce(2);
            employeeRepository.createEmployee = mockFunction;
            departmentRepository.findDepartmentById = mockFunction2;
            hashMock.mockResolvedValueOnce("ashok");
            bcrypt.hash = hashMock;
            //mockBcrypt.mockResolvedValue('somehash');
            const employee = await employeeService.createEmployee(employeeDto);
            console.log(employee);
            expect(employee).toStrictEqual(employees[0]);
        })
        
        
        // test('test creation failed', async()=>{
        //     const mockFunction = jest.fn();
        //     const hashMock = jest.fn();
        //     when(mockFunction).calledWith(employeeDto2).mockResolvedValueOnce(null);
        //     employeeRepository.createEmployee = mockFunction;
        //     hashMock.mockResolvedValueOnce("ashok");
        //     bcrypt.hash = hashMock;
        //     const employee = await employeeService.createEmployee(employeeDto2);
        //     // const employee = await employeeService.getEmployeeById(1);
        //     // expect(employee).toEqual({id:1, name:"abcd"});
        //     expect(async()=>{await employeeService.getEmployeeById(1)}).rejects.toThrowError();
            
        // })

    })
    describe("Test for updateEmployee", ()=>{

        const updateDto : CreateEmployeeDto = {
        
            "name":"Ashok",
            "username":"ash",
            "password":"ashok",
            "joiningDate":"11/02/2012",
            "experience":8,
            "department":2,
            "role":Role.admin,
            "address": {
                "address_line_1":"Edachira",
                "address_line_2":"Kakkanad",
                "city":"Ernakulam",
                "state":"Kerala",
                "country":"India",
                "pincode":"682024"
            } 
        
        } as UpdateEmployeeDto
    

        test('test employee updated successfully', async()=>{
            
            const mockFunction = jest.fn();
            const mockFunction2 = jest.fn();
            when(mockFunction).calledWith(employees[2]).mockResolvedValueOnce(employees[2]);
            when(mockFunction2).calledWith(2).mockResolvedValueOnce(employees[2]);
            employeeRepository.updateEmployee = mockFunction;
            employeeRepository.findAnEmployeeById = mockFunction2;
            const employee = await employeeService.updateEmployee(2,updateDto);
            expect(employee).toStrictEqual(employees[2]);
        })
        
        
        test('test employee id for update not found', async()=>{
            const mockFunction = jest.fn();
            const mockFunction2 = jest.fn();
            when(mockFunction).calledWith(null).mockResolvedValueOnce(null);
            when(mockFunction2).calledWith(10).mockResolvedValueOnce(null);
            employeeRepository.updateEmployee = mockFunction;
            employeeRepository.findAnEmployeeById = mockFunction2;
            // const employee = await employeeService.getEmployeeById(1);
            // expect(employee).toEqual({id:1, name:"abcd"});
            expect(async()=>{await employeeService.updateEmployee(10,updateDto)}).rejects.toThrowError();
            
        })

    })
    
    describe("Test for deleteEmployee", ()=>{

        test('test employee deleted successfully', async()=>{
            
            const mockFunction = jest.fn();
            const mockFunction2 = jest.fn();
            when(mockFunction).calledWith(employees[0]).mockResolvedValueOnce(null);
            when(mockFunction2).calledWith(2).mockResolvedValueOnce(employees[0]);
            employeeRepository.deleteEmployee = mockFunction;
            employeeRepository.findAnEmployeeById = mockFunction2;
            const employee = await employeeService.deleteEmployee(2);
            expect(employee).toStrictEqual(null);
        })
        
        
        test('test employee delete failed', async()=>{
            const mockFunction = jest.fn();
            const mockFunction2 = jest.fn();
            when(mockFunction).calledWith(null).mockResolvedValueOnce(null);
            when(mockFunction2).calledWith(2).mockResolvedValueOnce(null);
            employeeRepository.deleteEmployee = mockFunction;
            employeeRepository.findAnEmployeeById = mockFunction2;
            // const employee = await employeeService.getEmployeeById(1);
            // expect(employee).toEqual({id:1, name:"abcd"});
            expect(async()=>{await employeeService.deleteEmployee(10)}).rejects.toThrowError();
            
        })

    })

    describe("Test for logInEmployee", ()=>{

        const emp: Employee = {
            "name": "qwerty",
            "username": "qwerty",
            "password": "password"
        }as Employee

        test('test employee logged in successfully', async()=>{
            
            const mockFunction = jest.fn();
            const hashMock1 = jest.fn();
            const hashMock2 = jest.fn();
            const jwtMock  = jest.fn();
            when(mockFunction).calledWith("qwerty").mockResolvedValueOnce(emp);
            hashMock1.mockResolvedValueOnce("password");
            bcrypt.hash = hashMock1;
            hashMock2.mockResolvedValueOnce(true);
            bcrypt.compare = hashMock2;
            jwtMock.mockReturnValueOnce("token");
            jsonwebtoken.sign = jwtMock;
            employeeRepository.findAnEmployeeByUsername = mockFunction;
            const employee = await employeeService.loginEmployee ("qwerty", "password");
            expect(employee).toStrictEqual({token: "token", employeeDetails :emp});
        })
        
        
        test('test employee login wrong username', async()=>{
            const mockFunction = jest.fn();
            // const hashMock1 = jest.fn();
            // const hashMock2 = jest.fn();
            // const jwtMock  = jest.fn();
            when(mockFunction).calledWith("qwerty123").mockResolvedValueOnce(null);
            // hashMock1.mockResolvedValueOnce("password");
            // bcrypt.hash = hashMock1;
            // hashMock2.mockResolvedValueOnce(true);
            // bcrypt.compare = hashMock2;
            // jwtMock.mockReturnValueOnce("token");
            // jsonwebtoken.sign = jwtMock;
            employeeRepository.findAnEmployeeByUsername = mockFunction;
            // const employee = await employeeService.getEmployeeById(1);
            // expect(employee).toEqual({id:1, name:"abcd"});
            expect(async()=>{await employeeService.loginEmployee("qwerty123", "password123")}).rejects.toThrowError();
            
        })

        test('test employee login wrong password', async()=>{
            const mockFunction = jest.fn();
            const hashMock1 = jest.fn();
            const hashMock2 = jest.fn();
            // const jwtMock  = jest.fn();
            when(mockFunction).calledWith("qwerty").mockResolvedValueOnce(emp);
            hashMock1.mockResolvedValueOnce("password123");
            bcrypt.hash = hashMock1;
            hashMock2.mockResolvedValueOnce(false);
            bcrypt.compare = hashMock2;
            // jwtMock.mockReturnValueOnce("token");
            // jsonwebtoken.sign = jwtMock;
            employeeRepository.findAnEmployeeByUsername = mockFunction;
            // const employee = await employeeService.getEmployeeById(1);
            // expect(employee).toEqual({id:1, name:"abcd"});
            expect(async()=>{await employeeService.loginEmployee("qwerty", "password123")}).rejects.toThrowError();
            
        })

    })
})