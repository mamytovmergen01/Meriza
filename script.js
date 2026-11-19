// =================================
// MERIZA — ИНТЕРНЕТ-МАГАЗИН
// =================================

let cart = [];

const whatsappNumber = "996559100603";


// =================================
// ДОБАВЛЕНИЕ ТОВАРА
// =================================

function addToCart(name, price, sizeId) {

    let size = "";

    if (sizeId) {

        const sizeElement = document.getElementById(sizeId);

        if (!sizeElement) {
            alert("Ошибка выбора размера!");
            return;
        }

        size = sizeElement.value;

        if (size === "") {
            alert("Пожалуйста, выберите размер!");
            return;
        }
    }

    const existingProduct = cart.find(product =>
        product.name === name &&
        product.price === price &&
        product.size === size
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            size: size,
            quantity: 1
        });

    }

    updateCart();
    const floatingCart = document.querySelector(".floating-cart");

if (floatingCart) {
    floatingCart.classList.remove("cart-bump");

    void floatingCart.offsetWidth;

    floatingCart.classList.add("cart-bump");
}

    alert(name + " добавлен в корзину!");


}


// =================================
// ОБНОВЛЕНИЕ КОРЗИНЫ
// =================================

function updateCart() {

    const items = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    const countElement = document.getElementById("cart-count");

    if (!items || !totalElement || !countElement) {
        console.error("Не найдены элементы корзины!");
        return;
    }

    items.innerHTML = "";

    let total = 0;
    let totalCount = 0;

    if (cart.length === 0) {

        items.textContent = "Корзина пока пуста";

    }

    cart.forEach((product, index) => {

        const productTotal = product.price * product.quantity;

        total += productTotal;
        totalCount += product.quantity;

        const div = document.createElement("div");

        div.style.marginBottom = "20px";

        const info = document.createElement("p");

        info.textContent =
            product.name +
            (product.size ? " | Размер: " + product.size : "") +
            " — " + productTotal + " сом";

        div.appendChild(info);


        // КНОПКА МИНУС

        const minusButton = document.createElement("button");

        minusButton.type = "button";
        minusButton.textContent = "−";

        minusButton.onclick = function() {
            changeQuantity(index, -1);
        };

        div.appendChild(minusButton);


        // КОЛИЧЕСТВО

        const quantityText = document.createElement("span");

        quantityText.textContent = " " + product.quantity + " ";

        div.appendChild(quantityText);


        // КНОПКА ПЛЮС

        const plusButton = document.createElement("button");

        plusButton.type = "button";
        plusButton.textContent = "+";

        plusButton.onclick = function() {
            changeQuantity(index, 1);
        };

        div.appendChild(plusButton);


        // КНОПКА УДАЛЕНИЯ

        const removeButton = document.createElement("button");

        removeButton.type = "button";
        removeButton.textContent = "Удалить";

        removeButton.style.marginLeft = "15px";

        removeButton.onclick = function() {
            removeFromCart(index);
        };

        div.appendChild(removeButton);

        items.appendChild(div);

    });

    totalElement.textContent = total;

countElement.textContent = totalCount;

// СЧЁТЧИК ПЛАВАЮЩЕЙ КОРЗИНЫ

const floatingCount = document.getElementById("floating-cart-count");

if (floatingCount) {
    floatingCount.textContent = totalCount;
}

}


// =================================
// ИЗМЕНЕНИЕ КОЛИЧЕСТВА
// =================================

function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += amount;

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
// ОФОРМЛЕНИЕ ЗАКАЗА
// =================================

function checkout() {

    if (cart.length === 0) {

        alert("Сначала добавьте товары в корзину!");

        return;
    }

    const name = document.getElementById("customer-name").value.trim();

    const customerPhone = document.getElementById("customer-phone").value.trim();

    const city = document.getElementById("customer-city").value.trim();

    const address = document.getElementById("customer-address").value.trim();

    const comment = document.getElementById("customer-comment").value.trim();


    if (!name || !customerPhone || !city || !address) {

        alert("Заполните имя, телефон, город и адрес доставки!");

        return;
    }


    // ФОРМИРОВАНИЕ ЗАКАЗА

    let message = "НОВЫЙ ЗАКАЗ MERIZA\n\n";

    message += "Имя покупателя: " + name + "\n";

    message += "Телефон покупателя: " + customerPhone + "\n";

    message += "Город: " + city + "\n";

    message += "Адрес доставки: " + address + "\n\n";

    message += "ЗАКАЗАННЫЕ ТОВАРЫ:\n\n";

    let total = 0;

    cart.forEach((product, index) => {

        const productTotal = product.price * product.quantity;

        message +=
            (index + 1) + ". " +
            product.name +
            (product.size ? " | Размер: " + product.size : "") +
            " | Количество: " + product.quantity +
            " — " + productTotal + " сом\n";

        total += productTotal;

    });


    message += "\nИТОГО: " + total + " сом";


    if (comment) {

        message += "\n\nКомментарий: " + comment;

    }

    message += "\n\nОжидаю подтверждения заказа.";


    // ОТПРАВКА В WHATSAPP

    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");

}


// =================================
// ЗАПУСК МАГАЗИНА
// =================================

updateCart();
// ОТКРЫТИЕ КОРЗИНЫ

function openCart() {
    document.getElementById("cart").classList.add("active");
    document.getElementById("cart-overlay").classList.add("active");
    document.body.classList.add("cart-open");
}

// ЗАКРЫТИЕ КОРЗИНЫ

function closeCart() {
    document.getElementById("cart").classList.remove("active");
    document.getElementById("cart-overlay").classList.remove("active");
    document.body.classList.remove("cart-open");
}
// ПЕРЕХОД К ОФОРМЛЕНИЮ ЗАКАЗА

function goToCheckout() {

    if (cart.length === 0) {
        alert("Сначала добавьте товары в корзину!");
        return;
    }

    closeCart();

    document.getElementById("customer-name").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    document.getElementById("customer-name").focus();
}