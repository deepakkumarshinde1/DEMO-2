// Cart Functionality
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const cartBtnHeader = document.getElementById('cart-btn'); // Renamed to differentiate

function addToCart(button, event) {
    // Prevent event bubbling if triggered from card click
    if(event) {
        event.stopPropagation();
    }

    // Increment count
    cartCount++;
    updateCartUI();

    // Visual feedback on button
    const originalText = button.innerText;
    button.innerText = "Added";
    button.style.backgroundColor = "#2E7D32";
    button.style.color = "white";
    
    // Animate button
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
        button.style.transform = "scale(1)";
    }, 100);

    // Reset button after 1.5 seconds
    setTimeout(() => {
        button.innerText = originalText;
        button.style.backgroundColor = "";
        button.style.color = "";
    }, 1500);

    // Animate cart icon pulse
    cartBtnHeader.style.transform = "scale(1.1)";
    setTimeout(() => {
        cartBtnHeader.style.transform = "scale(1)";
    }, 200);
}

function updateCartUI() {
    cartCountElement.innerText = cartCount;
    // Animate badge
    cartCountElement.style.transform = "scale(1.2)";
    setTimeout(() => {
        cartCountElement.style.transform = "scale(1)";
    }, 200);
}

// Horizontal Scroll Functionality
document.querySelectorAll('.product-scroll-container').forEach(container => {
    const row = container.querySelector('.product-row');
    const leftBtn = container.querySelector('.scroll-btn.left');
    const rightBtn = container.querySelector('.scroll-btn.right');

    if (!row || !leftBtn || !rightBtn) return;

    const scrollAmount = 260; 

    leftBtn.addEventListener('click', () => {
        row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
});

// MODAL FUNCTIONALITY
const modal = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const modalAddBtn = document.getElementById('modal-add-btn');

// Elements to populate
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalUnit = document.getElementById('modal-unit');
const modalPrice = document.getElementById('modal-price');

// Open Modal logic
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Did we click the 'Add' button directly? Handle in addToCart, prevent open logic if needed
        // but wait, addToCart is inline onclick="addToCart(this)". 
        // We should pass event to it to stopPropagation, or check target here.
        if(e.target.closest('.add-btn')) return;

        // Extract Data
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('h3').innerText;
        const unit = card.querySelector('.unit').innerText;
        const price = card.querySelector('.price').innerText;

        // Populate Modal
        modalImg.src = imgSrc;
        modalTitle.innerText = title;
        modalUnit.innerText = unit;
        modalPrice.innerText = price;

        // Determine what happens on Modal Add Button Click
        // Clear previous event listeners to avoid duplicates
        const newBtn = modalAddBtn.cloneNode(true);
        modalAddBtn.parentNode.replaceChild(newBtn, modalAddBtn);
        // Re-assign variable to the new button in DOM
        const freshModalAddBtn = document.getElementById('modal-add-btn');
        
        freshModalAddBtn.addEventListener('click', function() {
            addToCart(this, null);
        });

        // Show Modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close Modal Logic
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', closeModal);

// Close on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
