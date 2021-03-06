
//sets up turns
var turn = 'player';

//sets up computer movement
var computerMoves;

//sets up computer guesses
var weaponGuessValue;
var roomGuessValue; ;
var guessStorage = []
var computer1Storage = []
var computer2Storage = []


//sets up game cards
var roomArray = ['Hall', 'Study', 'Library', 'BillardRoom', 'Conservatory', 'Ballroom', 'Kitchen', 'DiningRoom', 'Lounge']
var charArray = ['MissScarlet', 'MrGreen', 'ColonelMustard', 'MrsWhite', 'MrsPeacock', 'ProfessorPlum']
var weaponArray = ['Candlestick', 'Knife', 'LeadPipe', 'Revolver', 'Rope', 'Wrench']
var playerCards = []
var computer1Cards = []
var computer2Cards = []
var roomEnvelope = _.sample(roomArray)
var charEnvelope = _.sample(charArray)
var weaponEnvelope = _.sample(weaponArray)

console.log(roomEnvelope)
console.log(charEnvelope)
console.log(weaponEnvelope)

//dice and player pieces 
var dice = document.getElementById('dice')
var playerPiece = document.getElementById('playerPiece')
var computer1Piece = document.getElementById('computer1Piece')
var computer2Piece = document.getElementById('computer2Piece')

//board
var board = document.getElementById('board')

//rooms 
var hall = board.rows[0].cells[1]
var study = board.rows[0].cells[0]
var library = board.rows[1].cells[0]
var lounge = board.rows[1].cells[2]
var billardRoom = board.rows[2].cells[0]
var diningRoom = board.rows[2].cells[2]
var conservatory = board.rows[3].cells[0]
var ballRoom = board.rows[3].cells[2]
var kitchen = board.rows[3].cells[3]
var square = board.rows[3].cells[1]
square.id = 'tile'
var rooms = [hall, study, library, lounge, billardRoom, diningRoom, conservatory, ballRoom, kitchen]


//communication with player
var messages = document.getElementById('messages')
var guessForm = document.getElementById('guessForm')	
var computerGuess = document.getElementById('computerGuess').innerHTML

// new start
var start = document.getElementById('start')
start.addEventListener('click', reload)

function reload(){
	location.reload()
}


//deal cards and set up pieces
dealing()
setPieces()


//select room, charecter, weapon for envelope 
function dealing(){
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
			computer1Storage.push(cardArray[i])
		}
		else if (i >= 12) {
			computer2Cards.push(cardArray[i])
			computer2Storage.push(cardArray[i])
		}

	}	
	console.log(playerCards)
	console.log(computer1Cards)
	console.log(computer2Cards)

// player's cards are displayed
	for (i = 0; i<playerCards.length; i++){
		var card = document.createElement('div')
		var value = document.createElement('div')
		card.className = 'card'
		value.id = playerCards[i] + 'value'
		card.appendChild(value);
		document.getElementById("cardContainer").appendChild(card)
	}
//dice instructions
	messages.innerHTML = 'Click the dice icon to roll the dice.'



//computer1's cards are displayed 
	for (i = 0; i<computer1Cards.length; i++){
		var card = document.createElement('div')
		var value = document.createElement('div')
		card.className = 'card'
		value.id = computer1Cards[i]+'value'
		card.appendChild(value);
		document.getElementById("computer1cardContainer").appendChild(card)
		document.getElementById(computer1Cards[i]+'value').style.backgroundImage = "url('images/center2.png')"
	}

//computer2's cards are displayed
	for (i = 0; i<computer2Cards.length; i++){
		var card = document.createElement('div')
		var value = document.createElement('div')
		card.className = 'card'
		value.id = computer2Cards[i]+'value'
		card.appendChild(value);
		document.getElementById("computer2cardContainer").appendChild(card);
		document.getElementById(computer2Cards[i]+'value').style.backgroundImage = "url('images/center2.png')"
	}

}

