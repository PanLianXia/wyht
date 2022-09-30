import express, { Request, Response } from 'express'
import { discovery } from './route'
import path from 'path'
import cors from 'cors'

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

app.get('/discovery', expressRouterTransfer(discovery.get))

app.use('/assets',express.static(path.resolve(__dirname, './assets')))

app.listen(3002, () => {
    console.log('app listen @3002')
})
