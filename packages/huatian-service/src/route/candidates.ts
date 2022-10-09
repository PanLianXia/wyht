import { Repository } from "@huatian/domain"
import { AuthorizedRequest } from "./route.type"

export const get = (req: AuthorizedRequest) => {
    const relationRepo = Repository.relationShipRepo()
    const users = [...Repository.userRepo().getAll()]
        .filter(user => user.getId() !== req.user.getId())
        .filter(user => !relationRepo.isFriend(user, req.user))
        .slice(0, 10)
        .map(user => user.toJSON())

    return users
}