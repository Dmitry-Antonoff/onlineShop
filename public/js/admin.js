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
        `<button type="button" class="btnUndoAdmin" data-id=${id} id="${id}-add">Убрать Админа</button>`,
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
      const btnId = document.getElementById(`${id}-add`);
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
