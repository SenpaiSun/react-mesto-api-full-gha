const adress = 'http://localhost:3000'

function checkError(res) {
      if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
      };

export function userRegister(email, password) {
  return fetch(`${adress}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
  .then(res => checkError(res))
}

export function userLogin(email, password) {
  return fetch(`${adress}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
  .then(res => checkError(res))
}

export function userToken(token) {
  return fetch(`${adress}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
  }})
  .then(res => checkError(res))
}