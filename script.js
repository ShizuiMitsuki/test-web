let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartSection = document.getElementById('cart-section');
const clearCartButton = document.getElementById('clear-cart');
const cartLink = document.getElementById("cart-link");
const banners = document.querySelectorAll('.banner-image');
let currentIndex = 0;

function showNextBanner() {
    banners[currentIndex].classList.remove('active'); 
    currentIndex = (currentIndex + 1) % banners.length;
    banners[currentIndex].classList.add('active');
}

setInterval(showNextBanner, 2000);

document.getElementById('checkout-button').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('hidden');
});

document.getElementById('reload-page').addEventListener('click', function() {
    location.reload();
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    });
});

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updateCart() {
    cartCountElement.textContent = cart.length;
    cartItemsElement.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('tr');
        const subtotal = item.price * item.quantity;
        li.innerHTML = `
            <td>${item.name}</td>
            <td>Rp. ${formatCurrency(item.price)}</td>
            <td>${item.quantity}</td>
            <td>Rp. ${formatCurrency(subtotal)}</td>
        `;
        cartItemsElement.appendChild(li);
        totalPrice += subtotal; 
    });

    totalPriceElement.textContent = formatCurrency(totalPrice);
    cartSection.classList.remove('hidden');
}

clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart();
});

cartLink.addEventListener("click", function(e) {
    e.preventDefault(); // Mencegah aksi default link

    // Mencari elemen footer
    const footer = document.getElementById("footer");

    // Menggulung halaman ke footer
    footer.scrollIntoView({ behavior: "smooth" });
});
/*const checkoutButton = document.getElementById('checkout-button');
const maintenanceSection = document.getElementById('maintenance-section');

checkoutButton.addEventListener('click', () => {
    cartSection.classList.add('hidden'); // Sembunyikan keranjang
    maintenanceSection.classList.remove('hidden'); // Tampilkan tampilan maintenance
});*/

