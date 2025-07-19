// JavaScript for Happy Enjoy Crackers Website

// Global variables
let currentProducts = [];
let cart = [];
let grandTotal = 0;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Update active navigation
    updateActiveNavigation();
}

// Navigation functionality
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
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

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('[id$="-search"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableId = this.id.replace('-search', '-table');
            const table = document.getElementById(tableId);
            
            if (table) {
                searchTable(table, searchTerm);
            }
        });
    });
}

function searchTable(table, searchTerm) {
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const productName = row.cells[2].textContent.toLowerCase();
        
        if (productName.includes(searchTerm)) {
            row.style.display = '';
            row.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
            row.style.display = 'none';
        }
    });
}

// Quantity control functions
function increaseQuantity(button) {
    const row = button.closest('tr');
    const quantityDisplay = row.querySelector('.quantity-display');
    const currentQuantity = parseInt(quantityDisplay.textContent);
    const newQuantity = currentQuantity + 1;
    
    quantityDisplay.textContent = newQuantity;
    updateRowTotal(row);
    updateCartSummary();
    
    // Add animation
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function decreaseQuantity(button) {
    const row = button.closest('tr');
    const quantityDisplay = row.querySelector('.quantity-display');
    const currentQuantity = parseInt(quantityDisplay.textContent);
    
    if (currentQuantity > 0) {
        const newQuantity = currentQuantity - 1;
        quantityDisplay.textContent = newQuantity;
        updateRowTotal(row);
        updateCartSummary();
        
        // Add animation
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
}

function orderNow() {
    // Add your redirection or modal popup logic here
    window.location.href = "estimate.html"; // change if needed
}

function updateRowTotal(row) {
    const priceCell = row.querySelector('[data-price]');
    const quantityDisplay = row.querySelector('.quantity-display');
    const totalCell = row.querySelector('.total-price');
    
    const price = parseFloat(priceCell.getAttribute('data-price'));
    const quantity = parseInt(quantityDisplay.textContent);
    const total = price * quantity;
    
    totalCell.textContent = `₹${total.toFixed(2)}`;
    
    // Add visual feedback
    if (quantity > 0) {
        totalCell.style.color = '#28a745';
        totalCell.style.fontWeight = 'bold';
        totalCell.style.animation = 'pulse 0.3s ease-out';
    } else {
        totalCell.style.color = '#6c757d';
        totalCell.style.fontWeight = 'normal';
    }
}

function updateCartSummary() {
    const allRows = document.querySelectorAll('tbody tr');
    let totalItems = 0;
    let totalAmount = 0;
    const cartItems = [];
    
    allRows.forEach(row => {
        const quantityDisplay = row.querySelector('.quantity-display');
        const quantity = parseInt(quantityDisplay.textContent);
        
        if (quantity > 0) {
            const productName = row.cells[2].textContent;
            const price = parseFloat(row.querySelector('[data-price]').getAttribute('data-price'));
            const total = price * quantity;
            
            totalItems += quantity;
            totalAmount += total;
            
            cartItems.push({
                name: productName,
                price: price,
                quantity: quantity,
                total: total
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
    
    // Create detailed order message
    let orderMessage = `🎆 *New Order - Happy Enjoy Crackers* 🎆\n\n`;
    orderMessage += `📅 *Order Date:* ${new Date().toLocaleDateString()}\n`;
    orderMessage += `⏰ *Order Time:* ${new Date().toLocaleTimeString()}\n\n`;
    orderMessage += `📋 *Order Details:*\n`;
    orderMessage += `${'='.repeat(40)}\n`;
    
    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. *${item.name}*\n`;
        orderMessage += `   Price: ₹${item.price} × ${item.quantity} = ₹${item.total.toFixed(2)}\n\n`;
    });
    
    orderMessage += `${'='.repeat(40)}\n`;
    orderMessage += `💰 *Grand Total: ₹${grandTotal.toFixed(2)}*\n\n`;
    orderMessage += `📍 Please confirm this order and let me know:\n`;
    orderMessage += `• Delivery address\n`;
    orderMessage += `• Preferred delivery time\n`;
    orderMessage += `• Payment method\n\n`;
    orderMessage += `Thank you for choosing Happy Enjoy Crackers! 🙏`;
    
    // Send to WhatsApp
    sendWhatsAppMessage(orderMessage);
    
    // Show success message
    showAlert('Order sent via WhatsApp! We will contact you soon.', 'success');
}

function clearCart() {
    // Reset all quantities to 0
    const allQuantityDisplays = document.querySelectorAll('.quantity-display');
    allQuantityDisplays.forEach(display => {
        display.textContent = '0';
    });
    
    // Update all row totals
    const allRows = document.querySelectorAll('tbody tr');
    allRows.forEach(row => {
        updateRowTotal(row);
    });
    
    // Update cart summary
    updateCartSummary();
    
    showAlert('Cart cleared successfully!', 'info');
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
• Color Sparklers (20 pcs) - ₹100
• Premium Sparklers (25 pcs) - ₹125

GROUND CHAKKARS
--------------
• Big Chakkar Special - ₹25
• Color Changing Chakkar - ₹35
• Deluxe Chakkar - ₹45
• Super Chakkar - ₹55

AERIAL SHOTS
-----------
• Sky Shot Multi Color - ₹150
• Thunder Shot Deluxe - ₹200
• Rainbow Shot - ₹175
• Galaxy Shot - ₹225

FLOWER POTS
-----------
• Small Flower Pot - ₹15
• Medium Flower Pot - ₹25
• Large Flower Pot - ₹35
• Special Flower Pot - ₹45

SOUND CRACKERS
--------------
• Single Sound - ₹5
• Double Sound - ₹10
• Triple Sound - ₹15
• Garland (50 pcs) - ₹150

GIFT BOXES
----------
• Family Pack - ₹500
• Deluxe Pack - ₹750
• Premium Pack - ₹1000
• Super Premium Pack - ₹1500

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

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit();
        });
    }
}

function handleContactFormSubmit() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !phone || !message) {
        showAlert('Please fill in all required fields.', 'danger');
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `📝 *Contact Form Submission* 📝\n\n` +
                           `👤 *Name:* ${name}\n` +
                           `📞 *Phone:* ${phone}\n` +
                           `📧 *Email:* ${email || 'Not provided'}\n` +
                           `📋 *Subject:* ${subject || 'General Inquiry'}\n` +
                           `💬 *Message:* ${message}\n\n` +
                           `📅 *Date:* ${new Date().toLocaleDateString()}\n` +
                           `⏰ *Time:* ${new Date().toLocaleTimeString()}`;
    
    // Send to WhatsApp
    sendWhatsAppMessage(whatsappMessage);
    
    // Show success message
    showAlert('Thank you for your message! We will contact you soon.', 'success');
    
    // Reset form
    form.reset();
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

// Carousel auto-advance (optional)
function initializeCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            touch: true
        });
    }
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.animationFillMode = 'both';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.card, .category-section, .value-card, .achievement-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Performance optimizations
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading attribute
        img.loading = 'lazy';
        
        // Add error handling
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
        };
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    initializeCarousel();
    initializeScrollAnimations();
    optimizeImages();
    initializeMobileMenu();
    addAdditionalStyles();
});

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust layout if needed
    updateResponsiveElements();
});

function updateResponsiveElements() {
    // Update any responsive elements that need manual adjustment
    const tables = document.querySelectorAll('.table-responsive');
    tables.forEach(table => {
        if (window.innerWidth < 768) {
            table.style.fontSize = '0.85rem';
        } else {
            table.style.fontSize = '1rem';
        }
    });
}

// Export functions for external use
window.HappyEnjoyCrackers = {
    increaseQuantity,
    decreaseQuantity,
    updateRowTotal,
    updateCartSummary,
    orderViaWhatsApp,
    clearCart,
    openImageModal,
    openWhatsApp,
    downloadPriceList,
    sendWhatsAppMessage
};