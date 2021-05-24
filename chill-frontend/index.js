document.body.style.backgroundColor = "#ffe8d6"


// Sound

function buildSound(i) {
    let wrapper = document.getElementById('sound-wrapper')
    wrapper.innerHTML = ''

    let urlSound = 'http://127.0.0.1:8000/api/sounds/'

    fetch(urlSound)
    .then((resp) => resp.json())
    .then(function(data){
        let list = data
        
        for(let n=0;n<list.length;n++){
            if(list[n].id == i){
                let item = `
                <figure style="padding-bottom: 30px;width:280px;font-size: 14px;">
                    <figcaption>${list[n].name}  <button class="btn-nav" id="pl-${list[n].id}" onclick="controlPlay(${list[n].id})"><img id="im-${list[n].id}" src="free-icon-play-button-153752.png"></button></figcaption>
                    <audio id="audio-${list[n].id}" loop

                        src="${list[n].music}">
                            Your browser does not support the
                            <code>audio</code> element.
                    </audio>
                    <input type="range" id="volume-${list[n].id}" name="volume" min="0" max="100" value="50" step="1" onmousemove="setVolume(${list[n].id})">
                </figure>`
                
                wrapper.innerHTML += item          
            }
            
        }
    })

}


// Rooms

let wrapperRooms = document.getElementById('rooms')

let url = 'http://127.0.0.1:8000/api/rooms/'

fetch(url)
.then((resp) => resp.json())
.then(function(roomsJson){
    console.log(roomsJson)


    let numRoom = 0

    wrapperRooms.innerHTML += `<div>${roomsJson[numRoom].name}</div>`
    for(let i in roomsJson[numRoom].sound){
        buildSound((roomsJson[numRoom].sound)[i])
    }

    let myButton = document.getElementById('but')

    myButton.onclick = () =>{
        numRoom++
        if(numRoom >= roomsJson.length){
            numRoom=0
        }
        wrapperRooms.innerHTML = ''
        console.log(numRoom)
        wrapperRooms.innerHTML += `<div>${roomsJson[numRoom].name}</div>`
        

        let roomsJsonSound = roomsJson[numRoom].sound
        for(let g in roomsJsonSound){
            buildSound(roomsJsonSound[g])
            setImage(roomsJson[numRoom].image)
        }
    }
})





// Spotify

mySpoti = document.getElementById('but1')

mySpoti.onclick = () => {
    let val = document.getElementById('form-url').value

    let spotUrl = 'https://open.spotify.com/embed'
    let newValue = spotUrl + val.split('com')[1]

    document.getElementById('spoti-play').setAttribute('src', newValue)
    document.getElementById('form-url').value = ''
}


// Player

function controlPlay(a){
    let myAudio = document.getElementById("audio-" + String(a))
    let mybutAudio = document.getElementById("im-" + String(a))
    if (myAudio.paused){
        myAudio.play()
        mybutAudio.setAttribute('src', 'pause.png')
    }else{
        myAudio.pause()
        mybutAudio.setAttribute('src', 'free-icon-play-button-153752.png')
    }    
}


// Volume

function setVolume(a) {
    let audio = document.getElementById("audio-" + String(a))
    let volume = document.getElementById("volume-" + String(a))

    audio.volume = volume.value / 100

}


// Image room


let imageRoom = document.getElementById("backImg");

function setImage(id) {
    imageRoom.setAttribute("src", id)
}