let gridSize = 4;
let defaultCellColor = "lightgray";
let pencilColor = "black";

let body = document.querySelector("body");
let colorPicker = document.getElementById("color-picker");
let eraser = document.getElementById("eraser");
let clearScreen = document.getElementById("clear");
let changeSize = document.getElementById("change-size");
let sizeLabel = document.getElementById("size-label");
let isMouseDown = false;
let isErasing = false;

function addPaintEvent(cell) {
    cell.addEventListener("mousemove", () => {
        if (isMouseDown) {
            if (isErasing) {
                pencilColor = defaultCellColor;
            } else {
                pencilColor = colorPicker.value;
            }
            cell.style.backgroundColor = pencilColor;
        }
    })
}

function createGrid() {
    let canvas = document.getElementById("canvas");
    canvas.style = "grid-template-columns: repeat(" + gridSize + ", 1fr); grid-template-rows: repeat(" + gridSize + ", 1fr);"

    let cellCount = gridSize * gridSize;
    let gridCells = document.querySelectorAll(".grid-cell");
    if (cellCount > gridCells.length) {
        for (let cells = 0; cells < cellCount - gridCells.length; cells++) {
            let cell = document.createElement("div");
            cell.draggable = false;
            cell.setAttribute("class", "grid-cell");
            cell.style.backgroundColor = defaultCellColor;
            canvas.appendChild(cell);

            addPaintEvent(cell);
        }
    } else {
        gridCells.forEach(cell => {
            gridCells = document.querySelectorAll(".grid-cell");
            if (gridCells.length > cellCount) {
                canvas.removeChild(cell);
            }
        })
    }
}

createGrid();

body.addEventListener("mousedown", () => {
    isMouseDown = true;
});

body.addEventListener("mouseup", () => {
    isMouseDown = false;
});

eraser.addEventListener("click", () => {
    isErasing = !isErasing;
    if (isErasing) {
        eraser.innerText = "Erasing";
        pencilColor = defaultCellColor;
    } else {
        eraser.innerText = "Eraser"
        pencilColor = colorPicker.value;
    }
})

clearScreen.addEventListener("click", () => {
    let gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(element => {
        element.style.backgroundColor = defaultCellColor;
    });
})

colorPicker.addEventListener("input", () => {
    if (!isErasing) {
        pencilColor = colorPicker.value;
    }
})

changeSize.addEventListener("input", () => {
    sizeLabel.innerText = changeSize.value + "x" + changeSize.value;
})

changeSize.addEventListener("change", () => {
    gridSize = changeSize.value;
    createGrid();
})