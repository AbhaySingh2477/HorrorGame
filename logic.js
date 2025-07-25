/*This will contain the state of the rooms*/
const ImagesPath = {
    room1:"BackgroundImages/startroom.png",
    room2:"BackgroundImages/backyard.png"
}

let Asset = [
    {name: 'BackgroundImages/Hammer.png' ,picked :1 ,categoty: 'item'},
    {name: 'BackgroundImages/map.png',picked:1 ,category : 'map' , other:'BackgroundImages/mapForm.png'},
    
]

let inventory = [];


let startRoomcode = [`<div id = "display-content"

 style = '
 background:url(${ImagesPath.room1});
 background-repeat: no-repeat;
 background-size: contain;
 height: 700px;
 width: 700px;
 
 
 position:absolute;
 

 z-index: 0;'>
                        </div>


     <div class="eyes-container">
        <div class="eye left">
            <div class="pupil"></div>
        </div>
        <div class="eye right">
            <div class="pupil"></div>
        </div>
      </div>
    <div class = 'clickable' style = '  
    height:80px;
    width:40px;
    background-color: white;
    opacity:0%;
    position: absolute;
    left:50px;
    bottom:120px;
    z-index: 5;
    ' id = "doornext" onclick = 'StartRoomToBackyard()'>

                       </div>

    <div id ='clue1' style ='
height :200px;
width: 100px;
background:white;
position:absolute;
z-index :3;
right:5px;
opacity:0%;
bottom:100px;'

onclick = 'pickclue1()'

> </div>
                       
                       `]

                       

//For Backyard
let backyardcode =  [`
            <div id = "display-content"
 style = 'background: url(${ImagesPath.room2});
background-repeat: no-repeat;
background-size: contain;
 height: 700px;
 width: 700px;
 animation:  brokenMonitor  0.05s linear infinite;

 position:absolute;
 z-index: 0;'>
            </div>
            <div class = 'clickable' style = '
  
    background-image:
    url(${Asset[0].name});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position:absolute;
    backface-visibility: hidden ;
    height:200px ;
    width:150px;
    z-index:1;
    transform: rotate(120deg);
    opacity: ${(Asset[0].picked)*100}%;
    left:410px;
    bottom:50px;
    ' id = "hammer"
    onclick ='picktheitem(0,"hammer")'>
            </div>
                           
    
            <div id = 'backbutton' 
            
    style = 
    '
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color:lightgray;
    z-index: 1;
    position: absolute;
    opacity:50%;
    right:40px;
    color:black;
    display: flex;
    justify-content: center;
    align-items: center;'>
GO</div>

<div style = '
position:relative;
z-index:2;
height:379px;
width:201px;
background:white;
top:50px;
opacity:0%;


' id = "door1" onclick = "BackyardToBasement()"
></div>

<div id = 'backMap'

style = '
height:100px;
width:100px;
position:absolute;
background:white;
left:20px;
opacity:0%;
bottom:10px;
z-index :3;

' onclick = 'picktheitem(1,"backMap")'></div>

`]


function updatestate(){
  backyardcode =  [`
            <div id = "display-content"
 style = 'background: url(${ImagesPath.room2});
background-repeat: no-repeat;
background-size: contain;
 height: 700px;
 width: 700px;
 animation:  brokenMonitor  0.05s linear infinite;

 position:absolute;
 z-index: 0;'>
            </div>
            <div class = 'clickable' style = '
  
    background-image:
    url(${Asset[0].name});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position:absolute;
    backface-visibility: hidden ;
    height:200px ;
    width:150px;
    z-index:1;
    transform: rotate(120deg);
    opacity: ${(Asset[0].picked)*100}%;
    left:410px;
    bottom:50px;
    ' id = "hammer"
    onclick ='picktheitem(0,"hammer")'>
            </div>
                           
    
            <div id = 'backbutton' 
            
    style = 
    '
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color:lightgray;
    z-index: 1;
    position: absolute;
    opacity:50%;
    right:40px;
    color:black;
    display: flex;
    justify-content: center;
    align-items: center;'>
GO</div>

<div style = '
position:relative;
z-index:2;
height:379px;
width:201px;
background:white;
top:50px;
opacity:0%;


' id = "door1" onclick = "BackyardToBasement()"
></div>

<div id = 'backMap'

style = '
height:100px;
width:100px;
position:absolute;
background:white;
left:20px;
opacity:0%;
bottom:10px;
z-index :3;

' onclick = 'picktheitem(1,"backMap")'></div>

`]


}





class room {

    constructor(imagePath, state = {},htmlCodeforstate,itemsID = [],identiyCode = [],parent,children = []){
        this.imagePath = imagePath;
        this.htmlCodeforstate = htmlCodeforstate;
        this.state = state;
        this.itemsID = itemsID;
        this.identiyCode = identiyCode;
        this.parent = parent;
        this.children = children;
    }


  
}

//creating the rooms and it state
let startRoom = new room('BackgroundImages/startroom.png',{locked : false},startRoomcode,[ ],['doornext'],null,[ImagesPath.room2])
let backyard  = new room('BackgroundImages/backyard.png',{locked : false},backyardcode,['hammer'],['backbutton','backMap'],startRoom,[])



