import { IsNotEmpty, IsString, isString } from "class-validator";
import Employee from "../entity/employee.entity";

class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1:string;

    @IsNotEmpty()
    @IsString()
    pincode:string;

}

export default CreateAddressDto;