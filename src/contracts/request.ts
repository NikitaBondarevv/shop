import { IUser } from 'interfaces/IUser'

const makeRequest = async <T extends IUser>(url: string, data?: T, method = 'GET') => {
  const options: RequestInit = {
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
  get(url: string) {
    return makeRequest(url)
  },

  post(url: string, data: IUser) {
    return makeRequest(url, data, 'POST')
  },

  put(url: string, data: IUser) {
    return makeRequest(url, data, 'PUT')
  }
}
