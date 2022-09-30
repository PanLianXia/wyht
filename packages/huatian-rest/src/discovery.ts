import { xfetch } from './xfetch'

export const get = () => {
    const url = `${import.meta.env.VITE_HOST}/discovery`
    return xfetch(url)
}