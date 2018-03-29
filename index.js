
//sets up turns
var turn = 'player';
var computerMoves ;


//sets up game cards
var roomArray = ['Hall', 'Study', 'Library', 'Billard Room', 'Conservatory', 'Ballroom', 'Kitchen', 'Dining Room', 'Lounge']
var charArray = ['Miss Scarlet', 'Mr. Green', 'Colonel Mustard', 'Mrs. White', 'Mrs. Peacock', 'Professor Plum']
var weaponArray = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench']
var playerCards = []
var computer1Cards = []
var computer2Cards = []

//dice and player pieces 
var dice = document.getElementById('dice')
var playerPiece = document.getElementById('playerPiece')
var computer1Piece = document.getElementById('computer1Piece')
var computer2Piece = document.getElementById('computer2Piece')

var board = document.getElementById('board')
var guessStorage = []

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
		value.id = playerCards[i] + 'value'
		value.innerHTML = playerCards[i]
		card.appendChild(value);
		document.getElementById("cardContainer").appendChild(card);
	}

		console.log(computer1Cards)
		console.log(computer2Cards)
//computer1's cards are displayed 
	for (i = 0; i<computer1Cards.length; i++){
		var card = document.createElement('div')
		var value = document.createElement('div')
		card.className = 'card'
		value.id = computer1Cards[i]+'value'
		// value.style.display = 'none'
		value.innerHTML = computer1Cards[i]
		card.appendChild(value);
		document.getElementById("computer1cardContainer").appendChild(card);
		document.getElementById(computer1Cards[i]+'value').style.display = 'none'
	}

//computer2's cards are displayed
	for (i = 0; i<computer2Cards.length; i++){
		var card = document.createElement('div')
		var value = document.createElement('div')
		card.className = 'card'
		value.id = computer2Cards[i]+'value'
		// value.style.display = 'none'
		value.innerHTML = computer2Cards[i]
		card.appendChild(value);
		document.getElementById("computer2cardContainer").appendChild(card);
		document.getElementById(computer2Cards[i]+'value').style.display = 'none'
	}

}

function clearCards(){
	for (i=0; i<computer1Cards.length; i++){
		document.getElementById(computer1Cards[i]+'value').style.display = 'none'
	}
	for (i=0; i<computer2Cards.length; i++){
		document.getElementById(computer2Cards[i]+'value').style.display = 'none'
	}
	for (i=0; i<playerCards.length; i++){
		document.getElementById(playerCards[i]+'value').style.backgroundColor = 'white'
	}
}


//when called switches whose turn it is. 
function turnHandlerPlayer(){
	    turn = 'computer1'
	    document.getElementById('messages').innerHTML = "it is computer1's turn"
	    window.setTimeout(clearCards, 3000)
	 	window.setTimeout(rollDice, 3000)

}


function turnHandlerComputer1(){
		turn = 'computer2'
		document.getElementById('messages').innerHTML = "it is computer2's turn"
		window.setTimeout(clearCards, 3000)
		window.setTimeout(rollDice, 3000)
}
	
function turnHandlerComputer2(){
		turn = 'player'
		window.setTimeout(clearCards, 3000)
		document.getElementById('messages').innerHTML = "it is your turn. roll the dice and take your turn"

}

dice.addEventListener("click", rollDice)

function setPieces(){
	hall.appendChild(playerPiece)
	conservatory.appendChild(computer1Piece)
	diningRoom.appendChild(computer2Piece)
}


function rollDice(){
	//where is the piece currently
	if (turn === 'player'){
		 currentLocation = playerPiece.parentElement
		 console.log(currentLocation)
	}
	else if (turn === 'computer1'){
		 currentLocation = computer1Piece.parentElement
	}
	else if (turn === 'computer2'){
		 currentLocation = computer2Piece.parentElement
	}
	//roll the die
	var roll = _.random([lower=1], [upper=6])
	document.getElementById('dice_result').innerHTML = roll
	//movement options based on roll and starting location
	
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

	//stores room and it's movement options
	var roomMoveStorage = new Map()
		roomMoveStorage.set(hall, hallOptions)
		roomMoveStorage.set(study, studyOptions)
		roomMoveStorage.set(library, libraryOptions)
		roomMoveStorage.set(billardRoom, billardRoomOptions)
		roomMoveStorage.set(conservatory, conservatoryOptions)
		roomMoveStorage.set(ballRoom, ballRoomOptions)
		roomMoveStorage.set(kitchen, kitchenOptions)
		roomMoveStorage.set(diningRoom, diningRoomOptions)
		roomMoveStorage.set(lounge, loungeOptions)

	//finds current location in room storage
	var roomMoves = roomMoveStorage.get(currentLocation)
	for (i=0; i<roomMoves.length; i++){
		if (turn === 'player'){
			roomMoves[i].style.backgroundColor = 'yellow'	
			roomMoves[i].addEventListener('click', movePlayer)
			roomMoves[i].addEventListener('click', guessSetUp)
		}
		else if (turn === 'computer1' || turn === 'computer2') {
				computerMoves = _.shuffle(roomMoves)
				window.setTimeout(moveComputer, 2000)
		}
	}
}

