
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

updateCartCount();

const buttons = document.querySelectorAll(".add-btn");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.parentElement;

        const item = {
            name: card.getAttribute("data-name"),
            price: parseFloat(card.getAttribute("data-price")),
            img: card.getAttribute("data-img")
        };

        cart.push(item);
        saveCart();

        alert(`${item.name} added to cart!`);
    });
});



function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return; // Skip if not on cart page

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
        `;
        cartContainer.appendChild(div);
    });

    const totalEl = document.getElementById("cart-total");
    if (totalEl) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalEl.textContent = `$${total.toFixed(2)}`;
    }

    const removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            cart.splice(index, 1);
            saveCart();
            renderCart();
        });
    });
}

renderCart();
