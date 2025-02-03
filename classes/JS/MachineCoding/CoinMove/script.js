let coinPosition = { x: 0, y: 0 };
let gridSize = 2;
let gridDeminsion;

function generateGrid() {
  gridSize = parseInt(document.getElementById("gridSize").value);
  const totalCells = 4 * gridSize * gridSize;
  gridDeminsion = Math.sqrt(totalCells);

  const gridContainer = document.getElementById("gridContainer");
  coinPosition = { x: 0, y: 0 };
  gridContainer.innerHTML = "";

  for (let ri = 0; ri < gridDeminsion; ri++) {
    const div = document.createElement("div");
    div.className = "grid-row";
    for (let ci = 0; ci < gridDeminsion; ci++) {
      const span = document.createElement("span");
      span.className = "grid-item";
      span.setAttribute("data-x", ri);
      span.setAttribute("data-y", ci);
      if (ri === coinPosition.x && ci === coinPosition.y) {
        span.innerHTML = "🪙";
      }
      div.appendChild(span);
    }
    gridContainer.appendChild(div);
  }
}

function moveCoin(direction) {
  const gridContainer = document.getElementById("gridContainer");
  const rows = gridContainer.getElementsByClassName("grid-row");
  const currentCell = rows[coinPosition.x].children[coinPosition.y];

  let newCell;

  if (direction === "up" && coinPosition.x > 0) {
    newCell = rows[coinPosition.x - 1].children[coinPosition.y];
    coinPosition.x--;
  } else if (direction === "down" && coinPosition.x < gridDeminsion - 1) {
    newCell = rows[coinPosition.x + 1].children[coinPosition.y];
    coinPosition.x++;
  } else if (direction === "left" && coinPosition.y > 0) {
    newCell =
      currentCell.previousElementSibling ||
      rows[coinPosition.x].children[coinPosition.y - 1];
    coinPosition.y--;
  } else if (direction === "right" && coinPosition.y < gridDeminsion - 1) {
    newCell =
      currentCell.nextElementSibling ||
      rows[coinPosition.x].children[coinPosition.y + 1];
    coinPosition.y++;
  }

  if (newCell) {
    currentCell.innerHTML = "";
    newCell.innerHTML = "🪙";
  }

  console.log("rows : ", rows);
  console.log("currentCell : ", currentCell);
}

window.addEventListener("load", generateGrid);
