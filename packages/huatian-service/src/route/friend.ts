import { Repository } from "@huatian/domain"
import { Request } from "express"
import { AuthorizedRequest } from "./route.type"

export const put = (req: AuthorizedRequest) => {
    const uid = req.params.uid
    const to = Repository.userRepo().getById(uid)
    req.user.addRelation(to)
}

export const getForAdmin = (req: Request) => {
    const uid = req.params.uid
    const user = Repository.userRepo().getById(uid)
    return Repository.relationShipRepo().friends(user).map(friend => {
        return friend.toJSON()
    })
}

export const get = (req: AuthorizedRequest) => {
    const user = req.user
    return Repository.relationShipRepo().friends(user).map(friend => {
        return friend.toJSON()
    })
}