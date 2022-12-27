const makeRequest = async (url, method = 'GET', data) => {
  const options = {
    method,
    credentials: 'include'
  }

  if (data) {
    Object.assign(options, {
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    })
  }

  const response = await fetch(`http://localhost:8086/${url}`, options)

  return response.json()
}

export const request = {
  get(url) {
    return makeRequest(url)
  },

  post(url, data) {
    return makeRequest(url, 'POST', data)
  },

  put(url, data) {
    return makeRequest(url, 'PUT', data)
  }
}
