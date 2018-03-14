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

console.log(tilesAll)
const maxCountColor = 2;

tilesColor.forEach(function(color) {
  for (let i=0; i < maxCountColor; i++) {
    setTileColor(color);
  }
})

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


tilesContainer.addEventListener('click', function(evt) {
  evt.target.classList.remove('tile--close');
})
