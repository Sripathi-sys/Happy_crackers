// Recalculate total on quantity change
document.querySelectorAll('.qty').forEach(input => {
    input.addEventListener('input', () => {
      const row = input.closest('tr');
      const price = parseFloat(row.dataset.price);
      const qty = parseInt(input.value || 0);
      const totalCell = row.querySelector('.total');
      totalCell.textContent = "₹" + (price * qty);
    });
  });
  
  // Send Order to WhatsApp
  function sendOrderToWhatsApp() {
    let orderText = "New Order%0A%0AItem\tQty\tTotal";
    let grandTotal = 0;
  
    document.querySelectorAll('#productTable tbody tr').forEach(row => {
      const name = row.dataset.name;
      const price = parseFloat(row.dataset.price);
      const qty = parseInt(row.querySelector('.qty').value || 0);
  
      if (qty > 0) {
        const total = price * qty;
        orderText += `%0A${name}\t x ${qty}\t ₹${total}`;
        grandTotal += total;
      }
    });
  
    if (grandTotal === 0) {
      alert("Please select at least one product.");
      return;
    }
  
    orderText += `%0A%0AGrand Total: ₹${grandTotal}`;
    const phone = "91xxxxxxxxxx"; // your WhatsApp number
    const url = `https://wa.me/${phone}?text=${orderText}`;
    window.open(url, "_blank");
  }
  