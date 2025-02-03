window.addEventListener("load", (e) => {
  let tableBody = document.querySelector("#tableBody");
  for (let ri = 0; ri < 8; ri++) {
    const tr = document.createElement("tr");
    for (let ci = 0; ci < 8; ci++) {
      const td = document.createElement("td");
      td.textContent = `${ri}-${ci}`;
      td.setAttribute("data-index", `${ri}-${ci}`);
      td.classList.add("box");
      if ((ri + ci) % 2 == 0) {
        td.classList.add("white");
      } else {
        td.classList.add("black");
      }
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
});

const table = document.querySelector(".table");
const tableBox = document.getElementsByClassName("box");

table.addEventListener("mouseleave", () => {
  for (let i = 0; i < tableBox.length; i++) {
    tableBox[i].classList.remove("yellow");
  }
});

table.addEventListener("mouseover", (e) => {
  const dataIndex = e.target.dataset.index;
  const [ri, ci] = dataIndex.split("-").map((idx) => parseInt(idx));
  const pathStorage = {};
  for (let i = 0; i < tableBox.length; i++) {
    tableBox[i].classList.remove("yellow");
  }
  pathStorage[dataIndex] = true;
  topLeft(ri, ci, pathStorage);
  topRight(ri, ci, pathStorage);
  bottomLeft(ri, ci, pathStorage);
  bottomRight(ri, ci, pathStorage);
  for (let i = 0; i < tableBox.length; i++) {
    if (pathStorage[tableBox[i].dataset.index] === true) {
      tableBox[i].classList.add("yellow");
    }
  }
});

function topLeft(ri, ci, pathStorage) {
  ri--;
  ci--;
  while (ri >= 0 && ci >= 0) {
    const dataIndex = `${ri}-${ci}`;
    pathStorage[dataIndex] = true;
    ri--;
    ci--;
  }
}

function topRight(ri, ci, pathStorage) {
  ri--;
  ci++;
  while (ri >= 0 && ci <= 7) {
    const dataIndex = `${ri}-${ci}`;
    pathStorage[dataIndex] = true;
    ri--;
    ci++;
  }
}

function bottomLeft(ri, ci, pathStorage) {
  ri++;
  ci--;
  while (ri <= 7 && ci >= 0) {
    const dataIndex = `${ri}-${ci}`;
    pathStorage[dataIndex] = true;
    ri++;
    ci--;
  }
}

function bottomRight(ri, ci, pathStorage) {
  ri++;
  ci++;
  while (ri <= 7 && ci <= 7) {
    const dataIndex = `${ri}-${ci}`;
    pathStorage[dataIndex] = true;
    ri++;
    ci++;
  }
}
