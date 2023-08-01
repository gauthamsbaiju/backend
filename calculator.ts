interface CalculatorInterface {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    remainder(a: number, b: number): number;
  };

  const calculator: CalculatorInterface = {
    add(a,b){
        console.log(a+'+'+b+'='+(a+b));
        return a + b;
    },
    subtract(a,b){
        console.log(a+'-'+b+'='+(a-b));
        return a - b;
    },
    multiply(a,b){
        console.log(a+'*'+b+'='+(a*b));
        return a * b;
    },
    divide(a,b){
        if(b!=0)
        {   
            console.log(a+'/'+b+'='+(a/b));
            return a / b;
        }
        else 
            console.log("Divison by zero not possible");
    },
    remainder(a,b){
        console.log(a+'%'+b+'='+(a%b));
        return a % b;
    },
  }

  const res1 = calculator.add(12,6);
  const res2 = calculator.subtract(12,6);
  const res3 = calculator.multiply(12,6);
  const res4 = calculator.divide(12,6);
  const res5 = calculator.remainder(12,6);