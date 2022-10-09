import { Repository, User } from "@huatian/domain"
import { Request } from "express"

type AuthorizedRequest = Request & {
    user: User
}
export const put = (req: AuthorizedRequest) => {
    const uid = req.params.uid
    const to = Repository.userRepo().getById(uid)
    req.user.addRelation(to)
}

export const get = (req: AuthorizedRequest) => {
    const uid = req.params.uid
    const user = Repository.userRepo().getById(uid)
    return Repository.relationShipRepo().friends(user).map(friend => {
        return friend.toJSON()
    })
}