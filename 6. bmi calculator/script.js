function calculateBMI() {
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;
    var gender = document.getElementById('gender').value;
    
    if (weight > 0 && height > 0) {
        var bmi = weight / ((height / 100) * (height / 100));
        var interpretation = interpretBMI(bmi, gender);
        document.getElementById('result').innerHTML = bmi.toFixed(2);
        document.getElementById('interpretation').innerHTML = interpretation;
    } else {
        alert("Please enter valid values for weight and height.");
    }
}

function interpretBMI(bmi, gender) {
    if (gender === 'male') {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    } else if (gender === 'female') {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    }
}
