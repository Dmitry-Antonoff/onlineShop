const addBasket = document.querySelectorAll('.addBasket');
const delAllBasket = document.querySelector('.delAllBasket');
const trashBtn = document.querySelectorAll('.trash-btn');
const intoAll = document.querySelectorAll('.into-basket-products');

intoAll.forEach((into) => {
  into.addEventListener('input', async (e) => {
    try {
      const price = document.getElementById(`price-${e.target.id}`).textContent;
      const sum = document.getElementById(`sum-${e.target.id}`);
      const inputValue = e.target.value;
      const result = +price * +inputValue;
      sum.innerText = result;
      fetch('', {})
    } catch (error) {
      console.log(error);
    }
  });
});

addBasket?.forEach((basket) => {
  basket.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const { productid } = e.target.dataset;
      const res = await fetch('/basket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: basket.quantity.value, productId: productid }),
      });
      if (res.status === 200) {
        showToast('Товар добавлен в корзину', { type: 'success' });
        basket.quantity.value = '';
      }
    } catch (error) {
      console.log(error);
    }
  });
});

delAllBasket?.addEventListener('click', async () => {
  await fetch('/basket/all', {
    method: 'DELETE',
  });
  const trs = document.querySelectorAll('.all-products-li');
  trs.forEach((tr) => tr.remove());
  localStorage.clear();
});

trashBtn?.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    await fetch('/basket', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.target.id }),
    });

    const tr = document.getElementById(`tr-${e.target.id}`);
    tr?.remove();
    localStorage.removeItem(`sum-${e.target.id}`);
    localStorage.removeItem(`input-${e.target.id}`);
  });
});
