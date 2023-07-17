// import my prompt method to allow node to ask for input
const prompt = require('prompt-sync')({sigint: true});

// create a function that returns grade based on the grade number
const gradeGenerator = (number)=>{
    // declare our constant grades and our result
    const grades=["A", "B", "C", "D", "E"] 
    let result;

    // dynamically return a result which is A||B||C||D||E 
    if(number > 79){
        result= grades[0];
    }else if(number >= 60 && number <= 79){
        result= grades[1]
    }else if(number > 49 && number <= 59){
        result= grades[2]
    }else if(number >= 40 && number <= 49){
        result= grades[3];
    }else{
        result= grades[4]
    }
    // return our final grade
    return result;
}

// create variable that wll store my input
let gradeNumber;

// create a while loop to prompt user for a number.Breaks if the user inputs a number otherwise, it continues
while(true){
    gradeNumber= parseInt(prompt("Enter a number in the range 0-100: "));
    
    // verify if input is actually a number, lies in the range 0-100 and the number is a positive value
    if(Number.isInteger(gradeNumber) && gradeNumber <= 100 && gradeNumber >= 0){
        break;
    }

}



// finally get our grade from the gradegenerator function
let mygrade=gradeGenerator(gradeNumber);

// print my result
console.log(`Your grade is ${mygrade}`);
