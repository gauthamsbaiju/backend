import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, ValidateNested, isString } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";
import UpdateAddressDto from "./update-address.dto";
import { Role } from "../utils/role.enum";

class UpdateEmployeeDto{

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    joiningDate: string;


    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    experience: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    department: number;


    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(()=> UpdateAddressDto)
    address: Address;
}

export default UpdateEmployeeDto;