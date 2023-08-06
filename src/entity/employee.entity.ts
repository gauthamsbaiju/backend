import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import Department from "./department.entity";
import AbstractEntity from "./adstract-entity";
import {Role} from "../utils/role.enum";

@Entity("employees")
class Employee extends AbstractEntity{

    @Column()
    name: string;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    joiningDate: string;

    @Column()
    experience: number;

    @ManyToOne(()=>Department, (department)=> department.employee)
    @JoinColumn()
    department: Department;

    @Column()
    role: Role;

    @Column({default: true})
    isActive: boolean;

    @OneToOne(()=>Address, (address)=>address.employee, {cascade: true})
    address: Address;

}

export default Employee; 