//removes card display when altered during turns

function clearCards(){
	for (i=0; i<computer1Cards.length; i++){
		document.getElementById(computer1Cards[i]+'value').style.backgroundImage = "url('images/center2.png')"
	}
	for (i=0; i<computer2Cards.length; i++){
		document.getElementById(computer2Cards[i]+'value').style.backgroundImage = "url('images/center2.png')"
	}
	for (i=0; i<playerCards.length; i++){
		document.getElementById(playerCards[i]+'value').style.border =''
	}
}


//when called switches whose turn it is. 

//switch from player to computer1
function turnHandlerPlayer(){
	    turn = 'computer1'
	    messages.innerHTML = "It is computer1's turn"
	    guessStorage.splice(0,guessStorage.length)
	    window.setTimeout(clearCards, 3000)
	 	window.setTimeout(rollDice, 4000)
	 	console.log(computer1Storage)
	 	console.log(computer2Storage)
	 	computerAccuse()
}

//switch from computer1 to computer2
function turnHandlerComputer1(){
		turn = 'computer2'
		messages.innerHTML = "It is computer2's turn"
		guessStorage.splice(0,guessStorage.length)
		window.setTimeout(clearCards, 3000)
		window.setTimeout(rollDice, 4000)	
		console.log(computer1Storage)
	 	console.log(computer2Storage)
	 	computerAccuse()
}

//switch from computer2 to player
function turnHandlerComputer2(){
		turn = 'player'
		guessStorage.splice(0,guessStorage.length)
		window.setTimeout(clearCards, 3000)
		document.getElementById('computerGuess').innerHTML = ''
		messages.innerHTML = "It is your turn. roll the dice and take your turn"
}

//player clicks dice to start
dice.addEventListener("click", rollDice)

//places pieces upon game start
function setPieces(){
	hall.appendChild(playerPiece)
	conservatory.appendChild(computer1Piece)
	diningRoom.appendChild(computer2Piece)
}

function rollDice(){
	//where is the piece currently
	if (turn === 'player'){
		 currentLocation = playerPiece.parentElement
		 messages.innerHTML = 'Click a room highlighted in yellow to move to that location.'

	}
	else if (turn === 'computer1'){
		messages.innerHTML = ''
		 currentLocation = computer1Piece.parentElement
	}
	else if (turn === 'computer2'){
		messages. innerHTML = ''
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
			roomMoves[i].style.border = 'solid yellow 15px'	
			roomMoves[i].addEventListener('click', movePlayer)
			roomMoves[i].addEventListener('click', guessSetUp)
		}
		else if (turn === 'computer1' || turn === 'computer2') {
				computerMoves = _.shuffle(roomMoves)
				window.setTimeout(moveComputer, 3000)
		}
	}
}

//move the player piece

function movePlayer(e){
	e.target.appendChild(playerPiece)
}

//moves computer piece and sets ups guess values for weapon and charecter
function moveComputer(){
	if (turn === 'computer1'){
		computerMoves[0].appendChild(computer1Piece)
		window.setTimeout(guessComputer1, 3000)
		weaponGuessValue = _.sample(weaponArray)
		charGuessValue = _.sample(charArray)
		}
		

	else if (turn === 'computer2'){
		computerMoves[0].appendChild(computer2Piece)
		window.setTimeout(guessComputer2, 3000)
		charGuessValue =  _.sample(charArray)
		weaponGuessValue = _.sample(weaponArray)
	}
}
	
//after movement is complete. called when player is moving only

function guessSetUp(){
	for (i=0; i<rooms.length; i++){
		//stops movement
		rooms[i].removeEventListener('click', movePlayer)
		rooms[i].removeEventListener('click', guessSetUp)
		//change color back
		rooms[i].style.border = ''
	}
	var currentLocationName = playerPiece.parentElement.id
	document.getElementById('roomGuess').innerHTML = currentLocationName
	messages.innerHTML = "Submit a guess:"	
	document.getElementById('guessForm').style.display = 'block'	
}	

