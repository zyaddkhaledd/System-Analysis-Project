
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const totalEl = document.getElementById("total");

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function renderCart() {
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

        cartContainer.appendChild(div);
    });

    totalEl.textContent = total.toFixed(2);

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            renderCart();
        });
    });
}

updateCartCount();
renderCart();
