// =================================
// MERIZA — ИНТЕРНЕТ-МАГАЗИН
// =================================

let cart = [];

const whatsappNumber = "996559100603";
function chooseColor(color, button) {
    document.getElementById("lace-color").value = color;

    document.querySelectorAll(".color-swatch").forEach(item => {
        item.classList.remove("selected");
    });

    button.classList.add("selected");
}


// =================================
// ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ
// =================================

function addToCart(name, price, size, colorId) {

    const colorElement = document.getElementById(colorId);

    if (!colorElement || !colorElement.value) {
        alert("Пожалуйста, выберите цвет товара.");
        return;
    }

    const color = colorElement.value;

    const existingProduct = cart.find(item =>
        item.name === name &&
        item.size === size &&
        item.color === color
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            size: size,
            color: color,
            quantity: 1
        });
    }

    updateCart();

    openCart();
}


// =================================
// ОБНОВЛЕНИЕ КОРЗИНЫ
// =================================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    const cartCount = document.getElementById("cart-count");
    const floatingCount = document.getElementById("floating-cart-count");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Корзина пока пуста</p>";

    } else {

        cart.forEach((item, index) => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;
            count += item.quantity;

            const product = document.createElement("div");

            product.className = "cart-item";

            product.innerHTML = `
                <div class="cart-item-info">
                    <h3>${item.name}</h3>

                    <p>Цвет: ${item.color}</p>
                    <p>Размер: ${item.size}</p>
                    <p>Цена: ${item.price} сом</p>

                    <div class="cart-quantity">
                        <button onclick="changeQuantity(${index}, -1)">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>

                    <p>Сумма: ${itemTotal} сом</p>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})"
                    >
                        Удалить
                    </button>
                </div>
            `;

            cartItems.appendChild(product);

        });

    }

    cartTotal.textContent = total;
    cartCount.textContent = count;
    floatingCount.textContent = count;

}


// =================================
// ИЗМЕНЕНИЕ КОЛИЧЕСТВА
// =================================

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();

}


// =================================
// УДАЛЕНИЕ ТОВАРА
// =================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// =================================
// ОТКРЫТИЕ КОРЗИНЫ
// =================================

function openCart() {

    document.getElementById("cart").classList.add("active");

    document
        .getElementById("cart-overlay")
        .classList.add("active");

}


// =================================
// ЗАКРЫТИЕ КОРЗИНЫ
// =================================

function closeCart() {

    document.getElementById("cart").classList.remove("active");

    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}


// =================================
// ПЕРЕХОД К ОФОРМЛЕНИЮ
// =================================

function goToCheckout() {

    if (cart.length === 0) {
        alert("Ваша корзина пуста.");
        return;
    }

    closeCart();

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });

}


// =================================
// ОФОРМЛЕНИЕ ЗАКАЗА В WHATSAPP
// =================================

function checkout() {

    if (cart.length === 0) {
        alert("Сначала добавьте товар в корзину.");
        return;
    }

    const name = document.getElementById("customer-name").value.trim();

    const phone = document.getElementById("customer-phone").value.trim();

    const city = document.getElementById("customer-city").value.trim();

    const address = document.getElementById("customer-address").value.trim();

    const comment = document.getElementById("customer-comment").value.trim();


    if (!name || !phone || !city || !address) {

        alert("Пожалуйста, заполните все обязательные поля.");

        return;

    }


    let message = "Здравствуйте! Хочу оформить заказ в MERIZA.\n\n";

    message += "МОИ ДАННЫЕ:\n";

    message += "Имя: " + name + "\n";
    message += "Телефон: " + phone + "\n";
    message += "Город: " + city + "\n";
    message += "Адрес: " + address + "\n\n";


    message += "МОЙ ЗАКАЗ:\n";


    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message += "\n" + (index + 1) + ". " + item.name + "\n";

        message += "Цвет: " + item.color + "\n";

        message += "Размер: " + item.size + "\n";

        message += "Количество: " + item.quantity + "\n";

        message += "Цена: " + item.price + " сом\n";

        message += "Сумма: " + itemTotal + " сом\n";

    });


    message += "\nИТОГО: " + total + " сом\n";

    message += "Доставка: бесплатно по Бишкеку\n";


    if (comment) {

        message += "\nКомментарий: " + comment + "\n";

    }


    message += "\nСпасибо! Жду подтверждения заказа.";


    const whatsappLink =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(whatsappLink, "_blank");

}


// =================================
// ЗАПУСК МАГАЗИНА
// =================================

document.addEventListener("DOMContentLoaded", function () {

    updateCart();

});