//player submits guess
document.getElementById('button').addEventListener('click', guessPlayer)

//called once player guess is submitted

function guessPlayer(){
	document.getElementById('weaponGuess')
	var weaponGuessValue = weaponGuess.value
	document.getElementById('charGuess')
	var charGuessValue = charGuess.value
	document.getElementById('roomGuess')
	var roomGuessValue = roomGuess.value

	document.getElementById('guessForm').style.display = 'none'
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
  		messages.innerHTML = "Computer1 has a card you asked for"
  		document.getElementById(randomCard[0] +'value').style.backgroundImage = ""
  		window.setTimeout(turnHandlerPlayer, 3000)
  	}
  		
  		//if computer1 doesn't have a match to player's guess it goes to computer 2
  	else {
 		messages.innerHTML = "Computer1 does not have a match. Now asking Computer2"
  		window.setTimeout(playerGuess2, 3000)
  	}
}
	
function playerGuess2(){
	
	document.getElementById('weaponGuess')
	weaponGuessValue = weaponGuess.value
	document.getElementById('charGuess')
	charGuessValue = charGuess.value
	document.getElementById('roomGuess')
	roomGuessValue = roomGuess.value

// player asks computer2 for a match
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
  		messages.innerHTML = "Computer2 has a card you asked for"
  		document.getElementById(randomCard[0] +'value').style.backgroundImage = ""
  		window.setTimeout(turnHandlerPlayer, 4000)
  	}

  	else {
  		messages.innerHTML = 'No matches with Computer1 or Computer2'
  		window.setTimeout(turnHandlerPlayer, 4000)
  	}
}

//computer1 compares their guess with computer2's hand
function guessComputer1() {
	roomGuessValue = computer1Piece.parentElement.id		
	document.getElementById('computerGuess').innerHTML = 'Computer1 guesses it was ' + 
	charGuessValue + ' with the ' + weaponGuessValue + ' in the ' + roomGuessValue

	for (i=0; i<computer2Cards.length; i++){
		if (weaponGuessValue === computer2Cards[i]){
			guessStorage.push(computer2Cards[i])
		}	
		else if (charGuessValue === computer2Cards[i]){
				guessStorage.push(computer2Cards[i])
		}
		else if (roomGuessValue === computer2Cards[i]){
				guessStorage.push(computer2Cards[i])
		}
	}
	//computer2 picks a matching card from their hand. if there is a match it goes to the next turn
	var randomCard = _.shuffle(guessStorage)
	
	if (randomCard.length > 0){
		if (computer1Storage.indexOf(randomCard[0]) === -1){
			computer1Storage.push(randomCard[0])
		}
  		window.setTimeout(turnHandlerComputer1, 4000)
	}

  		//if computer2 does not have a match computer 1 checks with the player

  	else if (randomCard.length === 0) {
  			guess2Computer1()
  			messages.innerHTML = "Computer2 does not have a match with Computer1's Guess"
  	}
}


  function guess2Computer1(){
  //computer1 compares their cards with player
  //if there is a match that card is highlighted. player selects card to show computer

		if (playerCards.indexOf(weaponGuessValue) >= 0){
			document.getElementById(weaponGuessValue + 'value').style.border = 'yellow solid 10px'
			document.getElementById(weaponGuessValue + 'value').addEventListener('click', function(){
				if (computer1Storage.indexOf(weaponGuessValue) === -1){
					computer1Storage.push(weaponGuessValue)
				}
			})
			document.getElementById(weaponGuessValue + 'value').addEventListener('click', turnHandlerComputer1)
		}

		if (playerCards.indexOf(charGuessValue) >= 0){
			document.getElementById(charGuessValue + 'value').style.border = 'yellow solid 10px'
			document.getElementById(charGuessValue + 'value').addEventListener('click', function(){
				if (computer1Storage.indexOf(charGuessValue) === -1){
					computer1Storage.push(charGuessValue)
				}
			})
			document.getElementById(charGuessValue + 'value').addEventListener('click', turnHandlerComputer1)
		}

		if (playerCards.indexOf(roomGuessValue) >= 0){
			document.getElementById(roomGuessValue + 'value').style.border = 'yellow solid 10px'
			document.getElementById(charGuessValue + 'value').addEventListener('click', function(){
				if (computer1Storage.indexOf(roomGuessValue) === -1){
					computer1Storage.push(roomGuessValue)
				}
			})
			document.getElementById(roomGuessValue + 'value').addEventListener('click', turnHandlerComputer1)
		}

		if (playerCards.indexOf(weaponGuessValue) === (-1) && playerCards.indexOf(charGuessValue) === (-1) && 
			playerCards.indexOf(roomGuessValue) === (-1) && computer1Cards.indexOf(weaponGuessValue) === (-1) && computer1Cards.indexOf(charGuessvalue) === (-1)
		    && computer1Cards.indexOf(roomGuessValue) === (-1)){
			alert('Computer 1 Accuses ' +  charEnvelope + ' with the ' + weaponEnvelope + ' in the ' + roomEnvelope + '. Computer 1 Wins')
  			location.reload()
  		}
  		if (playerCards.indexOf(weaponGuessValue) === (-1) && playerCards.indexOf(charGuessValue) === (-1) && 
			playerCards.indexOf(roomGuessValue) === (-1)){
			messages.innerHTML = "You do not match with computer1. Computer1's turn is over"
  			window.setTimeout(turnHandlerComputer1, 4000)
  		}
}


