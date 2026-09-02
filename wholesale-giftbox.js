// Wholesale Gift Box JavaScript - Happy Enjoy Crackers

let giftBoxes = [];
let cartState = {}; // { [id]: quantityInCases }

document.addEventListener('DOMContentLoaded', () => {
  loadGiftBoxes();
  setupSearch();
  setupImageZoomModal();
});

// Fetch product data
async function loadGiftBoxes() {
  try {
    const response = await fetch('wholesale-giftbox.json');
    if (!response.ok) throw new Error('Failed to load products');
    giftBoxes = await response.json();
    
    // Initialize cartState
    giftBoxes.forEach(item => {
      cartState[item.id] = 0;
    });

    renderGiftBoxes(giftBoxes);
    updateCartTotals();
  } catch (error) {
    console.error('Error loading gift boxes:', error);
    document.getElementById('productsList').innerHTML = `
      <div class="no-results-box">
        <i class="fas fa-exclamation-triangle text-danger"></i>
        <p>Could not load gift box data. Please refresh the page.</p>
      </div>
    `;
  }
}

// Render product cards
function renderGiftBoxes(items) {
  const container = document.getElementById('productsList');
  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="no-results-box">
        <i class="fas fa-box-open"></i>
        <p>No gift boxes found matching your search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const qty = cartState[item.id] || 0;
    const itemTotal = qty * item.casePrice;
    const totalBoxes = qty * item.boxesPerCase;
    const isActive = qty > 0;

    return `
      <div class="giftbox-card ${isActive ? 'active-in-cart' : ''}" id="card-${item.id}" data-id="${item.id}" data-name="${item.name.toLowerCase()}">
        <!-- Badge Row -->
        <div class="card-badge-row">
          <span class="items-count-badge">${item.items} ITEMS</span>
          <span class="status-badge ${item.badgeColor || 'warning'}">${item.tag || 'Wholesale Case'}</span>
        </div>

        <!-- Image Container -->
        <div class="card-image-wrap" onclick="openZoomModal('${item.image}', '${item.name}')">
          <img src="${item.image}" alt="${item.name}" id="img-${item.id}" loading="lazy">
          <div class="tap-zoom-hint">
            <i class="fas fa-search-plus"></i> Tap to View Box
          </div>
        </div>

        ${item.altImage ? `
          <div class="alt-image-toggle">
            <span class="alt-tab active" onclick="switchImage(${item.id}, '${item.image}', this, event)">Minions Box</span>
            <span class="alt-tab" onclick="switchImage(${item.id}, '${item.altImage}', this, event)">Ice Age Box</span>
          </div>
        ` : ''}

        <!-- Card Content -->
        <div class="card-body-content">
          <div class="card-title-row">
            <h3 class="card-product-title">${item.name}</h3>
          </div>
          <span class="card-product-brand"><i class="fas fa-certificate text-warning me-1"></i> ${item.brand} • Sivakasi</span>
          <p class="card-product-desc">${item.description}</p>

          <!-- Explicit Multiplication Box -->
          <div class="case-calculation-box">
            <div class="calc-breakdown-row">
              <div class="calc-breakdown-item">
                <span>Box Rate: </span><strong>₹${item.boxRate.toLocaleString('en-IN')}</strong>
              </div>
              <div class="calc-breakdown-item">
                <span>Packing: </span><strong>${item.boxesPerCase} Boxes / Case</strong>
              </div>
            </div>
            <div class="calc-formula-display">
              <span class="formula-text">
                <i class="fas fa-calculator me-1"></i> ${item.boxesPerCase} Boxes × ₹${item.boxRate} =
              </span>
              <span class="case-rate-tag">₹${item.casePrice.toLocaleString('en-IN')} / Case</span>
            </div>
          </div>

          <!-- Quantity Stepper & Price Display -->
          <div class="quantity-control-section">
            <div class="qty-stepper">
              <button class="stepper-btn minus" onclick="updateCaseQty(${item.id}, -1)" aria-label="Decrease cases">-</button>
              <span class="case-count-display" id="case-display-${item.id}">${qty} Case${qty === 1 ? '' : 's'}</span>
              <button class="stepper-btn plus" onclick="updateCaseQty(${item.id}, 1)" aria-label="Increase cases">+</button>
            </div>

            <div class="item-total-display">
              <span class="item-total-label">${qty > 0 ? `${totalBoxes} Boxes Total` : 'Total Price'}</span>
              <span class="item-total-price ${qty > 0 ? 'has-items' : ''}" id="price-display-${item.id}">
                ₹${itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <!-- Quick Case Pills -->
          <div class="quick-add-row">
            <button class="quick-pill" onclick="setExactCaseQty(${item.id}, 1)">+1 Case</button>
            <button class="quick-pill" onclick="setExactCaseQty(${item.id}, 2)">+2 Cases</button>
            <button class="quick-pill" onclick="setExactCaseQty(${item.id}, 5)">+5 Cases</button>
            ${qty > 0 ? `<button class="quick-pill text-danger" onclick="setExactCaseQty(${item.id}, 0)">Reset</button>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Update quantity by increment (+1 / -1)
function updateCaseQty(id, delta) {
  const current = cartState[id] || 0;
  const next = Math.max(0, current + delta);
  cartState[id] = next;
  updateSingleCardUI(id);
  updateCartTotals();
}

// Set exact quantity (via pills)
function setExactCaseQty(id, qty) {
  cartState[id] = Math.max(0, qty);
  updateSingleCardUI(id);
  updateCartTotals();
}

// Update single product card UI without full re-render
function updateSingleCardUI(id) {
  const item = giftBoxes.find(b => b.id === id);
  if (!item) return;

  const qty = cartState[id] || 0;
  const itemTotal = qty * item.casePrice;
  const totalBoxes = qty * item.boxesPerCase;

  const card = document.getElementById(`card-${id}`);
  const caseDisplay = document.getElementById(`case-display-${id}`);
  const priceDisplay = document.getElementById(`price-display-${id}`);

  if (caseDisplay) {
    caseDisplay.textContent = `${qty} Case${qty === 1 ? '' : 's'}`;
  }

  if (priceDisplay) {
    priceDisplay.textContent = `₹${itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (qty > 0) {
      priceDisplay.classList.add('has-items');
      const label = priceDisplay.previousElementSibling;
      if (label) label.textContent = `${totalBoxes} Boxes Total`;
    } else {
      priceDisplay.classList.remove('has-items');
      const label = priceDisplay.previousElementSibling;
      if (label) label.textContent = 'Total Price';
    }
  }

  if (card) {
    if (qty > 0) {
      card.classList.add('active-in-cart');
    } else {
      card.classList.remove('active-in-cart');
    }

    // Refresh quick add row to show or hide Reset button
    const quickRow = card.querySelector('.quick-add-row');
    if (quickRow) {
      quickRow.innerHTML = `
        <button class="quick-pill" onclick="setExactCaseQty(${item.id}, 1)">+1 Case</button>
        <button class="quick-pill" onclick="setExactCaseQty(${item.id}, 2)">+2 Cases</button>
        <button class="quick-pill" onclick="setExactCaseQty(${item.id}, 5)">+5 Cases</button>
        ${qty > 0 ? `<button class="quick-pill text-danger" onclick="setExactCaseQty(${item.id}, 0)">Reset</button>` : ''}
      `;
    }
  }
}

// Switch Alternate Image (Minions / Ice Age)
function switchImage(id, newSrc, tabElement, event) {
  if (event) event.stopPropagation();
  const img = document.getElementById(`img-${id}`);
  if (img) img.src = newSrc;

  const parent = tabElement.parentElement;
  if (parent) {
    parent.querySelectorAll('.alt-tab').forEach(tab => tab.classList.remove('active'));
    tabElement.classList.add('active');
  }
}

// Calculate and update Cart Summary Bar (Matching wholesale.html & estimate.html)
function updateCartTotals() {
  let totalCases = 0;
  let totalBoxes = 0;
  let subtotal = 0;

  giftBoxes.forEach(item => {
    const qty = cartState[item.id] || 0;
    if (qty > 0) {
      totalCases += qty;
      totalBoxes += qty * item.boxesPerCase;
      subtotal += qty * item.casePrice;
    }
  });

  const packingCharge = Math.round(subtotal * 0.03); // 3% Packing Charge
  const grandTotal = subtotal + packingCharge;

  const cartSummary = document.getElementById('cartSummary');
  const itemsCount = document.getElementById('cartItemsCount');
  const totalAmountElement = document.getElementById('cartTotalAmount');
  const packingNote = document.getElementById('cartPackingNote');

  if (totalCases > 0) {
    if (cartSummary) cartSummary.style.display = 'block';
    if (itemsCount) itemsCount.textContent = `${totalCases} Case${totalCases > 1 ? 's' : ''} (${totalBoxes} Boxes)`;
    if (totalAmountElement) totalAmountElement.textContent = `₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (packingNote) packingNote.innerHTML = `<small style="font-size: 11px; opacity: 0.85; display: block;">(Subtotal: ₹${subtotal.toLocaleString('en-IN')} + 3% Packing: ₹${packingCharge.toLocaleString('en-IN')})</small>`;
    document.body.style.paddingBottom = '110px';
  } else {
    if (cartSummary) cartSummary.style.display = 'none';
    document.body.style.paddingBottom = '0';
  }
}

// WhatsApp Wholesale order submission (Exact match to wholesale page)
function orderViaWhatsApp() {
  let selectedItems = [];
  let totalCases = 0;
  let totalBoxes = 0;
  let subtotal = 0;

  giftBoxes.forEach(item => {
    const qty = cartState[item.id] || 0;
    if (qty > 0) {
      const itemBoxes = qty * item.boxesPerCase;
      const itemTotal = qty * item.casePrice;
      totalCases += qty;
      totalBoxes += itemBoxes;
      subtotal += itemTotal;
      selectedItems.push({
        name: item.name,
        itemsCount: item.items,
        rate: item.boxRate,
        boxesPerCase: item.boxesPerCase,
        casePrice: item.casePrice,
        casesCount: qty,
        totalBoxes: itemBoxes,
        totalAmount: itemTotal
      });
    }
  });

  if (selectedItems.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Cart is Empty',
      text: 'Please select at least 1 Case of gift boxes to place your order!',
      confirmButtonColor: '#28a745'
    });
    return;
  }

  const packingCharge = Math.round(subtotal * 0.03);
  const grandTotal = subtotal + packingCharge;

  // Show SweetAlert form matching wholesale / estimate
  Swal.fire({
    title: '<strong>Enter Wholesale Order Details</strong>',
    html: `
      <div style="text-align:left; font-size:13px; margin-bottom:12px; color:#495057; background:#fff3cd; padding:8px 12px; border-radius:6px;">
        📦 <strong>${totalCases} Case(s) (${totalBoxes} Boxes)</strong><br>
        💰 <strong>Grand Total: ₹${grandTotal.toLocaleString('en-IN')}</strong> (including 3% packing)
      </div>
      <input type="text" id="custName" class="swal2-input" placeholder="Shop / Contact Name *" style="margin: 8px auto; width: 90%;">
      <input type="tel" id="custNumber" class="swal2-input" placeholder="Phone / WhatsApp Number *" style="margin: 8px auto; width: 90%;">
      <textarea id="custAddress" class="swal2-textarea" placeholder="Delivery Address *" style="margin: 8px auto; width: 90%; height: 75px;"></textarea>
      <input type="text" id="custPincode" class="swal2-input" placeholder="Pincode / Town *" style="margin: 8px auto; width: 90%;">
      <input type="text" id="custLorry" class="swal2-input" placeholder="Preferred Lorry / Transport (Optional)" style="margin: 8px auto; width: 90%;">
    `,
    showCancelButton: true,
    confirmButtonText: '<i class="fab fa-whatsapp me-2"></i> Order via WhatsApp',
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#6c757d',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const name = document.getElementById('custName').value.trim();
      const number = document.getElementById('custNumber').value.trim();
      const address = document.getElementById('custAddress').value.trim();
      const pincode = document.getElementById('custPincode').value.trim();
      const lorry = document.getElementById('custLorry').value.trim();

      if (!name || !number || !address || !pincode) {
        Swal.showValidationMessage('Please fill all required fields (*)');
        return false;
      }
      return { name, number, address, pincode, lorry };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { name, number, address, pincode, lorry } = result.value;

      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

      let message = `🎆 *Happy Enjoy Crackers - Wholesale Gift Box Order* 🎆\n\n`;
      message += `📅 *Order Date:* ${dateStr}, ${timeStr}\n`;
      message += `👤 *Customer / Shop Name:* ${name}\n`;
      message += `📞 *Phone Number:* ${number}\n`;
      message += `🏠 *Delivery Address:* ${address}\n`;
      message += `📮 *Pincode:* ${pincode}\n`;
      if (lorry) {
        message += `🚛 *Preferred Lorry Transport:* ${lorry}\n`;
      }
      message += `\n📦 *ORDERED GIFT BOX CASES:*\n`;
      message += `------------------------------------\n`;

      selectedItems.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   • Rate: ₹${item.rate} / box | Packing: ${item.boxesPerCase} boxes/case\n`;
        message += `   • Ordered: *${item.casesCount} Case(s)* (${item.totalBoxes} Boxes)\n`;
        message += `   • Calculation: ${item.casesCount} Case(s) × ₹${item.casePrice.toLocaleString('en-IN')} = *₹${item.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}*\n\n`;
      });

      message += `------------------------------------\n`;
      message += `Total Cases           : ${totalCases} Case(s) (${totalBoxes} Boxes)\n`;
      message += `Subtotal Amount       : ₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n`;
      message += `Packing Charge (3%)   : ₹${packingCharge.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n`;
      message += `------------------------------------\n`;
      message += `*GRAND TOTAL          : ₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}*\n\n`;
      message += `_Note: Sivakasi to destination transport freight payable upon delivery._\n`;
      message += `Thank you for choosing Happy Enjoy Crackers! 🙏`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/919962314877?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');

      Swal.fire('Success!', 'Redirecting to WhatsApp to send your order...', 'success');
    }
  });
}

// Ensure globally accessible
window.orderViaWhatsApp = orderViaWhatsApp;
window.updateCaseQty = updateCaseQty;
window.setExactCaseQty = setExactCaseQty;
window.openZoomModal = openZoomModal;
window.closeZoomModal = closeZoomModal;
window.switchImage = switchImage;

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchBox');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    if (!term) {
      renderGiftBoxes(giftBoxes);
      return;
    }

    const filtered = giftBoxes.filter(item => {
      return (
        item.name.toLowerCase().includes(term) ||
        item.boxName.toLowerCase().includes(term) ||
        item.items.toString().includes(term) ||
        item.brand.toLowerCase().includes(term)
      );
    });

    renderGiftBoxes(filtered);
  });
}

// Image Zoom Modal
function setupImageZoomModal() {
  const overlay = document.getElementById('imageZoomModal');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeZoomModal();
      }
    });
  }
}

function openZoomModal(imgSrc, title) {
  const overlay = document.getElementById('imageZoomModal');
  const modalImg = document.getElementById('zoomModalImage');
  const modalTitle = document.getElementById('zoomModalTitle');

  if (overlay && modalImg) {
    modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeZoomModal() {
  const overlay = document.getElementById('imageZoomModal');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

}
