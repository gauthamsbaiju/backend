// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
// import Address from "./address.entity";
// import Employee from "./employee.entity";
// import AbstractEntity from "./adstract-entity";

// @Entity()
// class Department extends AbstractEntity{
//     @Column()
//     name: string;

//     @Column()
//     email: string;

//     @Column({nullable: true})
//     age: number;

//     @OneToMany(()=> Employee, (employee)=> employee.department)
//     employee: Employee;
// }

// export default Department;