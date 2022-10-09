import express, { NextFunction, Request, Response } from 'express'
import * as routes from './route'
import path from 'path'
import cors from 'cors'
import { Repository, User } from '@huatian/domain'

const app = express()

app.use(cors())

type FN = (req?: Request) => any
function expressRouterTransfer(fn: FN) {
    return (req: Request, res: Response) => {
        try {
            const val = fn(req)
            res.send({
                success: true,
                data: val
            })
        } catch(ex) {
            console.error(ex)
            res.status(500).send({
                success: false,
                message: `${ex}`,
                data: null
            })
        }
    }
}

function token(req: Request & {user: User}, res: Response, next: NextFunction) {
    const token = req.headers['x-token'] as string
    if(!token) {
        res.status(500).send('token needed, you should login.')
        return
    }
    const [_, userId] = token.split('-')
    const user = Repository.userRepo().getById(userId)
    req.user = user
    next()
}

app.get('/discovery', expressRouterTransfer(routes.discovery.get))

app.put('/friend/:uid', token, expressRouterTransfer(routes.friend.put))
app.get('/friend/:uid', expressRouterTransfer(routes.friend.get))

app.get('/candidates', token, expressRouterTransfer(routes.candidates.get))

app.use('/assets',express.static(path.resolve(__dirname, './assets')))

app.listen(3002, () => {
    console.log('app listen @3002')
})
