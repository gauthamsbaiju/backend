import { IsEnum, IsNotEmpty, IsString, ValidateNested, isString } from "class-validator";

class UpdateDepartmentDto{
    @IsNotEmpty()
    @IsString()
    name: string;
}


export default UpdateDepartmentDto;