let currentroom = startRoom;
let display = document.getElementById('display')

function getCurrentRoom(){
    return currentroom;
}

function renderGame(){
   const instant = getCurrentRoom()
   display.innerHTML = instant.htmlCodeforstate[0] 
   
   const backtotheroom = document.getElementById(`backbutton`)
   console.log(instant.parent)
   
   if(backtotheroom != null){
   backtotheroom.addEventListener('click', () =>{
       currentroom = instant.parent;
       renderGame()
   })
}
}

renderGame()


function StartRoomToBackyard(){
     currentroom = backyard;
     renderGame();
}


//to be change
function BackyardToBasement(){
const audio = document.getElementById('lockeddoor');

audio.currentTime = 0.5;
audio.play();

setTimeout(() =>{
  audio.pause();
  audio.currentTime = 0.5
},2000);


}



const items = document.querySelectorAll('.items');
const clicksound = document.getElementById('clicks');

items.forEach(item => {
  item.addEventListener('click', () => {
    selecting(item);
    clicksound.currentTime = 0;  // Restart sound

  
    clicksound.play()
   
      .then(() => {
        // Optional: pause after 500ms
        setTimeout(() => {
          clicksound.pause();
          clicksound.currentTime = 0;
        }, 500);
      })
      .catch(error => {
        console.error('Playback failed:', error);
      });
  });
});



//function to pick the item
function picktheitem(Code,identity){
    const element = document.getElementById(identity);
    element.style.display = 'none'
    

    //1 means not picked remember
    if(Asset[Code].picked == 1){
        inventory.push(Asset[Code]);
        
        const slot = document.getElementById(`item${inventory.length}`);
        console.log(inventory);
        console.log(currentroom.htmlCodeforstate[0])
     
        
        

        slot.style.backgroundImage = `url(${inventory[inventory.length - 1].name})`;
        slot.style.backgroundSize = 'cover';
        slot.style.backgroundPosition = 'center';
        Asset[Code].picked = 0;
        updatestate()
        console.log(backyardcode[0])

        if(currentroom === backyard){
        currentroom.htmlCodeforstate[0] = backyardcode[0];
        }
        
        slot.classList.add('inventory-animation');


        const pick = document.getElementById('pickaxe');
        pick.currentTime = 2;
        pick.play();
        setTimeout(()=>{
            pick.pause();
            pick.currentTime = 2;
        },2000);
        }

}
function handclick(iteml, itemS, mapclicker) {
  const Content = document.getElementById('display-content');
  const el = document.getElementById('mapviewer');

  el.style.backgroundImage = `url('BackgroundImages/viewhover.png')`;
  Content.style.backgroundImage = `url(${iteml.other})`;
  Content.style.zIndex = '99';

  const pl = document.getElementById('mapopen');
  pl.currentTime = 0;
  pl.play();

  setTimeout(() => {
    Content.style.backgroundImage = `url(${currentroom.imagePath})`;
    Content.style.zIndex = '1';
    itemS.style.border = `2px solid rgb(89, 165, 202)`;
    el.style.backgroundImage = `url('BackgroundImages/view.png')`;
  }, 2000);

  // Remove the event listener after first click
  el.removeEventListener('click', mapclicker);
}

function selecting(itemS) {
  const str = itemS.id;
  const num = str.match(/\d+/);
  const itemnumber = parseInt(num[0], 10);

  if (!inventory[itemnumber - 1]) {
    console.log('empty');
    return;
  }

  itemS.style.border = `2px solid rgb(228, 228, 74)`;
  const iteml = inventory[itemnumber - 1];

  if (iteml.category === 'map') {
    const el = document.getElementById('mapviewer');

    // Remove old event listener first (if it exists)
    if (el.mapclickerRef) {
      el.removeEventListener('click', el.mapclickerRef);
    }

    // Create new listener with closure (and self reference for removal!)
    const mapclicker = () => handclick(iteml, itemS, mapclicker);

    // Store reference
    el.mapclickerRef = mapclicker;

    // Add listener
    el.addEventListener('click', mapclicker);
  }
}


function pickclue1(){

  const ele = document.getElementById('clue1');
  ele.style.opacity = '100%';
  ele.style.right ='25%';
  ele.style.bottom = '25%';
  ele.style.height = '250px';
  ele.style.width = '250px';
  ele.style.background = `url('BackgroundImages/clue1.png')`;
  ele.style.backgroundRepeat = 'no-repeat';
  ele.style.backgroundSize = 'contain';
  ele.style.backgroundPosition = 'center';

  setTimeout(() => {
  
  ele.style.opacity = '0%';
  ele.style.right ='5px';
  ele.style.bottom = '100px';
  ele.style.height = '200px';
  ele.style.width = '100px';
  ele.style.background = `white`;
  ele.style.backgroundRepeat = 'no-repeat';
  ele.style.backgroundSize = 'contain';
  ele.style.backgroundPosition = 'center';
    
  }, 1000);

}

  function play1(){

    const bgm = document.getElementById('Backgroundplay');
    const sn =  document.getElementById('windy');
    bgm.currentTime = 2;
    bgm.loop = true;
    bgm.play();

    sn.currentTime = 0;
    sn.loop = true;
    sn.play();
  }
