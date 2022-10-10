import { DiscoveryRepo } from "./Discovery"
import { UserRepo } from "./User"
import { RelationRepo } from './RelationShip'
import { ChatSessionRepo } from "./ChatSession"

export class Repository {
    private static _userRepo: UserRepo
    private static _discoveryRepo: DiscoveryRepo
    private static _relationShipRepo: RelationRepo
    private static _chatSessionRepo: ChatSessionRepo

    public static userRepo () {
        if(!Repository._userRepo) {
            Repository._userRepo = new UserRepo()
        }
        return Repository._userRepo
    }

    public static discoveryRepo () {
        if(!Repository._discoveryRepo) {
            Repository._discoveryRepo = new DiscoveryRepo()
        }
        return Repository._discoveryRepo
    }

    public static relationShipRepo () {
        if(!Repository._relationShipRepo) {
            Repository._relationShipRepo = new RelationRepo()
        }
        return Repository._relationShipRepo
    }

    public static chatSessionRepo () {
        if(!Repository._chatSessionRepo) {
            Repository._chatSessionRepo = new ChatSessionRepo()
        }
        return Repository._chatSessionRepo
    }
}