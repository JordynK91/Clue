
//sets up game cards


var roomArray = ['Hall', 'Study', 'Library', 'Billard Room', 'Conservatory', 'Ballroom', 'Kitchen', 'Dining Room', 'Lounge']
var charArray = ['Miss Scarlet', 'Colonel Mustard', 'Mrs. White', 'Mrs. Peacock', 'Professor Plum']
var weaponArray = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench', 'JavaScript']
var playerCards = []
var computer1Cards = []
var computer2Cards = []
var start = document.getElementById('start')
var cardContainer= document.getElementById("cards")

//select room, charecter, weapon for envelope 
function dealing(){
	var roomEnvelope = roomArray[Math.floor(Math.random() * roomArray.length)];
	var charEnvelope = charArray[Math.floor(Math.random() * charArray.length)];
	var weaponEnvelope = weaponArray[Math.floor(Math.random() * charArray.length)];

	// remove enevelope cards from the deck
	var roomEnvelopeIndex = roomArray.indexOf(roomEnvelope)
		roomArray.splice(roomEnvelopeIndex, 1)
	var charEnvelopeIndex = charArray.indexOf(charEnvelope)
		charArray.splice(charEnvelopeIndex, 1)
	var weaponEnvelopeIndex = weaponArray.indexOf(weaponEnvelope)
		weaponArray.splice(weaponEnvelopeIndex, 1)

	//reamining cards are shuffled and distributed
	var cardArray = _.shuffle(roomArray.concat(charArray, weaponArray)) 
	for (i=0; i<cardArray.length; i++){
		if (i < 6){
			playerCards.push(cardArray[i])
		}
		else if (i < 12){
			computer1Cards.push(cardArray[i])
		}
		else {
			computer2Cards.push(cardArray[i])
		}
	}	
}


start.addEventListener("click", renderCards);

function renderCards(){
	for (i = 0; i<playerCards; i++){
		var card = document.createElement('div')
		card.className = 'card'
		cardContainer.appendChild(card);

	}
}


// roll dice
function dice(){
	return(_.random([lower=1], [upper=6]))
}

