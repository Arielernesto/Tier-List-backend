import express from 'express'
import cors from 'cors'
import { AuthRouter } from '../routes/AuthRoutes.js'
import cookieParser from 'cookie-parser'
import { AuthController } from '../controllers/AuthController.js'
import { TierRouter } from '../routes/TierRoutes.js'

const app = express()
const PORT = process.env.PORT ?? 4000


app.use(cors({
    credentials: true
}))

app.use(cookieParser())
app.use(AuthController.authorize)
app.get("/", (req, res) => {
    return res.json("HOLA MUNDO")
} )
app.use("/tier", TierRouter)


app.use(express.json())

app.use("/auth", AuthRouter)




app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})