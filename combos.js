// JavaScript for Family Combos page - Happy Enjoy Crackers

// State variable
let selectedCombos = {};

// Toggle select/deselect combo pack
function toggleCombo(sno, price, name, itemsCount) {
    const card = document.getElementById(`combo-${sno}`);
    const button = card.querySelector('.select-btn');

    if (selectedCombos[sno]) {
        // Deselect
        delete selectedCombos[sno];
        card.classList.remove('selected');
        button.textContent = "Select Pack";
        button.className = "btn btn-outline-warning select-btn";
    } else {
        // Select
        selectedCombos[sno] = {
            sno: sno,
            price: price,
            name: name,
            items: itemsCount
        };
        card.classList.add('selected');
        button.textContent = "Deselect Pack";
        button.className = "btn btn-warning select-btn text-dark";
    }

    updateCartSummary();
}

// Update bottom cart floating summary
function updateCartSummary() {
    const keys = Object.keys(selectedCombos);
    const count = keys.length;
    
    let subtotal = 0;
    keys.forEach(k => {
        subtotal += selectedCombos[k].price;
    });

    const cartSummary = document.getElementById('cartSummary');
    const itemsCountElement = document.querySelector('.cart-items-count');
    const totalAmountElement = document.querySelector('.cart-total-amount');

    if (count > 0) {
        cartSummary.style.display = 'block';
        itemsCountElement.textContent = `${count} pack${count > 1 ? 's' : ''}`;
        totalAmountElement.textContent = `₹${subtotal.toFixed(2)}`;
        document.body.style.paddingBottom = '100px';
    } else {
        cartSummary.style.display = 'none';
        document.body.style.paddingBottom = '0';
    }
}

// WhatsApp order form & submission
function orderCombos() {
    const keys = Object.keys(selectedCombos);
    if (keys.length === 0) {
        Swal.fire('Please select at least one Combo Pack first!', '', 'warning');
        return;
    }

    let subtotal = 0;
    keys.forEach(k => {
        subtotal += selectedCombos[k].price;
    });

    const packingCharge = Math.round(subtotal * 0.03);
    const grandTotal = subtotal + packingCharge;

    Swal.fire({
        title: 'Enter Combo Order Details',
        html: `
            <input type="text" id="custName" class="swal2-input" placeholder="Full Name">
            <textarea id="custAddress" class="swal2-textarea" placeholder="Delivery Address"></textarea>
            <input type="text" id="custPincode" class="swal2-input" placeholder="Pincode">
            <input type="tel" id="custNumber" class="swal2-input" placeholder="Phone Number">
        `,
        confirmButtonText: 'Send Order via WhatsApp',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            const name = document.getElementById('custName').value.trim();
            const address = document.getElementById('custAddress').value.trim();
            const pincode = document.getElementById('custPincode').value.trim();
            const number = document.getElementById('custNumber').value.trim();

            if (!name || !number || !address || !pincode) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }
            return { name, number, address, pincode };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { name, number, address, pincode } = result.value;

            // Build WhatsApp order message
            let orderMessage = `🎆 *New Family Combo Order - Happy Enjoy Crackers* 🎆\n\n`;
            orderMessage += `📅 *Order Date:* ${new Date().toLocaleDateString()}\n\n`;
            orderMessage += `👤 *Customer Name:* ${name}\n🏠 *Address:* ${address}\n📮 *Pincode:* ${pincode}\n📞 *Phone:* ${number}\n\n`;
            orderMessage += `📋 *Selected Combo Packs:*\n${'='.repeat(40)}\n`;

            keys.forEach((k, index) => {
                const item = selectedCombos[k];
                orderMessage += `${index + 1}. *${item.name}* (${item.items})\n`;
                orderMessage += `    Price: ₹${item.price.toFixed(2)}\n\n`;
            });

            orderMessage += `${'='.repeat(40)}\n`;
            orderMessage += `Subtotal Amount        = ₹${subtotal.toFixed(2)}\n`;
            orderMessage += `Packing Charge (3%)    = ₹${packingCharge.toFixed(2)}\n`;
            orderMessage += `Grand Total            = ₹${grandTotal.toFixed(2)}\n\n`;
            orderMessage += `Thank you for your order! 🙏`;

            const phoneNumber = "9962314877";
            const encodedMessage = encodeURIComponent(orderMessage);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, "_blank");
            
            Swal.fire('Success!', 'Combo order sent via WhatsApp!', 'success');
        }
    });
}

// Image modal pop-up
function openImageModal(imgElement) {
    const modalEl = document.getElementById("imageModal");
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("imageModalLabel");
    
    if (modalImage && modalTitle) {
        modalImage.src = imgElement.src;
        modalTitle.textContent = imgElement.alt || "Combo Image";
        modal.show();
    }
}
