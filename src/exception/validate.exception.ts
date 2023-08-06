import { ValidationError } from "class-validator";
import HttpException from "./http.exception";

class ValidateException extends HttpException{
    public errors: object;
    constructor(errors:ValidationError[]){
        super(400, "Validation Exception");
        this.errors = this.createError(errors);
    }
    createError(error: ValidationError[]): object{

        let err = new Object;
        for(const e in error){
            const prop = error[e].property;
            if(error[e].children.length!=0){
                err[prop] = this.createError(error[e].children);
 
            }
            else{
                err[prop]=Object.values(error[e].constraints);
            }
            console.log(e);
        }
        
        return err;
    }
}

export default ValidateException;