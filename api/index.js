import express from 'express'
import cors from 'cors'
import { AuthRouter } from './routes/AuthRoutes.js'
import cookieParser from 'cookie-parser'
import { AuthController } from './controllers/AuthController.js'
import { TierRouter } from './routes/TierRoutes.js'

const app = express()
const PORT = process.env.PORT ?? 3000


app.use(cors({
    origin: "https://tier-list-frontend.vercel.app",
    credentials: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "https://tier-list-frontend.vercel.app")
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.use(cookieParser())
app.use(AuthController.authorize)
app.get("/", (req, res) => {
    return res.json("HOLA MUNDOS")
} )
app.use("/tier", TierRouter)


app.use(express.json())

app.use("/auth", AuthRouter)




app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})

export default app