//move the piece

function movePlayer(e){
	e.target.appendChild(playerPiece)
}

function moveComputer(){
	if (turn === 'computer1'){
		computerMoves[0].appendChild(computer1Piece)
		window.setTimeout(guess, 2000)
	}

	else if (turn === 'computer2'){
		computerMoves[0].appendChild(computer2Piece)
		window.setTimeout(guess, 2000)
	}
}
	
//after movement is complete. called when player is moving only

function guessSetUp(){
	for (i=0; i<rooms.length; i++){
		//stops movement
		rooms[i].removeEventListener('click', movePlayer)
		//change color back
		rooms[i].style.backgroundColor = 'white'
	}
	var currentLocationName = playerPiece.parentElement.id
	document.getElementById('roomGuess').innerHTML = currentLocationName

}


document.getElementById('button').addEventListener('click', guess)

function guess(){
	guessStorage = []

	if (turn === 'player'){
		document.getElementById('messages').innerHTML = "submit a guess"	
		document.getElementById('weaponGuess')
		var weaponGuessValue = weaponGuess.value
		document.getElementById('charGuess')
		var charGuessValue = charGuess.value
		document.getElementById('roomGuess')
		var roomGuessValue = roomGuess.value

		//player guess is compared with computer 1's cards
		for (i=0; i < computer1Cards.length; i++){
			if (weaponGuessValue === computer1Cards[i]){
				guessStorage.push(computer1Cards[i])
			}	
			if (charGuessValue === computer1Cards[i]){
				guessStorage.push(computer1Cards[i])
			}
			if (roomGuessValue === computer1Cards[i]){
				guessStorage.push(computer1Cards[i])
			}
		}
		//computer 1 reveals a random card from their hand that matches
  		randomCard = _.shuffle(guessStorage)
  		
  		if (randomCard.length > 0){
  			document.getElementById('messages').innerHTML = "computer1 has a card you asked for"	
  			document.getElementById(randomCard[0]+'value').style.display = 'inline'
  		//next turn
  			window.setTimeout(turnHandlerPlayer, 2000)
  		}
  		//if computer1 doesn't have a match to player's guess it goes to computer 2
  		else {
 			document.getElementById('messages').innerHTML = "computer1 does not have a match"
  			window.setTimeout(guess2, 2000)
  		}
	}
	
	//computer1 compares their guess with computer2's hand
	else if (turn === 'computer1'){
		charGuessValue = _.shuffle(charArray)[0]
		weaponGuessValue = _.shuffle(weaponArray)[0]
			//computer1 guess randomly 
		// charGuessValue = charArray[0];
		// weaponGuessValue = weaponArray[0];
		roomGuessValue =  computer1Piece.parentElement.id
		document.getElementById('computerGuess').innerHTML = 'Computer1 says it was ' + 
		charGuessValue + ' with the ' + weaponGuessValue + ' in the ' + roomGuessValue

		for (i=0; i<computer2Cards.length; i++){
			if (weaponGuessValue === computer2Cards[i]){
				guessStorage.push(computer2Cards[i])
			}	
			if (charGuessValue === computer2Cards[i]){
				guessStorage.push(computer2Cards[i])
			}
			if (roomGuessValue === computer2Cards[i]){
				guessStorage.push(computer2Cards[i])
			}
		}
		//computer2 picks a matching card from their hand
		randomCard = _.shuffle(guessStorage)
		if (randomCard.length > 0){
  			window.setTimeout(turnHandlerComputer1, 2000)
		}

  		//if computer2 does not have a match player shows a matching card. next turn begins when player hits card to show computer1
  		else 	{
  				console.log(weaponGuessValue)
  				console.log(roomGuessValue)
  				console.log(charGuessValue)
  			for (i=0; i<playerCards.length; i++){
  				if (playerCards[i] === weaponGuessValue){
  					document.getElementById('messages').innerHTML = 'you have a match. click it now to reveal to Computer1'
  					document.getElementById(weaponGuessValue + 'value').style.backgroundColor = 'green'
  					document.getElementById(weaponGuessValue + 'value').addEventListener('click', turnHandlerComputer1)
  				}

  				else if (playerCards[i] === charGuessValue){
  					document.getElementById('messages').innerHTML = 'you have a match. click it now to reveal to Computer1'
  					document.getElementById(charGuessValue + 'value').style.backgroundColor = 'green'
  					document.getElementById(charGuessValue + 'value').addEventListener('click', turnHandlerComputer1)
  				}
 
  				else if (playerCards[i] === roomGuessValue){
  					document.getElementById('messages').innerHTML = 'you have a match. click it now to reveal to Computer1'
  					document.getElementById(roomGuessValue + 'value').style.backgroundColor = 'green'
  					document.getElementById(roomGuessValue + 'value').addEventListener('click', turnHandlerComputer1)

  				}
  		// //if player also does not have a match it goes to next turn
  		// 		else {
  		// 			document.getElementById('messages').innerHTML = ' you do not have a match. computer1 turn is now over'
  		// 			window.setTimeout(turnHandlerComputer1, 2000)
  				// }
  			}
  		}
	}
	//if it's computer2's turn asks player for a match
	else if (turn === 'computer2'){
		charGuessValue = _.shuffle(charArray)[0]
		weaponGuessValue = _.shuffle(weaponArray)[0]
		console.log(charGuessValue + "????????????")
		// charGuessValue = charArray[0];
		// weaponGuessValue = weaponArray[0];
		roomGuessValue = computer2Piece.parentElement.id
		document.getElementById('computerGuess').innerHTML = 'Computer2 says it was ' + 
		charGuessValue + ' with the ' + weaponGuessValue + ' in the ' + roomGuessValue

  		for (i=0; i<playerCards.length; i++){
  				console.log('NUMBER')
  				if (playerCards[i] === weaponGuessValue){
  					console.log(charGuessValue + '333333333333')
  					document.getElementById('messages').innerHTML = 'you have a match. click it now to reveal to Computer2'
  					console.log('matchWeapon')
  					document.getElementById(weaponGuessValue + 'value').style.backgroundColor = 'green'
  					console.log(weaponGuessValue)
  					document.getElementById(playerCards[i] + 'value').addEventListener('click', turnHandlerComputer2)
  				}

  				else if (playerCards[i] === charGuessValue){
  					console.log(charGuessValue + "44444444444")
  					document.getElementById('messages').innerHTML = 'you have a match. click it now to reveal to Computer2'
  					console.log('matchChar')
  					document.getElementById(playerCards[i] + 'value').style.backgroundColor = 'green'
  					console.log(charGuessValue)
  					document.getElementById(playerCards[i] + 'value').addEventListener('click', turnHandlerComputer2)
  				}
 
  				else if (playerCards[i] === roomGuessValue){
  					document.getElementById('messages').innerHTML = 'you have a match. click it now to reveal to Computer2'
  					console.log('matchRoom')
  					document.getElementById(playerCards[i] + 'value').style.backgroundColor = 'green'
  					console.log(roomGuessValue)
  					document.getElementById(playerCards[i] + 'value').addEventListener('click', turnHandlerComputer2)
  				}
  				
  				// else {
  				// 	document.getElementById('messages').innerHTML = 'you do not match with computer2. computer1 will now see if it has a match'
  				// 	window.setTimeout(guess2, 4000)
			//}
		}	
	}
}

