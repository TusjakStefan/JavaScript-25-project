let minutes = 5;
let seconds = 0;
let timer;
let isCounting = false;

function updateCountdown() {
    const countdownElement = document.getElementById('minutes');
    countdownElement.textContent = minutes.toString().padStart(2, '0');
    
    const secondsElement = document.getElementById('seconds');
    secondsElement.textContent = seconds.toString().padStart(2, '0');

    if (minutes === 0 && seconds === 0) {
        if (!isCounting) {
            alert('Čas vypršel!');
            return;
        }
        clearInterval(timer);
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    }
}

function setCountdown(event) {
    event.preventDefault();
    const userInput = document.getElementById('minutesInput').value;
    if (userInput && userInput > 0) {
        minutes = parseInt(userInput, 10);
        seconds = 0;
        updateCountdown();
        isCounting = false;
        clearInterval(timer);
    }
}

function startCountdown() {
    if (!isCounting) {
        isCounting = true;
        timer = setInterval(updateCountdown, 1000);
    }
}

document.getElementById('countdownForm').addEventListener('submit', setCountdown);
document.getElementById('startButton').addEventListener('click', startCountdown);

updateCountdown();
