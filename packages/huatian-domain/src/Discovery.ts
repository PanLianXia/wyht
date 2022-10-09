import { Random } from "mockjs";
import { Repository } from "./Repository";
import { User } from "./User";

export class DiscoveryRepo {
    private list: DiscoveryItem[] = []

    constructor() {
        this.generateDiscoveryItem()
    }

    public getAll() {
        return this.list
    }

    public add(item: DiscoveryItem) {
        this.list.push(item)
    }

    generateDiscoveryItem() {
        const users = [...Repository.userRepo().getAll()];
        [...Array(10)].forEach((_, i) => {
            this.add(
                new DiscoveryItem(
                    Random.ctitle(), 
                    Random.csentence(), 
                    Random.image('100x100'), 
                    users[Math.floor(Math.random()*users.length)]
                )
            )
        })
    }
}

export class DiscoveryItem {
    constructor(
        private title: string, 
        private content: string, 
        private cover: string,
        private user: User
    ){}

    public toJSON() {
        return {
            title: this.title,
            content: this.content,
            cover: this.cover,
            avatar: this.user.getAvatar()
        }
    }
}