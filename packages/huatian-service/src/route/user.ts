import { Repository } from "@huatian/domain"
import { AuthorizedRequest } from "./route.type"

export const get = (req: AuthorizedRequest) => {
    const user = req.user
    return user.toJSON()
}