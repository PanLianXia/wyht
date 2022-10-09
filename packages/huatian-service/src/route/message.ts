import { Repository } from "@huatian/domain"
import { Request } from "express"
import { AuthorizedRequest } from "./route.type"

export const post = (req: AuthorizedRequest) => {
    const receiverId = req.body.to
    const msg = req.body.msg

    const from = req.user
    const to = Repository.userRepo().getById(receiverId)
    
    const session = Repository.chatSessionRepo().getSession(from, to)
    const sessionTo = Repository.chatSessionRepo().getSession(to, from)
    session.send(msg)
    sessionTo.receive(msg)
    return 'ok'
}

export const get = (req: AuthorizedRequest) => {
    const receiverId = req.query.to as string

    const from = req.user
    const to = Repository.userRepo().getById(receiverId)
    
    const session = Repository.chatSessionRepo().getSession(from, to)

    return session.getChatRecords()
}