import { ChatSession } from "./ChatSession"

export class User {
    constructor(
        private id: number,
        private uname: string,
        private avatar: string
    ) {}

    createChatSession(to: User) {
        const session = new ChatSession(this, to)
        return session
    }

    getAvatar() {
        return this.avatar
    }

    public getId() {
        return this.id
    }

    public getName() {
        return this.uname
    }
}

export class UserRepo {
    private users: Map<number, User>

    constructor() {
        this.users = new Map()
    }

    public getById(id: number) {
        return this.users.get(id)
    }

    public add(user: User) {
        this.users.set(user.getId(), user)
    }

    public getAll() {
        return this.users.values()
    }
}