
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
var diceResult = dice_result.getElementById

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


function setPieces(){
	hall.appendChild(playerPiece)
	conservatory.appendChild(computer1Piece)
	diningRoom.appendChild(computer2Piece)
}


function rollDice(){
	var currentLocation = playerPiece.parentElement
	var roll = _.random([lower=1], [upper=6])

	if (roll === 1) {
		hallOptions = [study]
		studyOptions = [hall, library]
		libraryOptions = [study, billardRoom]
		billardRoomOptions = [library, conservatory]
		conservatoryOptions = [billardRoom]
		ballRoomOptions = [kitchen]
		kitchenOptions = [diningRoom, ballRoom]
		diningRoomOptions = [lounge, kitchen]
		loungeOptions = [diningRoom]
	}

	else if (roll === 2){
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

	else if (roll === 3){
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

	else if (roll === 4){
		hallOptions = [study, library, billardRoom, lounge, conservatory, ballRoom, diningRoom]
		studyOptions = [hall, library, billardRoom, conservatory, lounge]
		libraryOptions = [study, billardRoom, hall, conservatory, lounge, diningRoom, ballRoom]
		billardRoomOptions = [lounge, library, conservatory, study, hall, ballRoom, diningRoom, kitchen]
		conservatoryOptions = [billardRoom, library, ballRoom, kitchen, study, hall, diningRoom]
		ballRoomOptions = [kitchen, diningRoom, conservatory, lounge, billardRoom, library, hall]
		kitchenOptions = [diningRoom, ballRoom, lounge, conservatory, billardRoom]
		diningRoomOptions = [lounge, kitchen, ballRoom, hall, conservatory, library]
		loungeOptions = [diningRoom, kitchen, hall, ballRoom, study, billardRoom]
	}

	else if (roll === 5 ){
		hallOptions = [kitchen, study, library, billardRoom, lounge, conservatory, ballRoom, diningRoom]
		studyOptions = [diningRoom, ballRoom, hall, library, billardRoom, conservatory, lounge]
		libraryOptions = [kitchen, study, billardRoom, hall, conservatory, lounge, diningRoom, ballRoom]
		billardRoomOptions = [library, conservatory, study, hall, ballRoom, diningRoom, kitchen, lounge]
		conservatoryOptions = [billardRoom, library, ballRoom, kitchen, study, hall, diningRoom, lounge]
		ballRoomOptions = [kitchen, diningRoom, conservatory, lounge, billardRoom, library, study, hall]
		kitchenOptions = [diningRoom, ballRoom, lounge, conservatory, billardRoom, library, hall]
		diningRoomOptions = [lounge, kitchen, ballRoom, hall, conservatory, billardRoom, study, library]
		loungeOptions = [conservatory, diningRoom, kitchen, hall, ballRoom, study, billardRoom, library]
	}	


	else if (roll === 6 ){
		hallOptions = [kitchen, study, library, billardRoom, lounge, conservatory, ballRoom, diningRoom]
		studyOptions = [kitchen, diningRoom, ballRoom, hall, library, billardRoom, conservatory, lounge]
		libraryOptions = [kitchen, study, billardRoom, hall, conservatory, lounge, diningRoom, ballRoom]
		billardRoomOptions = [library, conservatory, study, hall, ballRoom, diningRoom, kitchen, lounge]
		conservatoryOptions = [billardRoom, library, ballRoom, kitchen, study, hall, diningRoom, lounge]
		ballRoomOptions = [kitchen, diningRoom, conservatory, lounge, billardRoom, library, study, hall]
		kitchenOptions = [study, diningRoom, ballRoom, lounge, conservatory, billardRoom, library, hall]
		diningRoomOptions = [lounge, kitchen, ballRoom, hall, conservatory, billardRoom, study, library]
		loungeOptions = [conservatory, diningRoom, kitchen, hall, ballRoom, study, billardRoom, library]
	}	


	if (currentLocation = hall){
		for (i=0; i<hallOptions.length; i++){
				hallOptions[i].style.backgroundColor = 'yellow'
				hallOptions[i].addEventListener('click', function(e){
					e.target.appendChild(playerPiece)
				})
			}
		}

	else if (currentLocation = study){
		for (i=0; i<studyOptions.length; i++){
				studyOptions[i].style.backgroundColor = 'yellow'
				studyOptions[i].addEventListener('click', function(e){
					e.target.appendChild(playerPiece)
				})
			}
		}

		else if (currentLocation = library){
			for (i=0; i<libraryOptions.length; i++){
				libraryOptions[i].style.backgroundColor = 'yellow'
				libaryOptions[i].addEventListener('click', function(e){
					e.target.appendChild(playerPiece)
				})
			}
		}

		else if (currentLocation = billardRoom){
			for (i=0; i<billardRoomOptions.length; i++){
				billardRoomOptions[i].style.backgroundColor = 'yellow'
				billardRoomOptions[i].addEventListener('click', function(e){
					e.target.appendChild(playerPiece)
				})
		}
	}

		else if (currentLocation = conservatory){
			for (i=0; i<conservatoryOptions.length; i++){
				conservatoryOptions[i].style.backgroundColor = 'yellow'
				conservatoryptions[i].style.backgroundColor = 'yellow'
				conservatoryOptions[i].addEventListener('click', function(e){
					e.target.appendChild(playerPiece)
			})
		}
	}

		else if (currentLocation = ballRoom){
			for (i=0; i<ballRoomOptions.length; i++){
				ballRoomOptions[i].style.backgroundColor = 'yellow'
				ballRoomOptions[i].addEventListener('click', function(e){
					e.target.appendChild(playerPiece)
			})
		}
	}

		else if (currentLocation = kitchen){
			for (i=0; i<kitchenOptions.length; i++){
				kitchenOptions[i].style.backgroundColor = 'yellow'
				kitchenOptions[i].addEventListener('click', function(e){
					e.target.appendChild(playerPiece)
			})
		}
	}

		else if (currentLocation = diningRoom){
			for (i=0; i<diningRoopmOptions.length; i++){
				diningRoomnOptions[i].style.backgroundColor = 'yellow'
				diningRoomOptions[i].addEventListener('click', function(e){
					e.target.appendChild(playerPiece)
			})
		}
	}

	else if (currentLocation = lounge){
		for (i=0; i<loungeOptions.length; i++){
				loungeOptions[i].style.backgroundColor = 'yellow'
				loungeOptions[i].addEventListener('click', function(e){
				e.target.appendChild(playerPiece)
			})

		}
	}
}





