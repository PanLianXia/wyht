// Observer/Subscriber: 观察者
// Observable/Publish: 发布者
// Topic/EventType: 话题

type EventHandler = (...args : any[]) => void
export class Emiter<EventType extends string | number> {
    private topics = new Map<EventType, EventHandler[]>()

    private getTopic(type: EventType): EventHandler[] {
        if(!this.topics.has(type)) {
            this.topics.set(type, [])
        }
        return this.topics.get(type)
    }

    private removeHandler(type: EventType, handler: EventHandler) {
        if(!this.topics.has(type)) {
            return
        }
        const handlers = this.topics.get(type).filter(x => x !== handler)
        this.topics.set(type, handlers)
    }

    on(type: EventType, handler: EventHandler) {
        const handlers = this.getTopic(type)
        handlers.push(handler)

        // unsubscribe
        return () => {
            this.removeHandler(type, handler)
        }
    }

    emit(type: EventType, ...args: any[]) {
        const handlers = this.getTopic(type)
        handlers.forEach(handler => {
            handler(...args)
        })
    }
}

// enum Topics {
//     Login,
//     Register
// }

// const a = new Emiter<Topics>()

// const unsubscribe = a.on(Topics.Login, (msg: string) => {
//     console.log(msg)
// })
// a.on(Topics.Register, (msg: string) => {
//     console.log(msg)
// })

// a.emit(Topics.Login, 'login')
// unsubscribe()
// a.emit(Topics.Login, 'login 2')