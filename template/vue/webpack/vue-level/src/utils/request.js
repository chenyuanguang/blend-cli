const reqHeaders = {
  token: localStorage.getItem('token') || ''
}
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  options = Object.assign({}, options, {
    headers: {
      ...options.headers,
      ...reqHeaders
    }
  })
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => err );
}
