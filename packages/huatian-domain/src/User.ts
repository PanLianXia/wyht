import { Random } from "mockjs"
import { ChatSession, ChatSessionRepo } from "./ChatSession"
import { UserJson } from "./domain.types"
import { Repository } from "./Repository"

export class User {
    constructor(
        private id: number,
        private uname: string,
        private avatar: string
      ) {}

    getAvatar() {
        return this.avatar
    }

    public getId() {
        return this.id
    }

    public getName() {
        return this.uname
    }

    public addRelation(user: User) {
        Repository.relationShipRepo().addRelation(this, user)
    }

    public toJSON(): UserJson {
        return {
            id: this.id,
            uname: this.uname,
            avatar: this.avatar
        }
    }

    public static fromJson(json: UserJson) {
        const user = new User(json.id, json.uname, json.avatar)
        return user
    }
}

export class UserRepo {
    private users: Map<string, User>

    constructor() {
        this.users = new Map()
        this.generateUsers(20)
    }

    public getById(id: number | string) {
        return this.users.get(id+'')
    }

    public add(user: User) {
        this.users.set(user.getId()+'', user)
    }

    public getAll() {
        return this.users.values()
    }

    /**
     * 随机生成用户
     * @param imageList 头像列表
     * @param N 需要生成的用户数量
     */
    generateUsers(N: number) {
        const imageList = [
            'http://localhost:3002/assets/p1.png',
            'http://localhost:3002/assets/p2.png',
            'http://localhost:3002/assets/p3.png',
            'http://localhost:3002/assets/p4.png',
            'http://localhost:3002/assets/p5.png',
            'http://localhost:3002/assets/p6.png',
            'http://localhost:3002/assets/p7.jpg',
            'http://localhost:3002/assets/p8.png',
            'http://localhost:3002/assets/p9.jpg',
        ]
        for(let i = 1; i < N; i++) {
            const user = new User(i, Random.cname(), imageList[Math.floor(Math.random() * imageList.length)])
            this.add(user)
        }
    }
}