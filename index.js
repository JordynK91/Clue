
//sets up game cards


var roomArray = ['Hall', 'Study', 'Library', 'Billard Room', 'Conservatory', 'Ballroom', 'Kitchen', 'Dining Room', 'Lounge']
var charArray = ['Miss Scarlet', 'Colonel Mustard', 'Mrs. White', 'Mrs. Peacock', 'Professor Plum']
var weaponArray = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench', 'JavaScript']
var playerCards = []
var computer1Cards = []
var computer2Cards = []

//dice and player pieces 
var dice = document.getElementById('dice')
var playerPiece = document.getElementById('playerPiece')
var computer1Piece = document.getElementById('computer1Piece')
var computer2Piece = document.getElementById('computer2Piece')

var board = document.getElementById('board')

//rooms 

var hall = board.rows[0].cells[1]
var study = board.rows[0].cells[0]
var library = board.rows[1].cells[0]
var lounge = board.rows[1].cells[3]
var billardRoom = board.rows[2].cells[0]
var diningRoom = board.rows[2].cells[3]
var conservatory = board.rows[3].cells[0]
var ballRoom = board.rows[3].cells[2]
var kitchen = board.rows[3].cells[3]
var rooms = [hall, study, library, lounge, billardRoom, diningRoom, conservatory, ballRoom, kitchen]

// deal the cards
var start = document.getElementById('start')
start.addEventListener("click", dealing);
start.addEventListener('click', setPieces)

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

	//reamining cards are shuffled and distributed to the players
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

// player's cards are displayed
	for (i = 0; i<playerCards.length; i++){
		var card = document.createElement('div')
		var value = document.createElement('div')
		card.className = 'card'
		value.className = 'value'
		value.innerHTML = playerCards[i]
		card.appendChild(value);
		document.getElementById("cardContainer").appendChild(card);
	}


//computer1's cards are displayed 
for (i = 0; i<computer1Cards.length; i++){
		var card = document.createElement('div')
		var value = document.createElement('div')
		card.className = 'card'
		value.className = 'value'
		value.innerHTML = computer1Cards[i]
		card.appendChild(value);
		document.getElementById("computer1cardContainer").appendChild(card);
	}

//computer2's cards are displayed
for (i = 0; i<computer2Cards.length; i++){
		var card = document.createElement('div')
		var value = document.createElement('div')
		card.className = 'card'
		value.className = 'value'
		value.innerHTML = computer2Cards[i]
		card.appendChild(value);
		document.getElementById("computer2cardContainer").appendChild(card);
	}
}



// roll dice
dice.addEventListener("click", rollDice)

function rollDice(){
	var roll = _.random([lower=1], [upper=6])
	console.log(roll)

}

function setPieces(){
	hall.appendChild(playerPiece)
	conservatory.appendChild(computer1Piece)
	diningRoom.appendChild(computer2Piece)
}


