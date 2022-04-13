
const canvas = document.getElementById('canvas');
const canvasParameters = {
  width: window.innerWidth,
  height: window.innerHeight*0.6,
  backgroundColor: 'lightblue',
}
canvas.width = canvasParameters.width;
canvas.height = canvasParameters.height;
let gameParameters = {
  isGameStarted: false,
  numberBullets: 10,
  lifes: 3,
}
const startButton = document.querySelector('.start'),
    stopButton = document.querySelector('.stop'),
    score = document.getElementById('score'),
    lifes = document.querySelector('#lifes'),
    numberBullets = document.querySelector('#bullets');

lifes.innerHTML = gameParameters.lifes;
numberBullets.innerHTML = gameParameters.numberBullets;


const ctx = canvas.getContext('2d');





const plane = {
  positionX: -30,
  positionY: 20,
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





function game (){
  document.querySelector('.game_name').style.fontSize = '15px'
  gameParameters.isGameStarted = true;
  let newGameParameters = {...gameParameters}
  score.innerText = 0;
  lifes.innerHTML = newGameParameters.lifes;
  numberBullets.innerHTML = newGameParameters.numberBullets

  if (newGameParameters.isGameStarted === true){
    ctx.clearRect(0,0,canvasParameters.width,canvasParameters.height);
    ctx.fillRect(gunParameters.positionX,gunParameters.positionY,gunParameters.width,gunParameters.height)

    let NewPlane = function  (){
      const newPlane = {...plane}
      newPlane.speed = +(parseInt((Math.random()*10))/5)+1;
      newPlane.positionY = newPlane.positionY+(parseInt((Math.random()*100)))
      pl = newPlane
      function movePlane(){
        ctx.clearRect(0,0,canvasParameters.width,canvasParameters.height)
        newPlane.positionX += newPlane.speed
        ctx.fillRect(pl.positionX,pl.positionY,pl.width,pl.heigh)
        if (newGameParameters.isGameStarted === false){
          ctx.clearRect(0,0,canvasParameters.width,canvasParameters.height)
        } else if ((pl.positionX>canvasParameters.width)) {
          if (newGameParameters.numberBullets === 0){
            gameOver()
          }
          if (newGameParameters.lifes>0){
            NewPlane()
            newGameParameters.lifes--;
            if (newGameParameters.lifes <= gameParameters.lifes/3){
              lifes.style.color = 'red'
            } else if (newGameParameters.lifes <= gameParameters.lifes/3*2){
              lifes.style.color = 'orange'
            }
            lifes.innerHTML = newGameParameters.lifes
          } else gameOver()
        } else if (pl.hit === true){
          NewPlane()
        } else {
          requestAnimationFrame(movePlane)
        }

      }
      movePlane()
    }
    NewPlane()
    drawGun()



      function shoot (event){
      if ((newGameParameters.numberBullets>0)&&
          newGameParameters.isGameStarted === true){

        newGameParameters.numberBullets--
        if (newGameParameters.numberBullets <= gameParameters.numberBullets/3){
          numberBullets.style.color = 'red'
        } else if (newGameParameters.numberBullets <= gameParameters.numberBullets/3*2){
          numberBullets.style.color = 'orange'
        }
        numberBullets.innerHTML = newGameParameters.numberBullets

        let newBullet = {...start};
        const bulletStep = {
          x: (event.offsetX-newBullet.x)/60,
          y: (event.offsetY-newBullet.y)/60,
        }

        function drawBullet (){
          newBullet.x = newBullet.x + bulletStep.x
          newBullet.y = newBullet.y + bulletStep.y
          if ((newBullet.x > pl.positionX) && (newBullet.x < pl.positionX+pl.width) &&
              (newBullet.y < pl.positionY + pl.heigh) && (newBullet.y > pl.positionY-10)){
            pl.hit = true;
            +score.innerText++;
          }
          if (newGameParameters.isGameStarted === true){
            if ((newBullet.x > 0 && newBullet.x < canvasParameters.width)&&(newBullet.y > 0 && newBullet.y < canvasParameters.height)){
              ctx.fillRect(newBullet.x,newBullet.y,gunParameters.bullet.width,gunParameters.bullet.height)
            }}
          requestAnimationFrame(drawBullet)
          return newBullet;
        }
        drawBullet()
      }
    }
    canvas.addEventListener('click',shoot )



  }
  function showResult (){
   if (score.innerText > 20){
      alert(`Very GOOD!`)
    } else if (score.innerText > 15) {
     alert(`Hmm.. Not bad!`)
   } else if (score.innerText > 0) {
     alert(`So-so...`)
   } else if (+score.innerText === 0 ){
      alert(`HAHAHAHA! LOOSER!!`)
    }
  }
  function gameOver() {
    gameParameters.isGameStarted = false
    newGameParameters.isGameStarted = false;
    showResult()
  }
  stopButton.addEventListener('click',function (){
    if (newGameParameters.isGameStarted === true){
      showResult()
      gameParameters.isGameStarted = false;
      newGameParameters.isGameStarted = false
    }
  })
  }

  startButton.addEventListener('click',function (){
    if (gameParameters.isGameStarted === false){
      game()
    }
  });
