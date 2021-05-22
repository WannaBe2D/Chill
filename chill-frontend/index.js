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
                let item = ` <button id="pl-${list[n].id}" onclick="controlPlay(${list[n].id})">Play</button>
                <figure>
                    <figcaption>${list[n].name}</figcaption>
                    <audio id="audio-${list[n].id}"
                        controls
                        src="${list[n].music}">
                            Your browser does not support the
                            <code>audio</code> element.
                    </audio>
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

    wrapperRooms.innerHTML += `<div>${roomsJson[numRoom].name}<br>${roomsJson[numRoom].sound}</div>`
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
        wrapperRooms.innerHTML += `<div>${roomsJson[numRoom].name}<br>${roomsJson[numRoom].sound}</div>`
        

        let roomsJsonSound = roomsJson[numRoom].sound
        for(let g in roomsJsonSound){
            buildSound(roomsJsonSound[g])
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
}


// Player

function controlPlay(a){
    let myAudio = document.getElementById("audio-" + String(a))
    if (myAudio.paused){
        myAudio.play()
    }else{
        myAudio.pause()
    }    
}