function guess2(){
//if computer1 doesn't have a match for player's guess, player asks computer2
	if (turn === 'player'){
 		document.getElementById('weaponGuess')
		 weaponGuessValue = weaponGuess.value
		document.getElementById('charGuess')
		 charGuessValue = charGuess.value
		document.getElementById('roomGuess')
		 roomGuessValue = roomGuess.value
	
		for (i=0; i<computer2Cards.length; i++){
			if (weaponGuessValue === computer2Cards[i]){
				guessStorage.push(computer2Cards[i])
			}
			if (charGuessValue === computer2Cards[i]){
				guessStorage.push(computer2Cards[i])
			}
			if (roomGuessValue === computer2Cards[i]){
				guessStorage.push(computer2Cards[i])
			}
		}
  		
  		randomCard = _.shuffle(guessStorage)
  		
  		if (randomCard.length > 0) {
  			document.getElementById('messages').innerHTML = "computer2 has a card you asked for"
  			document.getElementById(randomCard[0]+'value').style.display= 'inline'
  			window.setTimeout(turnHandlerPlayer, 2000)
  		}

  		else {
  			document.getElementById('messages').innerHTML = 'no matches with computer1 or computer2'
  			window.setTimeout(turnHandlerPlayer, 2000)
  		}
  	
	}

	else if (turn === 'computer2'){
	
			for (i=0; i<computer1Cards.length; i++){
				if (weaponGuessValue === computer1Cards[i]){
					guessStorage.push(computer1Cards[i])
				}

			if (charGuessValue === computer1Cards[i]){
					guessStorage.push(computer1Cards[i])
				}
			if (roomGuessValue === computer1Cards[i]){
					guessStorage.push(computer1Cards[i])
			}
		}
		//computer2 picks a matching card from their hand
		randomCard = _.shuffle(guessStorage)

		if (randomCard.length > 0){
			document.getElementById('messages').innerHTML = "computer1 has a card computer2 asked for"
  			window.setTimeout(turnHandlerComputer2, 2000)
  		}
  		else {
  			document.getElementById('messages').innerHTML = 'no matches with player or computer1'
  			window.setTimeout(turnHandlerComputer2, 2000)
		}

	}
}


