// 如果不想触发里边任何的指令就添加type关键字
import type { User } from "@huatian/domain"
import type { Request } from "express"

export type AuthorizedRequest = Request & {
    user: User
}