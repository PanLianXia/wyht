import { xfetch } from './xfetch'
import { UserJson } from '@huatian/domain'

export const get = async () => {
  const url = `${import.meta.env.VITE_HOST}/user`
  return xfetch(url) as Promise<UserJson>
}