const url = "https://striveschool-api.herokuapp.com/books";

function createCard(book) {
  const parentToAppend = document.querySelector(".row");
  // parentToAppend.innerHTML = "";
  parentToAppend.innerHTML += `<div class="col-sm-6 col-md-4 col-lg-3 mb-3">
  <div class="card">
  <img src= ${book.img} class="card-img-top" alt="...">
  <div class="card-body d-flex flex-column justify-content-between">
  <h5 class="card-title">${book.title}</h5>
    <div class="button-container">
    <a href="#" class="btn btn-primary mb-2">Add to Cart</a>
    <a href="#" class="btn btn-primary">Skip</a>
    </div>
  </div>
</div>
</div>`;
}

function addEventListenersToCartRemoveButtons() {
  let removeButtonList = document.querySelectorAll(".remove");
  removeButtonList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const titleToRemove = btn.closest("div.title-container");
      console.log(titleToRemove);
      const theTitle = titleToRemove.querySelector("a");
      titleText = theTitle.innerText;
      let index = theCart.indexOf(titleText);
      theCart.splice(index, 1);
      titleToRemove.remove();
      const cardsList = document.querySelectorAll(".card");
      console.log(cardsList);
      cardsList.forEach((el) => {
        if (el.querySelector("h5").innerText === titleText) {
          el.classList.remove("added-to-cart");
          el.querySelector(
            ".card-body div.button-container a:first-child"
          ).innerText = "Add to Cart";
          el.querySelector(
            ".card-body div.button-container a:first-child"
          ).classList.add("bg-primary");
          el.querySelector(
            ".card-body div.button-container a:first-child"
          ).classList.remove("bg-info");
        }
      });
    });
  });
}

// emptyCartButton;
function empty() {
  const emptyCartButton = document.getElementById("empty");

  emptyCartButton.addEventListener("click", () => {
    const divsToRemove = document.querySelectorAll(
      "div.dropdown div.title-container"
    );
    console.log(divsToRemove);

    divsToRemove.forEach((el) => {
      console.log(el);
      el.remove();
    });
    const cardsList = document.querySelectorAll(".card");
    cardsList.forEach((el) => {
      el.classList.remove("added-to-cart");
      let addButton = el.querySelector("div.button-container a:first-child");
      addButton.innerText = "Add to Cart";
      addButton.classList.remove("bg-info");
      addButton.classList.add("bg-primary");
    });
    theCart = [];
  });
}

const cartButton = document.querySelector("#cart-button");

cartButton.addEventListener("click", () => {
  const divParent = document.querySelector(".dropdown-menu");
  // divParent.innerHTML = "";
  divParent.innerHTML = `<div id="initial-container">
  <a class="dropdown-item text-center bg-info font-weight-bold" href="#">
  ${theCart.length}
  </a>
  <div class="d-flex justify-content-center" style="width: 100%">
    <button id="empty" type="button" class="btn btn-warning my-3">
      Empty cart
    </button>
  </div>
</div>`;

  for (product of theCart) {
    divParent.innerHTML += `
    <div class="title-container">
    <a class="dropdown-item text-center" href="#">
      ${product}
    </a>
    <div class="d-flex justify-content-center" style="width:100%">
    <button type="button" class="remove btn btn-danger my-3">Remove</button>
    </div>
    </div>`;
  }

  addEventListenersToCartRemoveButtons();

  empty();
});

function removeCard() {
  const skipButtonList = document.querySelectorAll(
    ".button-container a:nth-child(2)"
  );
  skipButtonList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentCard = btn.closest(".card");
      const cardContainerToRemove = currentCard.parentElement;
      cardContainerToRemove.remove();
    });
  });
}

let theCart = [];

function addCard() {
  const addButtonList = document.querySelectorAll(
    ".button-container a:first-child"
  );
  addButtonList.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentCard = btn.closest(".card");
      currentCard.classList.add("added-to-cart");
      btn.innerText = "Added";
      btn.classList.add("d-block");
      btn.classList.remove("bg-primary");
      btn.classList.add("bg-info");
      currentTitle = currentCard.querySelector("h5");
      if (!theCart.includes(currentTitle.innerText))
        theCart.push(currentTitle.innerText);
    });
  });
}

const getTitles = async () => {
  let promiseResponse = await fetch(url);
  let jsonResponse = await promiseResponse.json();
  let result = await jsonResponse;
  console.log("result", result);
  result.forEach((el) => createCard(el));

  removeCard();
  addCard();

  const searchButton = document.querySelector("#button-addon2");
  const inputField = document.querySelector(".input-group input");

  inputField.addEventListener("input", () => {
    let arrayOfInputCards = [];
    if (inputField.value.length >= 3) {
      // console.log(inputField.value);
      result.filter((el) => {
        if (
          el.title.toLowerCase().includes(`${inputField.value}`.toLowerCase())
        ) {
          arrayOfInputCards.push(el);
        }
      });
    }
    if (arrayOfInputCards.length) {
      const parentToAppend = document.querySelector(".row");
      parentToAppend.innerHTML = "";
      arrayOfInputCards.forEach((el) => {
        createCard(el);
      });
    } else {
      const parentToAppend = document.querySelector(".row");
      parentToAppend.innerHTML = "";
      result.forEach((el) => createCard(el));
    }
  });
};

window.onload = getTitles;
