import { IsNotEmpty, IsNumber, IsNumberString, IsString, ValidateNested, isString } from "class-validator";

class DeleteEmployeeDto{
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}

export default DeleteEmployeeDto;