//if it's computer2's turn asks player for a match

function guessComputer2(){

	roomGuessValue = computer2Piece.parentElement.id
	document.getElementById('computerGuess').innerHTML = 'Computer2 says it was ' + 
	charGuessValue + ' with the ' + weaponGuessValue + ' in the ' + roomGuessValue + '.  If you have a match please select it now.'

	if (playerCards.indexOf(weaponGuessValue) >= 0){
		document.getElementById(weaponGuessValue + 'value').style.border = 'yellow solid 10px'
		document.getElementById(weaponGuessValue + 'value').addEventListener('click', function(){
				if (computer2Storage.indexOf(weaponGuessValue) === -1){
					computer2Storage.push(weaponGuessValue)
				}
			})
		document.getElementById(weaponGuessValue + 'value').addEventListener('click', turnHandlerComputer2)
		}

	if (playerCards.indexOf(charGuessValue) >= 0){
		document.getElementById(charGuessValue + 'value').style.border = 'yellow solid 10px'
		document.getElementById(charGuessValue + 'value').addEventListener('click', function(){
				if (computer2Storage.indexOf(charGuessValue) === -1){
					computer2Storage.push(charGuessValue)
				}
			})
		document.getElementById(charGuessValue + 'value').addEventListener('click', turnHandlerComputer2)
		}

	if (playerCards.indexOf(roomGuessValue) >= 0){
		document.getElementById(roomGuessValue + 'value').style.border = 'yellow solid 10px'
		document.getElementById(roomGuessValue + 'value').addEventListener('click', function(){
				if (computer2Storage.indexOf(roomGuessValue) === -1){
					computer2Storage.push(roomGuessValue)
				}
			})
		document.getElementById(roomGuessValue + 'value').addEventListener('click', turnHandlerComputer2)
		}

	if (playerCards.indexOf(weaponGuessValue) === (-1) && playerCards.indexOf(charGuessValue) === (-1) && 
			playerCards.indexOf(roomGuessValue) === (-1)){
			messages.innerHTML = 'You do not match with computer2. Computer1 will now see if it has a match'
  			window.setTimeout(guess2Computer2, 4000)
	}
}


