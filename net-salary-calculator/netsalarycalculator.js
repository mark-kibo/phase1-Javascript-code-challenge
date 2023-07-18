// import my prompt method to allow node to ask for input
const prompt = require('prompt-sync')({sigint: true});


// create function that calculates payee tax nhif , nssf deductions, net salary
function netSalaryCalculator(basicSalary, benefits){
    // create a fixed variable for first tax of salary above 24000, insurance rate, secondtax rate and personalreleif
    const firstTax=2400;
    const secondTaxRate =0.25;
    const thirdTaxRate = 0.3;
    const personalRelief=2400;
    let nhifRelief= 0;
    let payeeTax =0;
    let netSalary=0;
    let grossSalary;
    let result={};

    // get my gross salary which is basic salary + benefits
    grossSalary = basicSalary + benefits;

    // get my contributions nssf and nhif
    let nssfContribution =getNssfContribution(grossSalary);
    let nhifContribution=getNhifContribution(grossSalary);

    // calculate taxable income
    let taxableIncome= grossSalary - nssfContribution;
    
    // check if salary is > 24000
    if(basicSalary > 24000){
        // set values to use
        nhifRelief=getNhifInsuranceRelief(grossSalary);
        let firstPayeeTax = 2400;
        let secondPayeeTax;
        let thirdPayeeTax;
        let thirdTax;

        // calculate first and second tax
        let secondTax = (taxableIncome - 24000 );
        if (secondTax > 8333){
            secondPayeeTax = 8333 * secondTaxRate;
            thirdTax = secondTax -8333;
            thirdPayeeTax = thirdTax * thirdTaxRate;
            finalTax = firstPayeeTax +secondPayeeTax + thirdPayeeTax;
        }else{
            secondPayeeTax = secondTax * secondTaxRate;
            finalTax= firstPayeeTax + secondPayeeTax;
        }

        // minus deductions 
        payeeTax= (finalTax - personalRelief) - nhifRelief;
        // get net pay
        netSalary =grossSalary -(nssfContribution + payeeTax + nhifContribution);

        result = Object.assign({}, {"PAYE ":payeeTax, 
                                    "NSSF CONTRIBUTION":nssfContribution, 
                                    "NHIF CONTRIBUTION": nhifContribution,
                                    "NHIF RELIEF":nhifRelief,
                                    "NET SALARY": netSalary});

    }else{
        // get net pay
        netSalary = grossSalary -(nssfContribution +  nhifContribution);
        if (Number.isInteger(netSalary)){
        }else{
            netSalary=0;
        }

        result = Object.assign({}, {"PAYE ":payeeTax, 
        "NSSF CONTRIBUTION":nssfContribution, 
        "NHIF CONTRIBUTION": nhifContribution,
        "NHIF RELIEF":nhifRelief,
        "NET SALARY": netSalary})
        
    }


    // get our netsalary calculator results
    return result;

}



// set Nssf rate based on the new rate
function getNssfContribution(grossSalary){
    let nssfRelief;
    if(grossSalary > 18000){
        nssfRelief = 18000 * 0.06;
    }else{
        nssfRelief =  grossSalary * 0.06;
    }
    return nssfRelief;
}


// return nhif based on nhif rate table
function getNhifContribution(grossSalary){
    let amount;
    if (grossSalary >= 5999 && grossSalary <= 7999) {
        amount = 300;
    } else if (grossSalary >= 8000 && grossSalary <= 11999) {
        amount = 400;
    } else if (grossSalary >= 12000 && grossSalary <= 14999) {
        amount = 500;
    } else if (grossSalary >= 15000 && grossSalary <= 19999) {
        amount = 600;
    } else if (grossSalary >= 20000 && grossSalary <= 24999) {
        amount = 750;
    } else if (grossSalary >= 25000 && grossSalary <= 29999) {
        amount = 850;
    } else if (grossSalary >= 30000 && grossSalary <= 34999) {
        amount = 900;
    } else if (grossSalary >= 35000 && grossSalary <= 39999) {
        amount = 950;
    } else if (grossSalary >= 40000 && grossSalary <= 44999) {
        amount = 1000;
    } else if (grossSalary >= 45000 && grossSalary <= 49999) {
        amount = 1100;
    } else if (grossSalary >= 50000 && grossSalary <= 59999) {
        amount = 1200;
    } else if (grossSalary >= 60000 && grossSalary <= 69999) {
        amount = 1300;
    } else if (grossSalary >= 70000 && grossSalary <= 79999) {
        amount = 1400;
    } else if (grossSalary >= 80000 && grossSalary <= 89999) {
        amount = 1500;
    } else if (grossSalary >= 90000 && grossSalary <= 99999) {
        amount = 1600;
    } else if (grossSalary >= 100000) {
        amount = 1700;
    }else{
        amount=150;
    }

    return amount;
    
}


// calculate nhif relief using the current rate 0.15 of nhif contribution

function getNhifInsuranceRelief(salary){
    let nhifContribution= getNhifContribution(salary);
    let relief = 0.15 * nhifContribution;

    return relief;
}




// get user input
let basicSalary;
let benefits = 0;
// create a while loop to prompt user for a salary.Breaks if the user inputs a number otherwise, it continues
while(true){
    basicSalary= parseInt(prompt("Enter gross salary: "));
    benefits= parseInt(prompt("Enter benefits: "));
    
    // verify if input is actually a number and the number is a positive value
    if(Number.isInteger(basicSalary) && basicSalary >= 0){
        console.log(`This is the ${basicSalary}`);
        break;
    }

}


// finally call the netsalary calculator function and pass in my salary

let output=netSalaryCalculator(basicSalary, benefits);
console.log(output);
