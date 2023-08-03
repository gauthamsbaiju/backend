import { IsNotEmpty, IsNumber, IsString, ValidateNested, isString } from "class-validator";

class DeleteEmployeeDto{
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export default DeleteEmployeeDto;