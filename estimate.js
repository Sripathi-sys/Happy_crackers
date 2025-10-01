// JavaScript for Estimate Page - Happy Enjoy Crackers

// Global variables
let currentProducts = [];
let cart = [];
let grandTotal = 0;

// Initialize the estimate page
document.addEventListener('DOMContentLoaded', function() {
    initializeEstimatePage();
});

function initializeEstimatePage() {
    // Initialize global search and filter functionality
    initializeGlobalSearch();
    initializeCategoryFilter();
    
    // Initialize sticky search bar
    initializeStickySearchBar();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Update active navigation
    updateActiveNavigation();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Add additional styles
    addAdditionalStyles();
}

// Sticky search bar functionality
function initializeStickySearchBar() {
    const searchFilterSection = document.querySelector('.search-filter-section');
    
    if (searchFilterSection) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navbarHeight = 76; // Height of the fixed navbar
            
            if (scrollTop > navbarHeight + 100) {
                searchFilterSection.classList.add('sticky');
            } else {
                searchFilterSection.classList.remove('sticky');
            }
        });
    }
}

// Navigation functionality
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'estimate.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Global search functionality
function initializeGlobalSearch() {
    const globalSearch = document.getElementById('global-search');
    
    if (globalSearch) {
        globalSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterProducts(searchTerm, '');
        });
    }
}

// Category filter functionality
function initializeCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const searchTerm = document.getElementById('global-search').value.toLowerCase();
            filterProducts(searchTerm, selectedCategory);
        });
    }
}

