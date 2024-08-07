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
// Player Movement

let isFalling = false;
let playerObject = getFirst(player); // get the player object once

onInput("w", () => {
  console.log("Jumping!");
  if (!isFalling) {
    playerObject = getFirst(player); // update playerObject
    playerObject.y -= 2; // move player up
    isFalling = true;
    fall(playerObject); // pass the player object to the fall function
  }
})

onInput("a", () => {
  playerObject = getFirst(player); // update playerObject
  playerObject.x -= 1; // move player left
})

onInput("d", () => {
  playerObject = getFirst(player); // update playerObject
  playerObject.x += 1; // move player right
})

function fall() {
  const intervalId = setInterval(() => {
    const floors = getAll(floor);
    let isCollidingWithFloor = false;
    for (const floor of floors) {
      if (isColliding(playerObject, floor)) {
        isCollidingWithFloor = true;
        break;
      }
    }
    if (isCollidingWithFloor) {
      isFalling = false;
      console.log("Landed on floor!");
      clearInterval(intervalId); // stop the interval when the player lands
    } else {
      playerObject.y += 0.5; // move player down by 0.5 pixels
      isFalling = true;
    }
  }, 30); // adjust the interval to 30ms for a slower fall
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

// Check if the player is falling every frame
setInterval(() => {
  playerObject = getFirst(player); // update playerObject
  if (!isFalling) {
    if (!isColliding(playerObject)) {
      isFalling = true;
      fall(playerObject);
    }
  }
}, 30);
