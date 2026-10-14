// JavaScript for Family Combos page - Happy Enjoy Crackers

// State variable
let selectedCombos = {};

// Change quantity of combo pack
function changeQuantity(sno, change, price, name, itemsCount) {
    const qtySpan = document.getElementById(`qty-${sno}`);
    const totalPriceSpan = document.getElementById(`total-price-${sno}`);
    const card = document.getElementById(`combo-${sno}`);
    
    let currentQty = selectedCombos[sno] ? selectedCombos[sno].qty : 0;
    let newQty = currentQty + change;
    
    if (newQty < 0) newQty = 0;
    
    if (newQty === 0) {
        delete selectedCombos[sno];
        card.classList.remove('selected');
        if (qtySpan) qtySpan.textContent = "0";
        if (totalPriceSpan) {
            totalPriceSpan.textContent = "₹0.00";
            totalPriceSpan.style.color = '#6c757d';
            totalPriceSpan.style.fontWeight = 'normal';
        }
    } else {
        selectedCombos[sno] = {
            sno: sno,
            price: price,
            name: name,
            items: itemsCount,
            qty: newQty
        };
        card.classList.add('selected');
        if (qtySpan) qtySpan.textContent = newQty;
        if (totalPriceSpan) {
            totalPriceSpan.textContent = `₹${(price * newQty).toFixed(2)}`;
            totalPriceSpan.style.color = '#28a745';
            totalPriceSpan.style.fontWeight = 'bold';
        }
    }
    
    updateCartSummary();
}

// Update bottom cart floating summary
function updateCartSummary() {
    const keys = Object.keys(selectedCombos);
    let totalPacks = 0;
    let subtotal = 0;
    
    keys.forEach(k => {
        totalPacks += selectedCombos[k].qty;
        subtotal += (selectedCombos[k].price * selectedCombos[k].qty);
    });

    const cartSummary = document.getElementById('cartSummary');
    const itemsCountElement = document.querySelector('.cart-items-count');
    const totalAmountElement = document.querySelector('.cart-total-amount');

    if (totalPacks > 0) {
        const packingCharge = Math.round(subtotal * 0.03);
        const isGstApplicable = subtotal > 5000;
        const gstCharge = isGstApplicable ? Math.round(subtotal * 0.12) : 0;
        const grandTotal = subtotal + packingCharge + gstCharge;

        if (cartSummary) cartSummary.style.display = 'block';
        if (itemsCountElement) itemsCountElement.textContent = `${totalPacks} pack${totalPacks > 1 ? 's' : ''}`;
        if (totalAmountElement) {
            totalAmountElement.textContent = `₹${grandTotal.toFixed(2)}`;
            let noteEl = document.getElementById('comboGstNote');
            if (!noteEl) {
                noteEl = document.createElement('div');
                noteEl.id = 'comboGstNote';
                noteEl.style.fontSize = '11px';
                noteEl.style.opacity = '0.9';
                noteEl.style.marginTop = '2px';
                totalAmountElement.parentElement.appendChild(noteEl);
            }
            if (isGstApplicable) {
                noteEl.innerHTML = `(Subtotal: ₹${subtotal.toLocaleString('en-IN')} + 3% Packing: ₹${packingCharge.toLocaleString('en-IN')} + 12% GST: ₹${gstCharge.toLocaleString('en-IN')})`;
            } else {
                noteEl.innerHTML = `(Subtotal: ₹${subtotal.toLocaleString('en-IN')} + 3% Packing: ₹${packingCharge.toLocaleString('en-IN')})`;
            }
        }
        document.body.style.paddingBottom = '110px';
    } else {
        if (cartSummary) cartSummary.style.display = 'none';
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
        subtotal += (selectedCombos[k].price * selectedCombos[k].qty);
    });

    const packingCharge = Math.round(subtotal * 0.03);
    const isGstApplicable = subtotal > 5000;
    const gstCharge = isGstApplicable ? Math.round(subtotal * 0.12) : 0;
    const grandTotal = subtotal + packingCharge + gstCharge;

    Swal.fire({
        title: 'Enter Combo Order Details',
        html: `
            <div style="text-align:left; font-size:13px; margin-bottom:12px; color:#495057; background:#fff3cd; padding:10px 12px; border-radius:6px; line-height: 1.45;">
                💰 <strong>Grand Total: ₹${grandTotal.toFixed(2)}</strong><br>
                <span style="font-size:11.5px; color:#78350f;">(Subtotal: ₹${subtotal.toFixed(2)} + 3% Packing: ₹${packingCharge.toFixed(2)}${isGstApplicable ? ` + 12% GST: ₹${gstCharge.toFixed(2)}` : ''})</span>
            </div>
            <div style="font-size: 13px; color: #6c757d; margin-bottom: 10px;">Delivery details are optional. You can enter them or proceed directly to WhatsApp.</div>
            <input type="text" id="custName" class="swal2-input" placeholder="Full Name (Optional)">
            <input type="tel" id="custNumber" class="swal2-input" placeholder="Phone Number (Optional)">
            <textarea id="custAddress" class="swal2-textarea" placeholder="Delivery Address (Optional)"></textarea>
            <input type="text" id="custPincode" class="swal2-input" placeholder="Pincode (Optional)">
        `,
        confirmButtonText: 'Send Order via WhatsApp',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            const name = document.getElementById('custName').value.trim();
            const address = document.getElementById('custAddress').value.trim();
            const pincode = document.getElementById('custPincode').value.trim();
            const number = document.getElementById('custNumber').value.trim();

            return { name, number, address, pincode };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { name, number, address, pincode } = result.value;

            // Build WhatsApp order message
            let orderMessage = `🎆 *New Family Combo Order - Happy Enjoy Crackers* 🎆\n\n`;
            orderMessage += `📅 *Order Date:* ${new Date().toLocaleDateString()}\n\n`;
            if (name) orderMessage += `👤 *Customer Name:* ${name}\n`;
            if (number) orderMessage += `📞 *Phone:* ${number}\n`;
            if (address) orderMessage += `🏠 *Address:* ${address}\n`;
            if (pincode) orderMessage += `📮 *Pincode:* ${pincode}\n`;
            if (name || number || address || pincode) {
                orderMessage += `\n`;
            }
            orderMessage += `📋 *Selected Combo Packs:*\n${'='.repeat(40)}\n`;

            keys.forEach((k, index) => {
                const item = selectedCombos[k];
                orderMessage += `${index + 1}. *${item.name}* (${item.items}) x ${item.qty}\n`;
                orderMessage += `    Price: ₹${item.price.toFixed(2)} each\n`;
                orderMessage += `    Subtotal: ₹${(item.price * item.qty).toFixed(2)}\n\n`;
            });

            orderMessage += `${'='.repeat(40)}\n`;
            orderMessage += `Subtotal Amount        = ₹${subtotal.toFixed(2)}\n`;
            orderMessage += `Packing Charge (3%)    = ₹${packingCharge.toFixed(2)}\n`;
            if (isGstApplicable) {
                orderMessage += `GST Charge (12%)       = ₹${gstCharge.toFixed(2)}\n`;
            }
            orderMessage += `Grand Total            = ₹${grandTotal.toFixed(2)}\n\n`;
            if (isGstApplicable) {
                orderMessage += `_Note: 12% GST is strictly applicable on orders above ₹5,000._\n`;
            }
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
