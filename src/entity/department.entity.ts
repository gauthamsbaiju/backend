import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import Address from "./address.entity";
import Employee from "./employee.entity";

@Entity()
class Department{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({nullable: true})
    age: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(()=> Employee, (employee)=> employee.department)
    employee: Employee;
}

export default Department;