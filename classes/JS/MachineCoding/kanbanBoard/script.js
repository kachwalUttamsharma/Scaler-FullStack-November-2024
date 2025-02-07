const addBtn = document.querySelector(".add-btn");
const deleteBtn = document.querySelector(".remove-btn");
const modal = document.querySelector(".modal_cont");
const proritySetModal = document.querySelector(".priority-color-cont");
const prorityColorArray = document.querySelectorAll(".priority-color");
const mainContainer = document.querySelector(".main_cont");
const textArea = document.querySelector(".textarea-cont");
let currentColor = "green";
let deleteFlag = false;
const uid = new ShortUniqueId();

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});
deleteBtn.addEventListener("click", () => {
  if (!deleteFlag) {
    deleteBtn.style.color = "red";
  } else {
    deleteBtn.style.color = "black";
  }
  deleteFlag = !deleteFlag;
});

function createTicket(content, currentColor) {
  const id = uid();
  const ticketContainer = document.createElement("div");
  ticketContainer.setAttribute("class", "ticket-cont");
  ticketContainer.innerHTML = `<div class="ticket-color ${currentColor}"></div>
  <div class="ticket-id">${id}</div>
  <div class="ticket-area">${content}</div>
  <div class="lock-unlock">
    <i class="fa-solid fa-lock"></i>
  </div>`;
  mainContainer.appendChild(ticketContainer);
  deleteTask(ticketContainer, id);
}

function deleteTask(ticketContainer, id) {
  ticketContainer.addEventListener("click", (e) => {
    if (deleteFlag) {
      ticketContainer.remove();
    }
  });
}

modal.addEventListener("keydown", (e) => {
  if (e.key != "Enter") {
    return;
  }
  const content = e.target.value;
  createTicket(content, currentColor);

  // reset logic
  modal.style.display = "none";
  textArea.value = "";
  currentColor = "green";
  for (let i = 0; i < prorityColorArray.length; i++) {
    prorityColorArray[i].classList.remove("active");
  }
  prorityColorArray[2].classList.add("active");
  console.log(content);
});

proritySetModal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    return;
  }
  currentColor = e.target.classList[1];
  for (let i = 0; i < prorityColorArray.length; i++) {
    prorityColorArray[i].classList.remove("active");
  }
  e.target.classList.add("active");
});
