import { xfetch } from './xfetch'

export const put = async (uid: number) => {
    const url = `${import.meta.env.VITE_HOST}/friend/${uid}`
    return xfetch(url, {
      method : 'PUT'
    })
  }