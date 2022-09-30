import { Random } from "mockjs"
import { DiscoveryItem, DiscoveryRepo } from "./Discovery"
import { User, UserRepo } from "./User"

export class Repository {
    public static readonly userRepo: UserRepo = new UserRepo()
    public static readonly discoverRepo: DiscoveryRepo = new DiscoveryRepo()

    /**
     * 随机生成用户
     * @param imageList 头像列表
     * @param N 需要生成的用户数量
     */
     static generateUsers(imageList: string[], N: number) {
        for(let i = 1; i < N; i++) {
            const user = new User(i, Random.cname(), imageList[Math.floor(Math.random() * imageList.length)])
            Repository.userRepo.add(user)
        }
    }

    static generateDiscoveryItem() {
        const users = [...Repository.userRepo.getAll()];
        [...Array(10)].forEach((_, i) => {
            Repository.discoverRepo.add(
                new DiscoveryItem(
                    Random.ctitle(), 
                    Random.csentence(), 
                    Random.image('100x100'), 
                    users[Math.floor(Math.random()*users.length)]
                )
            )
        })
    }


    static {
        Repository.generateUsers([
            'http://localhost:3002/assets/p1.png',
            'http://localhost:3002/assets/p2.png',
            'http://localhost:3002/assets/p3.png',
            'http://localhost:3002/assets/p4.png',
            'http://localhost:3002/assets/p5.png',
            'http://localhost:3002/assets/p6.png',
            'http://localhost:3002/assets/p7.jpg',
            'http://localhost:3002/assets/p8.png',
            'http://localhost:3002/assets/p9.jpg',
        ], 20);

        Repository.generateDiscoveryItem()
    }
}