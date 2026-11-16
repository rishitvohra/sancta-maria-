/* =========================
   SANCTA MARIA
   WEBSITE FUNCTIONS
========================= */

// WHATSAPP NUMBER
const WHATSAPP_NUMBER = "917827053755";


// PRODUCT DATA
// Replace these sample products with your actual products.

const products = [
  {
    id: 1,
    name: "The Classic Edit",
    category: "Signature Collection",
    price: 2499,
    description: "A timeless addition to your wardrobe, designed for effortless elegance.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    tag: "NEW ARRIVAL"
  },

  {
    id: 2,
    name: "The Evening Look",
    category: "Evening Collection",
    price: 3299,
    description: "A sophisticated look that brings confidence and contemporary elegance.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    tag: "BESTSELLER"
  },

  {
    id: 3,
    name: "The Modern Muse",
    category: "Women's Collection",
    price: 2799,
    description: "A carefully selected style for those who love understated luxury.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    tag: "NEW ARRIVAL"
  },

  {
    id: 4,
    name: "The Signature Style",
    category: "Premium Collection",
    price: 3599,
    description: "An expressive statement piece for your everyday fashion wardrobe.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    tag: "EXCLUSIVE"
  }
];


// ELEMENTS

const productGrid = document.getElementById("productGrid");

const modal = document.getElementById("productModal");

const modalOverlay = document.getElementById("modalOverlay");

const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");

const modalName = document.getElementById("modalName");

const modalDescription = document.getElementById("modalDescription");

const modalPrice = document.getElementById("modalPrice");

const sizeSelect = document.getElementById("sizeSelect");

const orderButton = document.getElementById("orderButton");

const menuToggle = document.getElementById("menuToggle");

const nav = document.getElementById("nav");

let selectedProduct = null;


// FORMAT PRICE

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}


// DISPLAY PRODUCTS

function displayProducts() {

  if (!productGrid) return;

  productGrid.innerHTML = products.map(product => {

    return `
      <article class="product-card" data-id="${product.id}">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >

          <span class="product-tag">
            ${product.tag}
          </span>

          <button
            class="quick-view"
            type="button"
            data-product-id="${product.id}"
          >
            QUICK VIEW ↗
          </button>

        </div>

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>${product.category}</p>

          <span class="product-price">
            ${formatPrice(product.price)}
          </span>

        </div>

      </article>
    `;

  }).join("");

}


// OPEN PRODUCT MODAL

function openProduct(productId) {

  const product = products.find(
    item => item.id === Number(productId)
  );

  if (!product) return;

  selectedProduct = product;

  modalImage.src = product.image;

  modalImage.alt = product.name;

  modalName.textContent = product.name;

  modalDescription.textContent = product.description;

  modalPrice.textContent = formatPrice(product.price);

  sizeSelect.value = "";

  modal.classList.add("active");

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("no-scroll");

  modalClose.focus();

}


// CLOSE MODAL

function closeModal() {

  modal.classList.remove("active");

  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("no-scroll");

  selectedProduct = null;

}


// PRODUCT CLICK EVENTS

productGrid.addEventListener("click", function(event) {

  const button = event.target.closest("[data-product-id]");

  const card = event.target.closest(".product-card");

  if (button) {
    openProduct(button.dataset.productId);
  } else if (card) {
    openProduct(card.dataset.id);
  }

});


// CLOSE BUTTON

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", closeModal);


// ESCAPE KEY

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closeModal();
  }

});


// WHATSAPP ORDER

orderButton.addEventListener("click", function() {

  if (!selectedProduct) return;

  const selectedSize = sizeSelect.value;

  if (!selectedSize) {

    alert("Please select your size before ordering.");

    sizeSelect.focus();

    return;

  }

  const message = `
Hello Sancta Maria!

I would like to enquire about this product.

Product: ${selectedProduct.name}

Category: ${selectedProduct.category}

Price: ${formatPrice(selectedProduct.price)}

Size: ${selectedSize}

Please share the ordering details.

Thank you!
  `;

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

});


// MOBILE NAVIGATION

menuToggle.addEventListener("click", function() {

  const isOpen = nav.classList.toggle("active");

  menuToggle.classList.toggle("active", isOpen);

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  document.body.classList.toggle("no-scroll", isOpen);

});


// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", function() {

    nav.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("no-scroll");

  });

});


// FOOTER YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();


// PAGE LOADER

window.addEventListener("load", function() {

  const loader = document.getElementById("loader");

  setTimeout(function() {

    loader.classList.add("hide");

  }, 500);

});


// INITIALIZE WEBSITE

displayProducts();

console.log("Sancta Maria website loaded successfully.");