function guess2Computer2(){
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
	

	randomCard = _.shuffle(guessStorage)

	if (randomCard.length > 0){
		messages.innerHTML = "Computer1 has a card Computer2 asked for"
		if (computer1Storage.indexOf(randomCard[0]) === -1){
			computer1Storage.push(randomCard[0])
		}
  		window.setTimeout(turnHandlerComputer2, 4000)
  	}
  	
  	//if the computer finds no matches (including with own hand) it wins
  	else if (randomCard.length = 0 && computer2Cards.indexOf(weaponGuessValue) === (-1) && computer2Cards.indexOf(charGuessvalue) === (-1)
		 && computer2Cards.indexOf(roomGuessValue) === (-1)){
  		alert('Computer 2 Accuses ' +  charEnvelope + ' with the ' + weaponEnvelope+ ' in the ' + roomEnvelope + '. Computer 2 Wins')
		location.reload()
	}
	
	else {
		window.setTimeout(turnHandlerComputer2, 4000)
	}

}

//player accusation

document.getElementById('buttonShow').addEventListener('click', accuse)

//when button is pressed it appears
function accuse(){
	document.getElementById('accuseModal').style.display = 'block'
	document.getElementById('buttonAccuse').addEventListener('click', accuseCheck)
	currentLocationName = playerPiece.parentElement.id
	document.getElementById('roomAccuse').innerHTML = currentLocationName
}

function accuseCheck(){
	
document.getElementById('weaponAccuse')
var weaponAccuseValue = weaponAccuse.value
document.getElementById('charAccuse')
var charAccuseValue = charAccuse.value
document.getElementById('roomAccuse')
var roomAccuseValue = roomAccuse.value

	if (roomEnvelope === roomAccuseValue && weaponEnvelope === weaponAccuseValue && 
		charEnvelope === charAccuseValue){
		alert('You won!')
	}	
	else {
		alert('Sorry, you lost! It was ' + charEnvelope + ' with the ' + weaponEnvelope+ ' in the ' + roomEnvelope)
	}

location.reload()

	}


document.getElementById('accuseModal-close').addEventListener('click', closeAccuseModal)

function closeAccuseModal(){
	accuseModal.style.display = 'none'
}



var randoarray = [0,1,2,3]

function computerAccuse(){
	console.log('accusefunction')
	if (computer1Storage.length >= 15 && turn === 'computer1'){
		var rando = _.sample(randoarray)
		console.log(rando)
		if (rando === 0){
			alert('Computer 1 Accuses ' +  charEnvelope + ' with the ' + weaponEnvelope+ ' in the ' + roomEnvelope + '. Computer 1 Wins!')
		location.reload()
		}
	}

	if (computer2Storage.length >= 15 && turn === 'computer2'){
		var rando = _.sample(randoarray)
		console.log(rando)
		if (rando === 0){
			alert('Computer 1 Accuses ' +  charEnvelope + ' with the ' + weaponEnvelope+ ' in the ' + roomEnvelope + '. Computer 1 Wins!')
		location.reload()
		}
	}

	if (computer1Storage.length === 18 && turn === 'computer1'){
		alert('Computer 1 Accuses ' +  charEnvelope + ' with the ' + weaponEnvelope+ ' in the ' + roomEnvelope + '. Computer 1 Wins!')
		location.reload()
	}

	if (computer2Storage.length === 18 && turn === 'computer2'){
		alert('Computer 2 Accuses ' +  charEnvelope + ' with the ' + weaponEnvelope+ ' in the ' + roomEnvelope + '. Computer 2 Wins!')
	location.reload()
	}

}

//rules modal
var rules = document.getElementById('rules')
var modal = document.getElementById('modal')
var modalClose = document.getElementById('modal-close')

rules.addEventListener('click', openModal)

function openModal(){
	modal.style.display = 'block'

}

modalClose.addEventListener('click', closeModal)

function closeModal(){
	modal.style.display = 'none'
}

