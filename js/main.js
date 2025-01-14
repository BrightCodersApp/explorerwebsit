// JavaScript for Merge Explorer Web

// Alert on clicking Activity Cards (for demonstration purposes)
document.addEventListener('DOMContentLoaded', () => {
    const activityCards = document.querySelectorAll('.activity-card a');
    activityCards.forEach(card => {
        card.addEventListener('click', (event) => {
            alert('You clicked on an activity! This will link to the activity page.');
        });
    });
});

// Alert on clicking World Cards (for demonstration purposes)
const worldCards = document.querySelectorAll('.world-card a');
worldCards.forEach(card => {
    card.addEventListener('click', (event) => {
        alert('You clicked on a world! This will link to the world page.');
    });
});

// Simple Quiz Interaction Example
const quizButton = document.querySelector('.start-quiz .cta-button');
if (quizButton) {
    quizButton.addEventListener('click', () => {
        alert('Redirecting to the quiz page...');
    });
}

// Dynamic Content Loading for World View (Optional for Future Enhancement)
const urlParams = new URLSearchParams(window.location.search);
const worldType = urlParams.get('world');

if (worldType) {
    const worldTitle = document.querySelector('h2');
    const worldDescription = document.querySelector('.world-description p');

    switch (worldType) {
        case 'space':
            worldTitle.innerText = "Explore the Space World";
            worldDescription.innerText = "Discover the vast universe, planets, and stars in this interactive world.";
            break;
        case 'eco':
            worldTitle.innerText = "Explore the Eco World";
            worldDescription.innerText = "Learn about ecosystems and how living things interact in nature.";
            break;
        case 'human':
            worldTitle.innerText = "Explore the Human Body World";
            worldDescription.innerText = "Explore human anatomy and learn about different body organs.";
            break;
        default:
            worldTitle.innerText = "Explore a New World!";
            worldDescription.innerText = "Select a world to explore its features and interactive content.";
            break;
    }
}