// Filter products based on search term and category
function filterProducts(searchTerm, category) {
    const productCards = document.querySelectorAll('.product-card');
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    // Hide all category headers first
    categoryHeaders.forEach(header => {
        header.style.display = 'none';
    });
    
    let visibleCategories = new Set();
    
    productCards.forEach(card => {
        const productName = card.getAttribute('data-name').toLowerCase();
        const productCategory = card.getAttribute('data-category');
        
        const matchesSearch = !searchTerm || productName.includes(searchTerm);
        const matchesCategory = !category || productCategory === category;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = '';
            visibleCategories.add(productCategory);
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show category headers for visible categories
    categoryHeaders.forEach(header => {
        const headerCategory = header.getAttribute('data-category');
        if (visibleCategories.has(headerCategory)) {
            header.style.display = 'block';
        }
    });
}

// Quantity control functions
function increaseQuantity(button) {
    const card = button.closest('.product-card');
    const quantityDisplay = card.querySelector('.quantity-display');
    const currentQuantity = parseInt(quantityDisplay.textContent);
    const newQuantity = currentQuantity + 1;
    
    quantityDisplay.textContent = newQuantity;
    updateCardTotal(card);
    updateCartSummary();
    
    // Add animation
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function decreaseQuantity(button) {
    const card = button.closest('.product-card');
    const quantityDisplay = card.querySelector('.quantity-display');
    const currentQuantity = parseInt(quantityDisplay.textContent);
    
    if (currentQuantity > 0) {
        const newQuantity = currentQuantity - 1;
        quantityDisplay.textContent = newQuantity;
        updateCardTotal(card);
        updateCartSummary();
        
        // Add animation
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
}

function updateCardTotal(card) {
    const priceElement = card.querySelector('[data-price]');
    const quantityDisplay = card.querySelector('.quantity-display');
    const totalElement = card.querySelector('.total-price');
    
    const price = parseFloat(priceElement.getAttribute('data-price'));
    const quantity = parseInt(quantityDisplay.textContent);
    const total = price * quantity;
    
    totalElement.textContent = `₹${total.toFixed(2)}`;
    
    // Add visual feedback
    if (quantity > 0) {
        totalElement.style.color = '#28a745';
        totalElement.style.fontWeight = 'bold';
        totalElement.style.animation = 'pulse 0.3s ease-out';
    } else {
        totalElement.style.color = '#6c757d';
        totalElement.style.fontWeight = 'normal';
    }
}

function updateCartSummary() {
    const allCards = document.querySelectorAll('.product-card');
    let totalItems = 0;
    let totalAmount = 0;
    const cartItems = [];
    
    allCards.forEach(card => {
        const quantityDisplay = card.querySelector('.quantity-display');
        const quantity = parseInt(quantityDisplay.textContent);
        
        if (quantity > 0) {
            const productName = card.getAttribute('data-name');
            const price = parseFloat(card.querySelector('[data-price]').getAttribute('data-price'));
            const total = price * quantity;

            // Get box count from DOM
            const boxElement = card.querySelector('.product-box strong');
            const box = boxElement ? boxElement.textContent.trim() : null;
            
            totalItems += quantity;
            totalAmount += total;
            
            cartItems.push({
                name: productName,
                price: price,
                quantity: quantity,
                total: total,
                box: box // <-- Add box here
            });
        }
    });
    
    // Update global variables
    cart = cartItems;
    grandTotal = totalAmount;
    
    // Update UI
    const cartSummary = document.getElementById('cartSummary');
    const itemsCount = document.querySelector('.cart-items-count');
    const totalAmountElement = document.querySelector('.cart-total-amount');
    
    if (totalItems > 0) {
        cartSummary.style.display = 'block';
        itemsCount.textContent = `${totalItems} item${totalItems > 1 ? 's' : ''}`;
        totalAmountElement.textContent = `₹${totalAmount.toFixed(2)}`;
        
        // Add body padding to prevent content overlap
        document.body.style.paddingBottom = '100px';
    } else {
        cartSummary.style.display = 'none';
        document.body.style.paddingBottom = '0';
    }
}

function orderViaWhatsApp() {
    if (cart.length === 0) {
        showAlert('Please add some items to your cart first!', 'warning');
        return;
    }

    // Check for minimum purchase amount
    if (grandTotal < 2000) {
        showAlert('Minimum order amount is ₹4000. Please add more items to your cart.', 'warning');
        return;
    }

    let orderMessage = `🎆 *New Order - Happy Enjoy Crackers* 🎆\n\n`;
    orderMessage += `📅 *Order Date:* ${new Date().toLocaleDateString()}\n`;
    orderMessage += `⏰ *Order Time:* ${new Date().toLocaleTimeString()}\n\n`;
    orderMessage += `📋 *Order Details:*\n`;
    orderMessage += `${'='.repeat(40)}\n`;

    // Loop through cart items
    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. *${item.name}*`;
        if(item.box) {
            orderMessage += ` (${item.box})`; // Add box count here
        }
        orderMessage += `\n`;
        orderMessage += `    ₹${item.price} × ${item.quantity} = ₹${item.total.toFixed(2)}\n\n`;
    });

    const deliveryCharge = Math.round(grandTotal * 0.03);
    const totalWithDelivery = grandTotal + deliveryCharge;

    orderMessage += `${'='.repeat(40)}\n`;
    orderMessage += `Total Amount    = ₹${grandTotal.toString().padStart(6)}\n`;
    orderMessage += `Packing Charge (3%)  = ₹${deliveryCharge.toString().padStart(6)}\n`;
    orderMessage += `Grand Total     = ₹${totalWithDelivery.toString().padStart(6)}\n\n`;
    orderMessage += `Thank you for choosing Happy Enjoy Crackers! 🙏`;

    sendWhatsAppMessage(orderMessage);
    showAlert('Order sent via WhatsApp! We will contact you soon.', 'success');
}




// Image modal functionality
function openImageModal(imgElement) {
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalLabel');
    
    modalImage.src = imgElement.src;
    modalTitle.textContent = imgElement.alt;
    
    modal.show();
}

// WhatsApp functionality
function openWhatsApp() {
    const message = `Hello! I'm interested in your fireworks products. Can you help me with my order?`;
    sendWhatsAppMessage(message);
}

function sendWhatsAppMessage(message) {
    const phoneNumber = '9962314877'; // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Download price list functionality
function downloadPriceList() {
    // Create a simple price list content
    const priceListContent = generatePriceListContent();
    
    // Create and download the file
    const blob = new Blob([priceListContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Happy_Enjoy_Crackers_Price_List.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show download success message
    showDownloadSuccess();
}

function generatePriceListContent() {
    return `
HAPPY ENJOY CRACKERS - PRICE LIST
==================================

📧 Email: info@happyenjoycrackers.com
📞 Phone: +91 98765 43210
📍 Address: 123 Fireworks Street, Sivakasi, Tamil Nadu 626123

SPARKLERS
---------
• Electric Sparklers (10 pcs) - ₹50
• Golden Sparklers (15 pcs) - ₹75

GROUND CHAKKARS
--------------
• Big Chakkar Special - ₹25
• Color Changing Chakkar - ₹35

AERIAL SHOTS
-----------
• Sky Shot Multi Color - ₹150
• Thunder Shot Deluxe - ₹200

FLOWER POTS
-----------
• Small Flower Pot - ₹15
• Large Flower Pot - ₹35

SOUND CRACKERS
--------------
• Single Sound - ₹5
• Garland (50 pcs) - ₹150

GIFT BOXES
----------
• Family Pack - ₹500
• Premium Pack - ₹1000

TERMS & CONDITIONS:
• All prices are inclusive of taxes
• Minimum order value: ₹200
• Free home delivery for orders above ₹500
• Bulk discounts available
• All products are safety certified
• Cash on delivery available

For orders and inquiries:
WhatsApp: +91 98765 43210
Email: orders@happyenjoycrackers.com

Thank you for choosing Happy Enjoy Crackers!
Generated on: ${new Date().toLocaleDateString()}
    `;
}

function showDownloadSuccess() {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success position-fixed';
    successDiv.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
    `;
    successDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        Price list downloaded successfully!
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 500);
    }, 3000);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.5s ease-out;
    `;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    document.body.removeChild(alertDiv);
                }
            }, 500);
        }
    }, 5000);
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Tooltip functionality
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Mobile menu enhancements
function initializeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            });
        });
    }
}

// Additional CSS animations
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;

// Add additional styles to the document
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = additionalStyles;
    document.head.appendChild(style);
}

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust layout if needed
    updateResponsiveElements();
});

function updateResponsiveElements() {
    // Update any responsive elements that need manual adjustment
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (window.innerWidth < 768) {
            card.style.fontSize = '0.85rem';
        } else {
            card.style.fontSize = '1rem';
        }
    });
}

// Export functions for external use
window.HappyEnjoyCrackers = {
    increaseQuantity,
    decreaseQuantity,
    updateCartSummary,
    orderViaWhatsApp,
    openImageModal,
    openWhatsApp,
    downloadPriceList,
    sendWhatsAppMessage
};