import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import Department from "./department.entity";
import AbstractEntity from "./adstract-entity";
import Role from "../utils/role.enum";

@Entity("employees")
class Employee extends AbstractEntity{

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({nullable: true})
    age: number;

    @OneToOne(()=>Address, (address)=>address.employee, {cascade: true})
    address: Address;

    @Column()
    password: string;

    @Column({default: Role.DEVELOPER})
    role: Role;

    @ManyToOne(()=>Department, (department)=> department.employee)
    @JoinColumn()
    department: Department;
}

export default Employee; 