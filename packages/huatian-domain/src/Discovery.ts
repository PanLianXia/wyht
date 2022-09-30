import { User } from "./User";

export class DiscoveryRepo {
    private list: DiscoveryItem[] = []

    public getAll() {
        return this.list
    }

    public add(item: DiscoveryItem) {
        this.list.push(item)
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