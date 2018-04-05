var audio = new Audio()
music()

function music(){
audio.src = 'story.mp3';
audio.play()
}

var story1 = document.getElementById('story1')
var charimages = document.getElementById('charimages')
var story2 = document.getElementById('story2')
var story3 = document.getElementById('story3')
var story4 = document.getElementById('story4')



setTimeout(function(){charimages.style.display = 'inline'}, 3000);
setTimeout(function(){story2.style.display = 'inline'}, 5000);
setTimeout(function(){story3.style.display = 'inline'}, 7000);
setTimeout(function(){story4.style.display = 'inline'}, 10000);

begin.addEventListener('click', music2)

function music2(){
audio.src = 'start.ogg';
	audio.play()
setTimeout(function () {
        location.href = 'index.html';
    }, 1000);
}