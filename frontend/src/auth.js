export const BASE_URL = 'https://api.berezdon.nomoredomain.nomoredomains.club';

export const register = ( password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      try {
        if (res.status === 201){
          return res.json();
        }
      } catch(e){
        return (e)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
    .then((res) => {
      try {
        if (res.status === 200){
          return res.json();
        }
      } catch(e){
        return (e)
      }
    })
    .then((data) => {
      console.log(data);
      if (data.token){
        return data;
      }
    })
    .catch(err => console.log(err))
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => data)
}

