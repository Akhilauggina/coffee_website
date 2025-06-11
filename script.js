document.querySelector('#order-form')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const item = document.getElementById('item').value;
  const quantity = document.getElementById('quantity').value;
  const customer = document.getElementById('customer').value;

  try {
    const response = await fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item, quantity, customer })
    });

    const message = await response.text();
    document.getElementById('order-message').innerText = message;
    document.getElementById('order-form').reset();
  } catch (error) {
    document.getElementById('order-message').innerText = 'Order failed.';
  }
});
