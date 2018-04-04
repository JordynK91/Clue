var begin = document.getElementById('begin')
var audio = new Audio()

begin.addEventListener('click', music)

function music(){
audio.src = 'start.ogg';
	audio.play()
setTimeout(function () {
        location.href = 'story.html';
    }, 1000);
}


