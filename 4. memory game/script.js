// Global variables
let score = 0;
const images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png', 'image9.png', 'image10.png'];
const cardsContainer = document.getElementById('cards');

// Function to create a card with an image
const createCard = (image) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = image;
    card.appendChild(img);
    cardsContainer.appendChild(card);

    card.addEventListener('click', () => handleCardClick(card));
};

// Event listeners for level buttons
const levels = document.querySelectorAll('.level');
levels.forEach(level => {
    level.addEventListener('click', () => {
        const numOfCards = level.dataset.cards;
        resetGame(numOfCards);
    });
});

// Function to reset the game
function resetGame(numOfCards) {
    cardsContainer.innerHTML = '';

    const selectedImages = images.slice(0, numOfCards / 2);

    const duplicatedImages = [...selectedImages, ...selectedImages];
    duplicatedImages.sort(() => 0.5 - Math.random());

    duplicatedImages.forEach(image => {
        createCard(image);
    });

    score = 0;
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}


// Function to handle card clicks
function handleCardClick(clickedCard) {
    const flippedCards = document.querySelectorAll('.flipped');
    const matchedCards = document.querySelectorAll('.card.matched');

    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped') && matchedCards.length < images.length) {
        if (!clickedCard.classList.contains('matched')) {
            clickedCard.classList.add('flipped');
            const flippedCards = document.querySelectorAll('.flipped');

            if (flippedCards.length === 2) {
                const [firstCard, secondCard] = flippedCards;
                if (firstCard.innerHTML === secondCard.innerHTML) {
                    score += 10;
                    setTimeout(() => {
                        flippedCards.forEach(card => card.classList.add('matched'));
                        flippedCards.forEach(card => card.classList.remove('flipped'));
                        checkWin();
                    }, 500);
                } else {
                    if(score > 0){
                        score -= 5;
                    }
                    setTimeout(() => {
                        document.querySelectorAll('.card:not(.matched)').forEach(card => card.classList.remove('flipped'));
                    }, 1000);
                }
            }
        }
    }

    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

// Function to check if the player has won
function checkWin() {
    const matchedCards = document.querySelectorAll('.card.matched');
    const resultCard = document.querySelectorAll('.card');
    const cardsContainer = document.getElementById('cards');

    if (matchedCards.length === resultCard.length) {
        cardsContainer.style.display = 'none'; // Hide the game board
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML += `<p>Congratulations! You won! Your score is ${score}</p>`;
    }
}
