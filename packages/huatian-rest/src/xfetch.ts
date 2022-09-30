export async function xfetch(input: RequestInfo, init?: RequestInit) {
    const resp = await fetch(input, init)

    if(init && init.method !== 'GET') {
        if(!init.headers) {
            init.headers = {}
        }
        init.headers['Content-Type'] = 'application/json'
    }

    if(resp.status >= 200 && resp.status < 300) {
        const { success, data, message } = await resp.json()
        if(!success) {
            throw new Error('Error:' + message)
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
    throw new Error('unhandled response statue.' + resp.status)
}