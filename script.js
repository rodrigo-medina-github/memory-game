let flippedCards = []
let matchedPairs = 0
let attempts = 0
let isCheckingPair = false
let gameOver = false

const cardItems = [
    { id: 1, content: "🥸", matched: false},
    { id: 2, content: "🥸", matched: false},
    { id: 3, content: "🧐", matched: false},
    { id: 4, content: "🧐", matched: false},
    { id: 5, content: "😎", matched: false},
    { id: 6, content: "😎", matched: false},
    { id: 7, content: "😣", matched: false},
    { id: 8, content: "😣", matched: false},
    { id: 9, content: "🤓", matched: false},
    { id: 10, content: "🤓", matched: false},
    { id: 11, content: "🥵", matched: false},
    { id: 12, content: "🥵", matched: false},
    { id: 13, content: "👺", matched: false},
    { id: 14, content: "👺", matched: false},
    { id: 15, content: "👻", matched: false},
    { id: 16, content: "👻", matched: false},
]

function shuffleCards(array) {
    const shuffled = [...array]

    for(let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        let temporaryVariable = shuffled[i]
        shuffled[i] = shuffled[j]
        shuffled[j] = temporaryVariable

    }
    return shuffled
}


function createCard(card) {
    const cardElement = document.createElement("div")
    cardElement.className = "card"

    //cria o elemento emoji
    const emoji = document.createElement("span")
    emoji.className = "card-emoji"
    emoji.textContent = card.content

    //adiciona o emoji ao card
    cardElement.appendChild(emoji)

    //adiciona o evento de clique na carta
    cardElement.addEventListener("click", () => handleCardClick(cardElement, card))
    
    return cardElement
}

function renderCards() {
    const deck = document.getElementById("deck")
    deck.innerHTML = ""


    const cards = shuffleCards(cardItems)
    cards.forEach((i) => {
        const cardElement = createCard(i)
        deck.appendChild(cardElement)
    })
}

function handleCardClick(cardElement, card){
    if(
        gameOver || isCheckingPair || cardElement.classList.contains("revealed")
    ) {
        return
    }

    cardElement.classList.add("revealed")


    flippedCards.push({cardElement, card})

    if(flippedCards.length === 2 ) {
        isCheckingPair = true

        attempts++

        const [firstCard, secondCard] = flippedCards

        if(firstCard.card.content === secondCard.card.content) {

            matchedPairs++

            if(matchedPairs === cardItems.length / 2) {
                gameOver = true
                document.getElementById("button").textContent = "play again"
                document.getElementById("win").style.display = "flex"
            }

            flippedCards = []
            isCheckingPair = false
            
        } else {
            setTimeout(() => {
                firstCard.cardElement.classList.remove("revealed")
                secondCard.cardElement.classList.remove("revealed")
                flippedCards = []
                isCheckingPair = false
            }, 1000)
        }

        updateStats()

    } 
}

function updateStats() {
    document.getElementById("stats").textContent = `${matchedPairs} pair revealed of ${attempts} attempts`
}


function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    isCheckingPair = false;
    renderCards()
    updateStats()
    gameOver = false
    document.getElementById("button").textContent = "Reset"
    document.getElementById("win").style.display = "none"
}

renderCards()
const button = document.getElementById("button").addEventListener("click", resetGame)
