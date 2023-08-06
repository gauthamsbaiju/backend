import HttpException from "../exception/http.exception";
import ValidateException from "../exception/validate.exception";

class DataFormat{
    public  data: object[];
    public errors: Error | HttpException | ValidateException;
    public message: string;
    public meta:{
        length:number,
        took:number,
        total:number,
    };

    constructor(data: Object[], errors:Error, message:string){
        this.data = data;
        this.errors = errors;
        if(errors === null)
            this.message = message;
        else
        this.message = errors.message;
        this.meta = {
            length : data.length,
            took : data.length,
            total: data.length,
        }
        
        
    }
}

export default DataFormat;