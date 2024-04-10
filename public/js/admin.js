const { categoriesForm, productForm, productEditForm, categoryEditForm } = document.forms;
const btndeleteProduct = document.querySelectorAll('.btn-product-delete');
const btndeleteCategory = document.querySelectorAll('.btn-delete-category');
const characteristicsAdd = document.querySelector('.add-value-characteristics');
const characteristicsAddInput = document.querySelector('.characteristics-add');

function showToast(message, { type = 'error' } = {}) {
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = type === 'error' ? '#ff000091' : '#fff';
  toast.style.color = 'black';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.zIndex = '1000';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

document.addEventListener('click', async (e) => {
  if (e.target.textContent === 'Сделать Админом') {
    try {
      const { id } = e.target.dataset;
      const res = await fetch(`/admin/${id}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (res.status === 400) {
        alert('Что-то пошло не так');
      }

      document.getElementById(`${id}-add`).remove();
      const li = document.getElementById(`${id}`);
      li.insertAdjacentHTML(
        'beforeend',
        `<button type="button" class="btnUndoAdmin" data-id=${id} id="${id}-undo">Убрать Админа</button>`,
      );
    } catch (error) {
      console.error(error);
    }
  } else if (e.target.textContent === 'Убрать Админа') {
    try {
      const { id } = e.target.dataset;
      const res = await fetch(`/admin/${id}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (res.status === 400) {
        alert('Что-то пошло не так');
      }
      const btnId = document.getElementById(`${id}-undo`);
      btnId.remove();
      const li = document.getElementById(`${id}`);
      li.insertAdjacentHTML(
        'beforeend',
        `<button type="button" class="btnAddAdmin" data-id=${id} id="${id}-add">Сделать Админом</button>`,
      );
    } catch (error) {
      console.error(error);
    }
  }
});

categoriesForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(categoriesForm);
    const res = await fetch('/categories', {
      method: 'POST',
      body: data,
    });
    if (res.status === 200) {
      showToast('Категория добавлена', { type: 'success' });
      window.location.href = '/admin/categories';
    }
  } catch (error) {
    console.log(error);
  }
});

productForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(productForm);
    const res = await fetch('/products', {
      method: 'POST',
      body: data,
    });
    if (res.status === 200) {
      showToast('Товар добавлен', { type: 'success' });
      window.location.href = '/admin/products';
    }
  } catch (error) {
    console.log(error);
  }
});

productEditForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(productEditForm);
    const { id } = e.target.dataset;
    const res = await fetch(`/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    // console.log(res);
    if (res.status === 200) {
      showToast('Товар изменён', { type: 'success' });
      window.location.href = '/admin/products';
    }
  } catch (error) {
    console.log(error);
  }
});

categoryEditForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(categoryEditForm);
    const { id } = e.target.dataset;
    console.log(id);
    const res = await fetch(`/admin/category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    });
    // console.log(res);
    if (res.status === 200) {
      showToast('Категория изменена', { type: 'success' });
      window.location.href = '/admin/categories';
    }
  } catch (error) {
    console.log(error);
  }
});

btndeleteProduct.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    // e.preventDefault();
    try {
      const { id } = e.target.dataset;

      if (!confirm('Вы точно хотите удалить?')) {
        return;
      }

      const res = await fetch(`/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res.status === 200) {
        document.getElementById(`${id}`).remove();
      }
    } catch (error) {
      console.error(error);
    }
  });
});

btndeleteCategory.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    // e.preventDefault();
    try {
      const { id } = e.target.dataset;

      if (!confirm('Вы точно хотите удалить?')) {
        return;
      }

      const res = await fetch(`/admin/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res.status === 200) {
        document.getElementById(`${id}`).remove();
      }
    } catch (error) {
      console.error(error);
    }
  });
});

characteristicsAdd?.addEventListener('click', async () => {
  const keyValuePair = document.createElement('div');
  keyValuePair.className = 'key-value';

  const keyInput = document.createElement('input');
  keyInput.type = 'text';
  keyInput.placeholder = 'Ключ';

  const valueInput = document.createElement('input');
  valueInput.type = 'text';
  valueInput.placeholder = 'Значение';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'key-value-delete';

  const trashImage = document.createElement('img');
  trashImage.className = 'key-value-trash';
  trashImage.src = '/svg/trash.svg';
  trashImage.alt = 'Удалить';

  deleteButton.appendChild(trashImage);

  keyValuePair.appendChild(keyInput);
  keyValuePair.appendChild(valueInput);
  keyValuePair.appendChild(deleteButton);

  characteristicsAddInput.appendChild(keyValuePair);

  deleteButton.addEventListener('click', () => {
    keyValuePair.remove();
  });
});
