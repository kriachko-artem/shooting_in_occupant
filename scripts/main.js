
const canvas = document.getElementById('canvas');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const score = document.getElementById('score');

const ctx = canvas.getContext('2d');


const canvasParameters = {
  width:canvas.clientWidth,
  height:canvas.clientHeight,
  backgroundColor: 'lightblue',
}
const plane = {
  positionX: -30,
  positionY: 50,
  width: 30,
  heigh: 3,
  hit: false,
  inArea: false,
}
let pl;

const gunParameters = {
  width: 20,
  height: 20,
  positionX: (canvasParameters.width/2) - 10,
  positionY: canvasParameters.height - 20,
  color: 'red',
  bullet: {
    width: 6,
    height: 6,
  },
}

let isGameStarted = false;

function drawGun (){
  ctx.fillRect(gunParameters.positionX,gunParameters.positionY,gunParameters.width,gunParameters.height)
  requestAnimationFrame(drawGun)
}


const start = {
  x: gunParameters.positionX,
  y: gunParameters.positionY,
}




canvas.style.backgroundColor = canvasParameters.backgroundColor;
ctx.fillStyle = gunParameters.color;
ctx.fillRect(gunParameters.positionX,gunParameters.positionY,gunParameters.width,gunParameters.height)

let NewPlane = function  (){
  const newPlane = {...plane}
  newPlane.speed = +(parseInt((Math.random()*10))/5)+1
  function movePlane(){
    ctx.clearRect(0,0,canvasParameters.width,canvasParameters.height)
    newPlane.positionX += newPlane.speed
    ctx.fillRect(newPlane.positionX,newPlane.positionY,newPlane.width,newPlane.heigh)
    if (isGameStarted === false){
      ctx.clearRect(0,0,canvasParameters.width,canvasParameters.height)
    } else if ((newPlane.positionX>canvasParameters.width) ||
        (newPlane.hit === true)) {
      NewPlane()
    } else {
      requestAnimationFrame(movePlane)
    }
    pl = newPlane
  }
  movePlane()
}
function shoot (event){
  let newBullet = {...start};
  const bulletStep = {
    x: (event.offsetX-newBullet.x)/60,
    y: (event.offsetY-newBullet.y)/60,
  }

  function drawBullet (){
    newBullet.x = newBullet.x + bulletStep.x
    newBullet.y = newBullet.y + bulletStep.y
    if ((newBullet.x > pl.positionX) && (newBullet.x < pl.positionX+pl.width) &&
        (newBullet.y < pl.positionY + pl.heigh) && (newBullet.y > pl.positionY-5)){
      pl.hit = true;
      +score.innerText++;

    }

    if (isGameStarted === true){
      if ((newBullet.x > 0 && newBullet.x < canvasParameters.width)&&(newBullet.y > 0 && newBullet.y < canvasParameters.height)){
        ctx.fillRect(newBullet.x,newBullet.y,gunParameters.bullet.width,gunParameters.bullet.height)
      }}
    requestAnimationFrame(drawBullet)
    return newBullet;
  }
  drawBullet()
}
function showResult (){
  if (+score.innerText === 0 ){
    alert(`HAHAHAHA! LOOSER!!`)
  } else if ((score.innerText > 0) && (score.innerText <= 5)){
    alert(`Hmm.. Not bad!`)
  } else if (score.innerText > 5){
    alert(`Very GOOD!`)
  }
}


function game (){
  score.innerText = 0;
  if (isGameStarted === false){
    ctx.clearRect(0,0,canvasParameters.width,canvasParameters.height);
    ctx.fillRect(gunParameters.positionX,gunParameters.positionY,gunParameters.width,gunParameters.height)
    isGameStarted = true;
    NewPlane()
    drawGun()




    canvas.addEventListener('click',shoot )
  }
  }

  startButton.addEventListener('click',game);
  stopButton.addEventListener('click',function (){
    showResult()
    isGameStarted = false;
})
