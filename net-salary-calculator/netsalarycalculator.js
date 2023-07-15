// create function that calculates payee tax nhif , nssf deductions, net salary
function netSalaryCalculator(basicSalary){
    // create a fixed variable for first tax of salary above 24000, insurance rate, secondtax rate and personalreleif
    const firstTax=2400;
    const secondTaxrate =0.25;
    const personalRelief=2400;
    let nssfContribution =getNssfContribution(basicSalary);
    let nhifContribution=getNhifContribution(basicSalary);
    let nhifRelief= 0;
    let payeeTax =0;
    let netSalary=0;
    let result={};


    // calculate taxable income
    let taxableIncome= basicSalary - nssfContribution;
    
    // check if salary is > 24000
    if(basicSalary > 24000){
        // set values to use
        nhifRelief=getNhifInsuranceRelief(basicSalary);

        // calculate first and second tax
        let secondTax = (taxableIncome - 24000 ) * secondTaxrate;
        let finalTax= firstTax + secondTax;

        // minus deductions 
        payeeTax= (finalTax - personalRelief) - nhifRelief;
        // get net pay
        netSalary =basicSalary -(nssfContribution + payeeTax + nhifContribution);

        result = Object.assign({}, {"PAYE ":payeeTax, 
                                    "NSSF CONTRIBUTION":nssfContribution, 
                                    "NHIF CONTRIBUTION": nhifContribution,
                                    "NHIF RELIEF":nhifRelief,
                                    "NET SALARY": netSalary});

    }else{
        // get net pay
        netSalary = basicSalary -(nssfContribution - nhifContribution);
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
function getNssfContribution(basicSalary){
    let nssfRelief;
    if(basicSalary > 18000){
        nssfRelief = 18000 * 0.06;
    }else{
        nssfRelief =  basicSalary * 0.06;
    }
    return nssfRelief;
}


// return nhif based on nhif rate table
function getNhifContribution(basicSalary){
    let amount;
    if (basicSalary >= 5999 && basicSalary <= 7999) {
        amount = 300;
    } else if (basicSalary >= 8000 && basicSalary <= 11999) {
        amount = 400;
    } else if (basicSalary >= 12000 && basicSalary <= 14999) {
        amount = 500;
    } else if (basicSalary >= 15000 && basicSalary <= 19999) {
        amount = 600;
    } else if (basicSalary >= 20000 && basicSalary <= 24999) {
        amount = 750;
    } else if (basicSalary >= 25000 && basicSalary <= 29999) {
        amount = 850;
    } else if (basicSalary >= 30000 && basicSalary <= 34999) {
        amount = 900;
    } else if (basicSalary >= 35000 && basicSalary <= 39999) {
        amount = 950;
    } else if (basicSalary >= 40000 && basicSalary <= 44999) {
        amount = 1000;
    } else if (basicSalary >= 45000 && basicSalary <= 49999) {
        amount = 1100;
    } else if (basicSalary >= 50000 && basicSalary <= 59999) {
        amount = 1200;
    } else if (basicSalary >= 60000 && basicSalary <= 69999) {
        amount = 1300;
    } else if (basicSalary >= 70000 && basicSalary <= 79999) {
        amount = 1400;
    } else if (basicSalary >= 80000 && basicSalary <= 89999) {
        amount = 1500;
    } else if (basicSalary >= 90000 && basicSalary <= 99999) {
        amount = 1600;
    } else if (basicSalary >= 100000) {
        amount = 1700;
    }else{
        amount=150;
    }

    return amount;
    
}


// calculate nhif relief using the current rate 0.15 of nhif contribution

function getNhifInsuranceRelief(basicSalary){
    let nhifContribution= getNhifContribution(basicSalary);
    let relief = 0.15 * nhifContribution;

    return relief;
}




// get user input
let grossSalary;
// create a while loop to prompt user for a salary.Breaks if the user inputs a number otherwise, it continues
while(true){
    grossSalary= parseInt(prompt("Enter gross salary: "));
    
    // verify if input is actually a number and the number is a positive value
    if(Number.isInteger(grossSalary) && grossSalary >= 0){
        console.log(grossSalary);
        break;
    }

}


// finally call the netsalary calculator function and pass in my salary

let output=netSalaryCalculator(grossSalary);
console.log(output);