import { xfetch } from "./xfetch"
import { ChatRecord } from '@huatian/domain'

export const post = async (to: number, msg: string) => {
  const url = `${import.meta.env.VITE_HOST}/message`
  return xfetch(url, {
    method: "POST",
    body: JSON.stringify({
      to,
      msg,
    })
  })
}


export const get = async (to: number) => {
  const url = `${import.meta.env.VITE_HOST}/message?to=${to}`
  return xfetch(url) as Promise<ChatRecord[]>
}
