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
    gradeNumber= prompt("Enter a number in the range 0-100: ");
    
    // verify if input is actually a number and lies in the range 0-100
    if(isFinite(gradeNumber) && parseInt(gradeNumber) <= 100){
        console.log(parseInt(gradeNumber))
        break;
    }

}



// finally get our grade from the gradegenerator function
let mygrade=gradeGenerator(parseInt(gradeNumber));

// print my result
console.log(`Your grade is ${mygrade}`);
