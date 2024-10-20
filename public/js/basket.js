const { getOrder } = document.forms;

const addBasket = document.querySelectorAll('.addBasket');
const delAllBasket = document.querySelector('.delAllBasket');
const trashBtn = document.querySelectorAll('.trash-btn');
const intoAll = document.querySelectorAll('.into-basket-products');

function updateTotalSum() {
  const sumElements = document.querySelectorAll('.sum');
  let updatedTotalSum = 0;
  sumElements.forEach((elem) => {
    updatedTotalSum += parseFloat(elem.textContent);
  });
  document.getElementById('totalSum').textContent = updatedTotalSum;
}
intoAll.forEach((into) => {
  into.addEventListener('input', async (e) => {
    try {
      const price = document.getElementById(`price-${e.target.id}`).textContent;
      const sum = document.getElementById(`sum-${e.target.id}`);
      const inputValue = e.target.value;
      const result = +price * +inputValue;
      sum.innerText = result;

      // Обновляем значение totalSum
      updateTotalSum();

      fetch('/basket', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: inputValue, productId: e.target.id }),
      });
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
        body: JSON.stringify({
          quantity: basket.quantity.value,
          productId: productid,
        }),
      });
      if (res.status === 200) {
        showToast('Товар добавлен в корзину', { type: 'success' });

        const btn = document.getElementById(`btn-${productid}`);
        // Создадим новую кнопку "Уже в корзине" с нужными атрибутами и стилями
        const addedButton = document.createElement('button');
        addedButton.disabled = true;
        addedButton.type = 'button';
        addedButton.textContent = 'Уже в корзине';
        addedButton.style.backgroundColor = '#0876cc';
        addedButton.style.color = 'white';

        // Заменим кнопку "Добавить в корзину" на новую кнопку "Уже в корзине"
        basket.replaceChild(addedButton, btn);

        basket.quantity.value = 1;
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

getOrder?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(getOrder);

  const res = await fetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  if (res.status === 200) {
    showToast('Заказ успешно создан!', { type: 'success' });
    window.location.href = '/basket/done';
  }
});
