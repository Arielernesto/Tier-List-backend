import express from 'express'
import cors from 'cors'
import { AuthRouter } from '../routes/AuthRoutes.js'
import cookieParser from 'cookie-parser'
import { AuthController } from '../controllers/AuthController.js'
import { TierRouter } from '../routes/TierRoutes.js'

const app = express()
const PORT = process.env.PORT ?? 4000


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())
app.use(AuthController.authorize)

app.use("/tier", TierRouter)


app.use(express.json())

app.use("/auth", AuthRouter)




app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})