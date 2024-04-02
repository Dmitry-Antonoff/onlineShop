const { categoriesForm } = document.forms;

function showToast(message, { type = 'error' } = {}) {
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = type === 'error' ? '#ff000091' : '#00800075';
  toast.style.color = 'white';
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

categoriesForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(categoriesForm);
    console.log(data);
    const res = await fetch('/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    if (res.status === 200) {
      showToast('Категория добавлено', { type: 'success' });
    }
  } catch (error) {
    console.log(error);
  }
});
