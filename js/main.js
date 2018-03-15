const tilesContainer = document.querySelector('.tiles');
const tilesAll = Array.prototype.slice.call( document.querySelectorAll('.tile'));
let initializationTileClass = tilesAll[0].className;
const tilesColor = [
  'red',
  'blue',
  'orange',
  'grey',
  'green',
  'purple',
  'darkcyan',
  'coral'
];
let tilesArr = [];
const MAX_COUNT_COLOR = 2;
const CLOSE_TIME = 500;

let restartGameBtn = document.querySelector('#restart-game');

restartGameBtn.addEventListener('click', startNewGame);

function startNewGame() {
  setClearTiles(tilesAll);
  closeTiles(tilesAll);
  initializationTileClass = tilesAll[0].className;
  roundCount = 0;
  setRandomColorToAllTiles();
}

function setClearTiles(tiles) {
  tiles.forEach((tile) => {
    tile.className = 'tile';
  })
}

setRandomColorToAllTiles();

tilesContainer.addEventListener('click', (evt) => {
  let {target} = evt;

  if (target.classList.contains('tile')) {
    tilesArr.push(target);
    target.classList.remove('tile--close');

    if(tilesArr.length === 2) {
      chooseTwoTile(tilesArr);
      tilesArr = [];
      setRoundCount();
    }
  }
})

function setRandomColorToAllTiles() {
  tilesColor.forEach((color) => {
    for (let i=0; i < MAX_COUNT_COLOR; i++) {
      setTileColor(color);
    }
  });
}

function setTileColor(color) {
  let indexTile = getFreeIndexTile();

  tilesAll[indexTile].classList.add('tile--' + color);
}

function getFreeIndexTile() {
  let indexTile = 0;

  while(tilesAll[indexTile].className !== initializationTileClass) {
    indexTile = getRandomIndex(tilesAll.length);
  }
  return indexTile;
}

function getRandomIndex(max) {
  return Math.floor(Math.random()*max);
}

function chooseTwoTile(tiles) {
  const [firstTile, secondTile] = tiles;
  validIdenticalTile(firstTile, secondTile, CLOSE_TIME);
}

function validIdenticalTile(tile1, tile2, closeTime) {
  if(tile1.className !== tile2.className  || tile1 === tile2) {
    setTimeout(closeTiles, closeTime, [tile1, tile2]);
  }
}

function closeTiles(tiles) {
  tiles.forEach((tile) => {
    if(!tile.classList.contains('tile--close')) {
      tile.classList.add('tile--close')
    }
  });
}

let roundCountContainer = document.querySelector('.round__count');
let roundCount = 0;

function setRoundCount() {
  roundCountContainer.innerHTML = ++roundCount;
}
