# Clue

<h1> About </h1>
<p> Created as my final project for the Web Development Intensive at <a href = 'https://nycda.com/'>New York Code + Design Academy.</a> The classic board game, now with extra JavaScript</p>

<hr>

<h1> How to Play</h1>

<p>At the begining of the game, a suspect card, a room card, and a weapon card are stowed away. The goal is to deduce the contents of these cards (or in other words, who is the murderer, where did the murder happen, and what weapon was used). The rest of the cards are divided among the three players (you plus two computers). Each player can only see their own hand. However, players can guess a suspect, a weapon, and a room each turn. If the player with the following turn has a match/matches, they must show one matching card to the guessing player. If not, it passes to the next player. At the end of this cycle, the player's turn ends.</p>

<p>Players roll the dice to determine the scope of board movement. While players can guess any weapon or suspect, you can only guess the room that you are currently in.</p>

<p>When you think you have deduced the suspect, room, and weapon, select the "Click to Accuse" button. If you identify the suspect, the weapon, and the room correctly, you win! But be careful! If your accusation is not 100% correct, you automatically lose the game. </p>
<hr>

<h1> Tech Specs</h1>

<p> This was primarily an excerise in vanilla JavaScript, with a bit of jQuery and <a href = https://github.com/lodash/lodash> lodash </a> thrown in. For styling, I used SASS and <a href = 'https://github.com/twbs/bootstrap-sass'> Bootstrap </a> </p>.

<hr>

<h1> Some Notes on the A.I. </h1>

<p>The two computer players do not play with the same strategy as a human being. In fact, they don't play strategically at all. Their guesses are entirely random. However, the computer can win! If a computer player has 'seen' 15 or more of the cards (not including the hidden cards), they have a 33% chance of making an accusation. If they have 'seen' 18 of the cards (again, not including the hidden cards) they automatically make an accusation. The computer's accusation is always correct. </p>

<p>Interesting side note: studies have been done on the A.I. from the <a href = 'https://en.wikipedia.org/wiki/Clue_(1998_video_game)'>1998 video game adapation </a> of Clue. It's apparently an excellent framework for introductory studies in propositional logic. </p>

<p>Want a craftier computer opponent? Stay tuned for Clue 2.0!</p> 

<hr>

<h1> Credits </h1>
<ul>
<li>The board game Clue belongs to Hasboro</li>
<li>Assets are taken from the 1992 SEGA Genesis/SNES Clue game</li>
<li> Dice icon is from <a href = https://www.vecteezy.com/> Vectreezy </a> </li>
<li> Music by <a href = https://freesound.org/people/dAmbient/sounds/251936/> dAmbient</a> </li>
<li> Start sound by <a href = https://freesound.org/people/plasterbrain/sounds/243020/> Plasterbrain </a></li>
</ul>


