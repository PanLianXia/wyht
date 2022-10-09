export async function xfetch(input: RequestInfo, init: RequestInit = {}) {
    if (!init.headers) {
      init.headers = {
      }
    }
    init.headers['x-token'] = sessionStorage['token']
    if (init && init.method !== "GET") {
      init.headers["Content-Type"] = "application/json"
    }
    const resp = await fetch(input, init)
  
    if (resp.status >= 200 && resp.status < 300) {
      const { success, data, message } = await resp.json()
      if (!success) {
        throw new Error("Error:" + message)
      }
      return data
    }
  
    if(resp.status >= 400 && resp.status < 500) {
      throw new Error('404 not found!')
    }
  
    if(resp.status >= 500) {
      const { message } = await resp.json()
      throw new Error('Server side error:' + message)
    }
  
    throw new Error('unhandeld response status.' + resp.status)
  
  
  }