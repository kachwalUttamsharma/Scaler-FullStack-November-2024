const starContainer = document.querySelector("#star_container");
const starArr = document.querySelectorAll(".star");
const countVal = document.querySelector("#count");

starContainer.addEventListener("click", (e) => {
  const elem = e.target;
  const isRequired = elem.hasAttribute("idx");
  if (!isRequired) {
    return;
  }
  const rating = parseInt(elem.getAttribute("idx"));
  fillStar(rating);
});

starContainer.addEventListener("mouseover", (e) => {
  const elem = e.target;
  const isRequired = elem.hasAttribute("idx");
  if (!isRequired) {
    return;
  }
  const rating = parseInt(elem.getAttribute("idx"));
  changeStars(rating);
});

starContainer.addEventListener("mouseleave", (e) => {
  changeStars(countVal.textContent);
});

function fillStar(rating) {
  countVal.innerText = rating;
  changeStars(rating);
}

function changeStars(rating) {
  for (let i = 0; i < starArr.length; i++) {
    starArr[i].classList.remove("yellow");
  }
  for (let i = 0; i < rating; i++) {
    starArr[i].classList.add("yellow");
  }
}
