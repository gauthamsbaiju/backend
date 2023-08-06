import { IsEnum, IsNotEmpty, IsString, ValidateNested, isString } from "class-validator";

class CreateDepartmentDto{
    @IsNotEmpty()
    @IsString()
    name: string;
}


export default CreateDepartmentDto;