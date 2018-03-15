let tilesContainer = document.querySelector('.tiles');
let tilesAll = Array.prototype.slice.call( document.querySelectorAll('.tile'));
let initializationTileClass = tilesAll[0].className;
let tilesColor = [
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
  setRandomColor();
}

function setClearTiles(tiles) {
  tiles.forEach(function(tile) {
    tile.className = 'tile';
  })
}

setRandomColor();

tilesContainer.addEventListener('click', function(evt) {
  let target = evt.target;

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

function setRandomColor() {
  tilesColor.forEach(function(color) {
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
  let indexTile = getRandomIndex();

  while(tilesAll[indexTile].className !== initializationTileClass) {
    indexTile = getRandomIndex();
  }
  return indexTile;
}

function getRandomIndex() {
  return Math.floor(Math.random()*tilesAll.length);
}

function chooseTwoTile(tiles) {
  let firstTile = tiles[0];
  let secondTile = tiles[1];
  validIdenticalTile(firstTile, secondTile, CLOSE_TIME);
}

function validIdenticalTile(tile1, tile2, closeTime) {
  if(tile1.className !== tile2.className  || tile1 === tile2) {
    setTimeout(closeTiles, closeTime, [tile1, tile2]);
  }
}

function closeTiles(tiles) {
  tiles.forEach(function(tile){
    if(!tile.classList.contains('tile--close')) {
      tile.classList.add('tile--close')
    }
  });
}

let roundCountContainer = document.querySelector('.round__count');
let roundCount = 0

function setRoundCount() {
  roundCountContainer.innerHTML = ++roundCount;
}
