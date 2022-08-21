const slider = document.querySelector("#slider")
const colourPicker = document.querySelector("#colourPicker")
const grid = document.querySelector(".grid")
const randomCP = document.querySelector("#random")
const invertCP = document.querySelector("#invert")
const sliderText = document.querySelector('label[for="slider"]')
let hoverColor = "white"
let gridSize = slider.value
function inverse(hex) {
    let r=0,g=0,b=0
    r = (255 - parseInt(hex.slice(1, 3), 16)).toString(16)
    g = (255 - parseInt(hex.slice(3, 5), 16)).toString(16)
    b = (255 - parseInt(hex.slice(5, 7), 16)).toString(16)
    return `#${padZero(r)}${padZero(g)}${padZero(b)}`
}

function padZero(str, len=2) {
    var zeroes = new Array(len).join('0')
    return (zeroes + str).slice(-len)
}

function changeBackground(e) {
    const backColor = (e && e.target.value) || colourPicker.value
    grid.style.backgroundColor = backColor
    hoverColor = inverse(backColor)
    document.body.style.color = hoverColor
    slider.style.color = hoverColor
    createGrid()
}

function changeSize(e) {
    gridSize = e.target.value
    createGrid()
}
function getHex(value) {
    hexString = value.toString(16);
    return hexString;
}
function getRandomColour() {
    const r = Math.floor(Math.random()*255)
    const g = Math.floor(Math.random()*255)
    const b = Math.floor(Math.random()*255)
    return `#${padZero(getHex(r))}${padZero(getHex(g))}${padZero(getHex(b))}`
}
function hoverEffect(e) {
    let chosenColor = ""
    if(randomCP.checked) {
        chosenColor = getRandomColour(0)
    }
    else {
        chosenColor = hoverColor
    }
    e.target.style.backgroundColor = chosenColor
    let r=0,g=0,b=0
    r = parseInt(chosenColor.slice(1, 3), 16)
    g = parseInt(chosenColor.slice(3, 5), 16)
    b = parseInt(chosenColor.slice(5, 7), 16)
    let val = r+g+b
    val = Math.floor((val/765)*4000)+1000
    console.log(val)
    const playSound = document.querySelector("#sound")
    console.log(playSound.value)
    if(playSound.checked) {
        playNote(val,'square')
    }
}
function createGrid() {
    sliderText.textContent = `${gridSize} X ${gridSize}`
    grid.innerHTML = ''
    let gridRows = ""
    for(let i=0;i<gridSize;++i) {
        gridRows = `${gridRows} auto`
        for(let j=0;j<gridSize;++j) {
            const newCell = document.createElement('div')
            newCell.classList.add("grid-item")
            newCell.addEventListener('mouseover', hoverEffect)
            grid.appendChild(newCell)
        }
    }
    grid.style["grid-template-columns"] = gridRows
}

var context=new AudioContext();
var o=null;
var g=null;
function playNote(frequency, type) {
    o = context.createOscillator();
    g = context.createGain();
    o.type = type;
    o.connect(g);
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
}

colourPicker.addEventListener("input", changeBackground)
slider.addEventListener("input", changeSize)
createGrid()
changeBackground()