function move(){
	var currentLocation = playerPiece.parentElement
	// var row = currentLocation.parentElement.rowIndex
	// var cell = currentLocation.cellIndex
	var roll = _.random([lower=1], [upper=6])
	if (roll = 1) {
			hallOptions = [study]
			studyOptions = [hall, library]
			libraryOptions = [study, billardRoom]
			billardRoomOptions = [library, conservatory]
			conservatoryOptions = [billardRoom]
			ballRoomOptions = [kitchen]
			kitchenOptions = [diningRoom, ballRoom]
			diningRoomOptions = [lounge, kitchen]
			loungeOptions = [diningRoom]
	if (roll = 2){
			hallOptions = [study, library]
			studyOptions = [hall, library, billardRoom]
			libraryOptions = [study, billardRoom, hall, conservatory]
			billardRoomOptions = [library, conservatory, study]
			conservatoryOptions = [billardRoom, library, ballRoom]
			ballRoomOptions = [kitchen, diningRoom, conservatory]
			kitchenOptions = [diningRoom, ballRoom, lounge]
			diningRoomOptions = [lounge, kitchen, ballRoom]
			loungeOptions = [diningRoom, kitchen]
		}
	if (roll = 3){
			hallOptions = [study, library, billardRoom, lounge]
			studyOptions = [hall, library, billardRoom, conservatory]
			libraryOptions = [study, billardRoom, hall, conservatory, lounge]
			billardRoomOptions = [library, conservatory, study, hall, ballRoom, diningRoom]
			conservatoryOptions = [billardRoom, library, ballRoom, kitchen, study]
			ballRoomOptions = [kitchen, diningRoom, conservatory, lounge, billardRoom]
			kitchenOptions = [diningRoom, ballRoom, lounge, conservatory]
			diningRoomOptions = [lounge, kitchen, ballRoom]
			loungeOptions = [diningRoom, kitchen, hall, ballRoom]
		}

		if (roll = 4){
			hallOptions = [study, library, billardRoom, lounge, conservatory, ballRoom, diningRoom]
			studyOptions = [hall, library, billardRoom, conservatory, lounge]
			libraryOptions = [study, billardRoom, hall, conservatory, lounge, diningRoom, ballRoom]
			billardRoomOptions = [lounge, library, conservatory, study, hall, ballRoom, diningRoom, kitchen]
			conservatoryOptions = [billardRoom, library, ballRoom, kitchen, study, hall, diningRoom]
			ballRoomOptions = [kitchen, diningRoom, conservatory, lounge, billardRoom, library, hall]
			kitchenOptions = [diningRoom, ballRoom, lounge, conservatory, billiardRoom]
			diningRoomOptions = [lounge, kitchen, ballRoom, hall, conservatory, library]
			loungeOptions = [diningRoom, kitchen, hall, ballRoom, study, billiardRoom]
		}

		if (roll = 5 )
			hallOptions = [kitchen, study, library, billardRoom, lounge, conservatory, ballRoom, diningRoom]
			studyOptions = [diningRoom, ballRoom, hall, library, billardRoom, conservatory, lounge]
			libraryOptions = [kitchen, study, billardRoom, hall, conservatory, lounge, diningRoom, ballRoom]
			billardRoomOptions = [library, conservatory, study, hall, ballRoom, diningRoom, kitchen, lounge]
			conservatoryOptions = [billardRoom, library, ballRoom, kitchen, study, hall, diningRoom, lounge]
			ballRoomOptions = [kitchen, diningRoom, conservatory, lounge, billardRoom, library, study, hall]
			kitchenOptions = [diningRoom, ballRoom, lounge, conservatory, billiardRoom, library, hall]
			diningRoomOptions = [lounge, kitchen, ballRoom, hall, conservatory, billardRoom, study, library]
			loungeOptions = [conservatory, diningRoom, kitchen, hall, ballRoom, study, billiardRoom, library]
		}	


		if (roll = 5 )
			hallOptions = [kitchen, study, library, billardRoom, lounge, conservatory, ballRoom, diningRoom]
			studyOptions = [kitchen, diningRoom, ballRoom, hall, library, billardRoom, conservatory, lounge]
			libraryOptions = [kitchen, study, billardRoom, hall, conservatory, lounge, diningRoom, ballRoom]
			billardRoomOptions = [library, conservatory, study, hall, ballRoom, diningRoom, kitchen, lounge]
			conservatoryOptions = [billardRoom, library, ballRoom, kitchen, study, hall, diningRoom, lounge]
			ballRoomOptions = [kitchen, diningRoom, conservatory, lounge, billardRoom, library, study, hall]
			kitchenOptions = [study, diningRoom, ballRoom, lounge, conservatory, billiardRoom, library, hall]
			diningRoomOptions = [lounge, kitchen, ballRoom, hall, conservatory, billardRoom, study, library]
			loungeOptions = [conservatory, diningRoom, kitchen, hall, ballRoom, study, billiardRoom, library]
		}	
}



