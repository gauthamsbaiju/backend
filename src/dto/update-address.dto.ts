import { IsNotEmpty, IsOptional, IsString, isString } from "class-validator";
import Employee from "../entity/employee.entity";

class UpdateAddressDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address_line_1:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address_line_2:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    city:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    state:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    country:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    pincode:string;

}

export default UpdateAddressDto;