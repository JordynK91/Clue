
//sets up turns
var turn = 'player';
var computerMoves ;
document.getElementById('currentTurn').innerHTML = turn


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
	}

}

//when called switches whose turn it is. 
function turnHandler(){
	console.log(turn)
	if (turn === 'player'){
	   turn = 'computer1'
	   rollDice()
	}
	else if (turn === 'computer1'){
		turn = 'computer2'
		rollDice()
	}
	else if (turn === 'computer2'){
		turn = 'player'
	}
	document.getElementById('currentTurn').innerHTML = turn
}


// player rolls dice
dice.addEventListener("click", rollDice)


function setPieces(){
	hall.appendChild(playerPiece)
	conservatory.appendChild(computer1Piece)
	diningRoom.appendChild(computer2Piece)
}


function rollDice(){
	//where is the piece currently
	if (turn === 'player'){
	var currentLocation = playerPiece.parentElement
	console.log(currentLocation)
	}
	else if (turn === 'computer1'){
	var currentLocation = computer1Piece.parentElement
	console.log(currentLocation)
	}
	else if (turn === 'computer2'){
	var currentLocation = computer2Piece.parentElement
	console.log(currentLocation)
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
		console.log(roomMoves)
		for (i=0; i<roomMoves.length; i++){
				if (turn === 'player'){
					roomMoves[i].style.backgroundColor = 'yellow'	
					roomMoves[i].addEventListener('click', movePlayer)
					roomMoves[i].addEventListener('click', guessSetUp)
				}
				else if (turn === 'computer1' || 'computer2') {
					computerMoves = _.shuffle(roomMoves)
					console.log(computerMoves)
					moveComputer()
				}
			}
		}

//move the piece

function movePlayer(e){
	e.target.appendChild(playerPiece)
}

function moveComputer(){
	if (turn === 'computer1'){
		console.log('whatever')
		computerMoves[0].appendChild(computer1Piece)
	}
}
	
//after movement is complete

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

//object that stores each player's cards for accessing during guessing

var cardStorage = new Map()
		cardStorage.set('player', playerCards)
		cardStorage.set('computer1', computer1Cards)
		cardStorage.set('computer2', computer2Cards)

function guess(){

	if (turn === 'player'){
		//other player cards to compare with
		cardsFirst = cardStorage.get('computer1')
		//guesses
		document.getElementById('weaponGuess')
		var weaponGuessValue = weaponGuess.value
		document.getElementById('charGuess')
		var charGuessValue = charGuess.value
		document.getElementById('roomGuess')
		var roomGuessValue = roomGuess.value

	}

	else if (turn === 'computer1'){
		cardsFirst = cardStorage.get('computer2')
	
	}

	else if (turn === 'computer2'){
		cardsFirst = cardStorage.get('player')
	}


	guessStorage = []

	for (i=0; i<cardsFirst.length; i++){
		if (weaponGuessValue === cardsFirst[i]){
			guessStorage.push(cardsFirst[i])
		}
		if (charGuessValue === cardsFirst[i]){
			guessStorage.push(cardsFirst[i])
		}
		if (roomGuessValue === cardsFirst[i]){
			guessStorage.push(cardsFirst[i])
		}

	}
  		randomCard = _.shuffle(guessStorage)
  		
  		if (randomCard.length > 0){
  			document.getElementById(randomCard[0]+'value').style.backgroundColor = 'yellow'
  			turnHandler()
  		}
  		else {
  			guess2()
  		}
  	
	}

function guess2(){
	if (turn === 'player'){
		cardsSecond = cardStorage.get('computer2')
	}

	else if (turn === 'computer1'){
		cardsSecond = cardStorage.get('player')
	
	}
	else if (turn === 'computer2'){
		cardsSecond = cardMoveStorage.get('computer1')
	}


 	document.getElementById('weaponGuess')
	var weaponGuessValue = weaponGuess.value
	document.getElementById('charGuess')
	var charGuessValue = charGuess.value
	document.getElementById('roomGuess')
	var roomGuessValue = roomGuess.value
	guessStorage = []
	for (i=0; i<cardsSecond.length; i++){
		if (weaponGuessValue === cardsSecond[i]){
			guessStorage.push(cardsSecond[i])
		}
		if (charGuessValue === cardsSecond[i]){
			guessStorage.push(cardsSecond[i])
		}
		if (roomGuessValue === cardsSecond[i]){
			guessStorage.push(cardsSecond[i])
		}

	}
  		randomCard = _.shuffle(guessStorage)
  		
  		if (randomCard.length > 0) {
  			document.getElementById(randomCard[0]+'value').style.backgroundColor = 'yellow'
  			turnHandler()
  		}

  		else {
  			alert('no matches')
  			turnHandler()
  		}
  	
	}






