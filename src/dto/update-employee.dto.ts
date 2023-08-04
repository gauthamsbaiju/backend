import { IsNotEmpty, IsNumber, IsNumberString, IsString, ValidateNested, isString } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";
import UpdateAddressDto from "./update-address.dto";

class UpdateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(()=> UpdateAddressDto)
    address: Address;

    // @IsNotEmpty()
    // @IsNumberString()
    // id: number;
}

export default UpdateEmployeeDto;