import { ChatSession } from "./ChatSession"
import { Random } from 'mockjs'

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
    private static repo: UserRepo
    public static getRepo() {
        if(!UserRepo.repo) {
            UserRepo.repo = new UserRepo
        }
        return UserRepo.repo
    }
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
    /**
     * 随机生成用户
     * @param imageList 头像列表
     * @param N 需要生成的用户数量
     */
     static generate(imageList: string[], N: number) {
        for(let i = 1; i < N; i++) {
            const user = new User(i, Random.cname(), imageList[Math.floor(Math.random() * imageList.length)])
            UserRepo.getRepo().add(user)
        }
    }
}