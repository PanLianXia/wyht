import { Repository, User } from "@huatian/domain"
import { Request } from "express"

type AuthorizedRequest = Request & {
    user: User
}

export const get = (req: AuthorizedRequest) => {
    const relationRepo = Repository.relationShipRepo()
    const users = [...Repository.userRepo().getAll()]
        .filter(user => user.getId() !== req.user.getId())
        .filter(user => !relationRepo.isFriend(user, req.user))
        .slice(0, 10)
        .map(user => user.toJSON())

    return users
}