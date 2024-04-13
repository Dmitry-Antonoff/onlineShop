const { registration, login } = document.forms;

async function submit(form, path) {
  const res = await fetch(path, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: form.name?.value,
      email: form.email.value,
      password: form.password.value,
    }),
  });
  return res;
}

function isValidEmail(email) {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email);
}

function displayErrorMessage(message, parentElement) {
  const errTxt = document.createElement('p');
  errTxt.innerText = message;
  errTxt.style.color = 'red';
  parentElement.appendChild(errTxt);
  setTimeout(() => {
    errTxt.remove();
  }, 4000);
}

registration?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (isValidEmail(e.target.email.value)) {
    const response = await submit(e.target, '/auth/registration');
    if (response.status === 200) {
      window.location.href = '/auth/login';
    } else if (response.status === 401) {
      displayErrorMessage('Адрес почты занят', registration);
    }
  } else {
    displayErrorMessage('Формат электронной почты неправильный', registration);
  }
});

login?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (isValidEmail(e.target.email.value)) {
    const response = await submit(e.target, '/auth/login');
    if (response.status === 200) {
      window.location.href = '/';
    } else {
      displayErrorMessage('Неправильный адрес почты или пароль', login);
    }
  } else {
    displayErrorMessage('Формат электронной почты неправильный', login);
  }
});
