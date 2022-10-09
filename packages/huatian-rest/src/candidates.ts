import { xfetch } from './xfetch'

export const get = async () => {
    const url = `${import.meta.env.VITE_HOST}/candidates`
    return xfetch(url)
}