import { IsNotEmpty, IsString, isString } from "class-validator";
import Employee from "../entity/employee.entity";

class UpdateAddressDto{
    @IsNotEmpty()
    @IsString()
    line1:string;

    @IsNotEmpty()
    @IsString()
    pincode:string;

}

export default UpdateAddressDto;