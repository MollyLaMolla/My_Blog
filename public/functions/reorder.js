const cardContainer = document.querySelector('.card-container');
const cards = Array.from(cardContainer.children);
cards.reverse().forEach(card => cardContainer.appendChild(card));