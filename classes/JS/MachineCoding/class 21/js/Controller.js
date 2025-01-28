// This is the file from all the function will start working
const outputJSON = {
    "SELECTED_PRODUCTS": {
        // "1": {
        //     "PRODUCT_ID": 1,
        //     "QUALITY": 2,
        // },
        // "2": {
        //     "PRODUCT_ID": 1,
        //     "QUALITY": 2,
        // }
    },
    "TOTAL_PRODUCTS": 0,
    "TOTAL_PRICE": 0,
}
const productJSON = {
    "1": {
        "IMAGES": {
            "MAIN": "./images/apple-iphone-13-0001.jpg",
            "THUMBNAILS": [
                "./images/apple-iphone-13-0001.jpg",
                "./images/apple-iphone-13-0002.jpg",
                "./images/apple-iphone-13-0003.jpg"
            ]
        },
        "TITLE": "Apple iPhone 13",
        "DESCRIPTION": "The Apple iPhone 13 features a sleek design, advanced cameras, and powerful performance, making it ideal for everyday use.",
        "PRICE": 50000,
        "MAX_QUALITY": 4,
        "OUT_OF_ORDER": false,
        "NOT_AVAILABLE": false
    },
    "2": {
        "IMAGES": {
            "MAIN": "./images/apple-iphone-15-0001.jpg",
            "THUMBNAILS": [
                "./images/apple-iphone-15-0001.jpg",
                "./images/apple-iphone-15-0002.jpg",
                "./images/apple-iphone-15-0003.jpg"
            ]
        },
        "TITLE": "Apple iPhone 15",
        "DESCRIPTION": "Experience cutting-edge technology with the Apple iPhone 15, offering advanced features and exceptional performance.",
        "PRICE": 65000,
        "MAX_QUALITY": 5,
        "OUT_OF_ORDER": false,
        "NOT_AVAILABLE": false
    },
    "3": {
        "IMAGES": {
            "MAIN": "./images/iphone-16-128-gb-0001.jpg",
            "THUMBNAILS": [
                "./images/iphone-16-128-gb-0001.jpg",
                "./images/iphone-16-128-gb-0002.jpg",
                "./images/iphone-16-128-gb-0003.jpg"
            ]
        },
        "TITLE": "iPhone 16 128 GB",
        "DESCRIPTION": "The iPhone 16 with 128 GB storage offers ample space for your data and delivers top-notch performance for all your needs.",
        "PRICE": 200000,
        "MAX_QUALITY": 5,
        "OUT_OF_ORDER": false,
        "NOT_AVAILABLE": false
    },
    "4": {
        "IMAGES": {
            "MAIN": "./images/iphone-16-pro-128-gb-0001.jpg",
            "THUMBNAILS": [
                "./images/iphone-16-pro-128-gb-0001.jpg",
                "./images/iphone-16-pro-128-gb-0002.jpg",
                "./images/iphone-16-pro-128-gb-0003.jpg"
            ]
        },
        "TITLE": "iPhone 16 Pro 128 GB",
        "DESCRIPTION": "The iPhone 16 Pro with 128 GB combines professional-grade features with superior design and performance.",
        "PRICE": 500000,
        "MAX_QUALITY": 2,
        "OUT_OF_ORDER": true,
        "NOT_AVAILABLE": false
    },
    "5": {
        "IMAGES": {
            "MAIN": "./images/iphone-16-pro-128-gb-0002.jpg",
            "THUMBNAILS": [
                "./images/iphone-16-pro-128-gb-0001.jpg",
                "./images/iphone-16-pro-128-gb-0002.jpg",
                "./images/iphone-16-pro-128-gb-0003.jpg"
            ]
        },
        "TITLE": "iPhone 16 Pro 128 GB Pro",
        "DESCRIPTION": "The iPhone 16 Pro with 128 GB combines professional-grade features with superior design and performance.",
        "PRICE": 1000000,
        "MAX_QUALITY": 2,
        "OUT_OF_ORDER": false,
        "NOT_AVAILABLE": false
    }
}
const cart = document.querySelector(".cart");

