import { Repository } from "./Repository"
import { User } from "./User"

export class RelationRepo {
    private relations: Map<number, Set<number>> = new Map()

    public addToFriend(a: User, b: User) {
        // a和b做朋友
        const linkToA = this.relations.get(a.getId())
        if(!linkToA) {
            this.relations.set(a.getId(), new Set())
        }
        this.relations.get(a.getId())!.add(b.getId())
    }

    public addRelation(a: User, b: User) {
        // a和b做朋友,b和a做朋友
        this.addToFriend(a, b)
        this.addToFriend(b, a)
    }

    /**
     * 获取自己的朋友
     * @param a 
     */
    public friends(a: User) {
        const friendsInId = this.relations.get(a.getId())
        if(!friendsInId) {
            return []
        }
        return [...friendsInId.values()].map(x => Repository.userRepo().getById(x))
    }

    /**
     * 判断两个人是否是朋友
     * @param a 
     * @param b 
     */
    public isFriend(a: User, b: User) {
        const friendsInId = this.relations.get(a.getId()) || new Set()
        return friendsInId.has(b.getId())
    }
}