import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Helloss World!fuck off yepsaaa')
})

app.listen(4000)