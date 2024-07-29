const player = "p"
const floor = "f"
setLegend(
  [ player, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ] ,
  [ floor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ]
)

setSolids([ player, floor])

let level = 0
const levels = [
  map`
.....................f
.....................f
.................f...f
p...............ff...f
ff.fff.fff.fff.fff...f
ffffffffffffffffffffff`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let isFalling = false;
let playerObject = getFirst(player); 

onInput("w", () => {
  console.log("Jumping!");
  if (!isFalling) {
    playerObject = getFirst(player); 
    playerObject.y -= 2; 
    isFalling = true;
    fall(playerObject); 
  }
})

onInput("a", () => {
  playerObject = getFirst(player); 
  playerObject.x -= 1; 
})

onInput("d", () => {
  playerObject = getFirst(player); 
  playerObject.x += 1; 
})

function fall(player) {
  const intervalId = setInterval(() => {
    const floors = getAll(floor);
    let isCollidingWithFloor = false;
    for (const floor of floors) {
      if (isColliding(player, floor)) {
        isCollidingWithFloor = true;
        break;
      }
    }
    if (isCollidingWithFloor) {
      isFalling = false;
      console.log("Landed on floor!");
      clearInterval(intervalId); 
    } else {
      player.y += 0.5; 
      isFalling = true;
    }
  }, 30); 
}

function isColliding(player) {
  const floors = getAll(floor);
  for (const floor of floors) {
    if (player.x === floor.x && player.y + 1 >= floor.y) {
      return true;
    }
  }
  return false;
}


setInterval(() => {
  playerObject = getFirst(player); 
  if (!isFalling) {
    if (!isColliding(playerObject)) {
      isFalling = true;
      fall(playerObject);
    }
  }
}, 30);