// Add product to the product list
function addProductToCart({ productJSON, container }) {

    Array.from(container.children).forEach(tag => tag.remove());

    const HTML = Object.entries(productJSON).map(([key, value]) => {
        const { IMAGES: { MAIN, THUMBNAILS }, TITLE, DESCRIPTION, PRICE, MAX_QUALITY, OUT_OF_ORDER, NOT_AVAILABLE } = value;
        if (NOT_AVAILABLE) {
            return console.log(`${key} not available.`);
        }
        const imagesContainer = THUMBNAILS.map((URL) => `<img src="${URL}" class="img-fluid changeImage" alt="${TITLE}">`).join("");
        let itemQuantity = "";
        for (let index = 1; index <= MAX_QUALITY; index++) {
            itemQuantity += `<option value="${index}">${index}</option>`
        }
        const isAddedToCart = outputJSON["SELECTED_PRODUCTS"].hasOwnProperty(key);

        const outOfOrder = OUT_OF_ORDER ?
            `<button class="btn-cart out-of-order">Out of Order</button>` :
            `<button class="btn-cart addCart" data-cart="${isAddedToCart ? OUT_OF_ORDER : !OUT_OF_ORDER}">${isAddedToCart ? "Added to cart" : "Add to cart"}</button>`;
        return `<div class="cart-item" data-product="${key}">
                <div class="item-images">
                    <img src="${MAIN}" class="img-fluid" alt="${TITLE}">
                    <div class="images-container">
                        ${imagesContainer}
                    </div>
                </div>
                <div class="item-description">
                    <h3 class="item-title truncate">${TITLE}</h3>
                    <p class="item-info truncate">${DESCRIPTION}</p>
                    <p class="item-price">${PRICE} RS</p>
                    <div class="d-flex">
                        ${outOfOrder}
                        ${OUT_OF_ORDER ? "" :
                `<select name="quantity" class="item-quantity itemQuantity">${itemQuantity}</select>`}
                    </div>
                </div>
            </div>`;
    }).join('');
    container.insertAdjacentHTML("beforeend", HTML);
}
addProductToCart({ productJSON, container: cart });

// This function will render total cart sections
function renderCartSections({ outputJSON }) {
    const container = document.querySelector(".total");
    Array.from(container.children).forEach(tag => tag.remove());
    const { TOTAL_PRODUCTS } = outputJSON;
    let HTML = "";
    if (TOTAL_PRODUCTS) {
        const { SELECTED_PRODUCTS } = outputJSON;
        let total = 0;
        const products = Object.entries(SELECTED_PRODUCTS).map(([key, value]) => {
            const { IMAGES: { MAIN }, TITLE, PRICE } = productJSON[key];
            const { QUALITY } = value;
            total += QUALITY * PRICE;
            return `<li class="cart-item" data-product="${key}">
                    <img src="${MAIN}" class="img-fluid" alt="${TITLE}">
                    <div class="selected-cart-info">
                        <h3 class="truncate">${TITLE}</h3>
                       <div>
                            <p>QUALITY <span class="fw-bold">${QUALITY} * ${PRICE} RS</span></p>
                            <p>TOTAL <span class="fw-bold">${QUALITY * PRICE} RS</span></p>
                       </div>
                    </div>
                    <button class="remove-btn addCart" data-cart="false">&times;</button>
                </li>`
        }).join("");
        HTML = `<ul class="selected-cart">
                ${products}
                </ul>
                <div class="cart-total">
                    <h3 class="fw-normal">Cart Total:</h3>
                    <p class="total-price fw-bold">${total} RS</p>
                </div>
                <button class="checkout-btn checkoutBtn btn-cart">Checkout</button> 
            `
        outputJSON["TOTAL_PRICE"] = total;
        console.log(outputJSON)
    } else {
        HTML = `<div class="empty-cart">
                    <img src="./images/shopping.png" width="100" alt="empty cart">
                    <p>Don’t leave your cart empty!</p>
                </div>`
    }

    container.insertAdjacentHTML("beforeend", HTML);
}

renderCartSections({ outputJSON });
// THis function will handle all the events by the user
function navigator() {
    document.addEventListener("click", (Event) => {
        const targetElement = Event.target;
        if (targetElement.closest(".checkoutBtn")) {
            alert("Thanks for shopping");
        } else if (targetElement.closest(".changeImage")) {
            const cartItem = targetElement.closest(".cart-item");
            const URL = targetElement.closest(".changeImage").src;
            const itemImages = cartItem.querySelector(".item-images>img")
            itemImages.src = URL;
        } else if (targetElement.closest(".addCart")) {
            const addCart = targetElement.closest(".addCart");
            let buttonStatus = addCart.dataset.cart;
            const cartItem = targetElement.closest(".cart-item");
            const productID = cartItem.dataset.product;
            if (buttonStatus.toLowerCase() === "true") {
                const itemQuantity = +cartItem.querySelector(".itemQuantity").value;
                const { PRICE } = productJSON[productID];
                outputJSON["TOTAL_PRODUCTS"] = outputJSON["TOTAL_PRODUCTS"] + 1;
                outputJSON["SELECTED_PRODUCTS"] = {
                    ...outputJSON["SELECTED_PRODUCTS"],
                    [productID]: {
                        PRICE,
                        "QUALITY": itemQuantity
                    }
                };
                addCart.textContent = "Added to cart";
                addCart.dataset.cart = false;
            } else {
                outputJSON["TOTAL_PRODUCTS"] = outputJSON["TOTAL_PRODUCTS"] - 1;
                delete outputJSON["SELECTED_PRODUCTS"][productID];
                addCart.textContent = "Add to cart";
                addCart.dataset.cart = true;
            }

            renderCartSections({ outputJSON });
        }
    })
}
navigator();
