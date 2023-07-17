// import my prompt method to allow node to ask for input
const prompt = require('prompt-sync')({sigint: true});

// create a function that takes in speed as argument and returns points if speed > 70
// returns ok if speed  < 70  and finally will return license suspende if points > 12

const speedDetector=(speed)=>{
    let points;

    // perform check of speed
    if (speed < 70){
        return "Ok";
    }else{
        // divide the exceeded speed by five since a demerit point is given on every 5km/s of exceed limit
        let demeritPoints=(speed-70)/5;
        // perform a check to see if the points is a whole number, if not rounddown the points
        if (Number.isInteger(points)){
            points=demeritPoints
        }else{
            points =Math.floor(demeritPoints);
        }
        // perform a check of points to see if its greater than 12

        if (points > 12){
            return "License suspended";
        }else{
            return points;
        }

    }
}



// create variable that wll store my input
let speed;

// create a while loop to prompt user for a number.Breaks if the user inputs a number otherwise, it continues
while(true){
    speed= parseInt(prompt("Enter speed: "));
    
    // verify if input is actually a number and the number is a positive value since speed cant be a negative value
    if(Number.isInteger(speed) && speed >= 0){
        console.log(speed);
        break;
    }

}


// finally call the speed detector function and pass in my speed

let output=speedDetector(speed);
console.log(output);