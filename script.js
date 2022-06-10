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
function getRandomColour() {
    const r = Math.floor(Math.random()*255)
    const g = Math.floor(Math.random()*255)
    const b = Math.floor(Math.random()*255)
    return `#${padZero(r)}${padZero(g)}${padZero(b)}`
}
function hoverEffect(e) {
    if(randomCP.checked) {
        e.target.style.backgroundColor = getRandomColour(0)
    }
    else {
        e.target.style.backgroundColor = hoverColor
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

colourPicker.addEventListener("input", changeBackground)
slider.addEventListener("input", changeSize)
createGrid()
changeBackground()
