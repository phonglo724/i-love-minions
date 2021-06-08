const minionURL = "http://localhost:3000/minions"

const minionCard = document.querySelector("#minion-container")
const minionCreate = document.querySelector(".minion-create")

fetch(minionURL)
    .then(response => response.json())
    .then(minions => renderMinions(minions))

function renderMinions(minions){
    minions.forEach(displayMinions)
}

function displayMinions(minion){
    const minionName = document.createElement('h2')
    const minionImage = document.createElement('img')
    const minionQuote = document.createElement('h3')
    const minionCuteness = document.createElement('h4')

    minionName.textContent = `${minion.name}` 
    minionImage.src = minion.image 
    minionQuote.textContent = `Quote: ${minion.quote}`
    minionCuteness.textContent = `Cuteness: ${minion.cuteness}` 
    
    minionCard.append(minionName, minionImage, minionQuote, minionCuteness)
}

minionCreate.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const name = formData.get('name')
    const image = formData.get('image')
    const quote = formData.get('quote')
    const cuteness = formData.get('cuteness')

    const newMinion = {
        name: name,
        image: image,
        quote: quote,
        cuteness: cuteness
    }

    fetch(minionURL, {
        method: 'POST',
        body: JSON.stringify(newMinion),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(displayMinions)
})
