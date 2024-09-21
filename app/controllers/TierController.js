import { prisma } from "../utils/prisma.js"

export class TierController {
    static async index(req, res) {
        const { user } = req.session
        if (!user) return res.status(401).json({error: "No estás autorizado para realizar esta acción"})
       try {
         const tiers = await prisma.tier.findMany({
             where: {
                 userId: user.id
             }
         })
         if (tiers) {
            return res.json(tiers)
         }
       } catch (error) {
        return res.status(500).json({error: "Ha ocurrido un error"})
       }

    }
    static async getAll(req, res) {
        try {
            const tiers = await prisma.tier.findMany({
                where: {
                    status: true
                }
            })
            return res.json({tiers})
        } catch (e) {
            return res.status(500).json({error: "Ha ocurrido un error"})
        }
    }


    static async find(req,res) {
        try {
            let body = ""
            req.on('data', chunk => {
                body += chunk.toString()
            })
            req.on('end', async () => {
                body = JSON.parse(body)
                const { user } = req.session
                if (!user) return res.status(401).json({error: "No estás autorizado para realizar esta acción"})
                const { id } = body
                if (typeof id != 'string') return res.status(401).json({error: "error de validación en el servidor", id: id})
                const tier = await prisma.tier.findUnique({
                    where: {
                        id: id
                    }
                })
                if (!tier) return res.status(400).json({error: "Ranking no encontrado"})
                return res.json({tier})
            })
        } catch (error) {
            return res.status(500).json({error: "Ha ocurrido un error"})
        }
    }
    static async store(req, res) {
        try {
        const { user } = req.session
        if (!user) return res.status(401).json({error: "Inicia sesión para guardar o publicar tu tierMaker"})
        let body = ""
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            body = JSON.parse(body)
            console.log(body)
            const results = body
            if (results.description.length < 10) return res.status(500).json({error: "Error de validación en el servidor"})
            if (results.name.length < 5) return res.status(500).json({error: "Error de validación en el servidor"})

            let statusTier = false
            if (results.status === true) {
                if (results.id != undefined) {
                    
                
                const tier = await prisma.tier.findUnique({
                    where: {
                        id: results.id
                    }
                })
                if (tier) {
                    await prisma.tier.update({
                        where: {
                            id: results.id
                        },
                        data: {
                            status: true
                        }
                }) 
                return res.json({message: "Tier publicado con éxito"})
            }
                }
                statusTier = true
            }
            
           
                const rowsString = JSON.stringify(results.rows)
                const picturesString = results.pictures ? JSON.stringify(results.pictures) : ""
        
                const tier = await prisma.tier.create({
                    data: {
                        ...results,
                        rows: rowsString,
                        pictures: picturesString,
                        status: statusTier,
                        userId: user.id
                    }
                })
            if (tier.status === true) return res.json({message: "Tier publicado con éxito", tier})
            return res.json({message: "Tier guardado con éxito" ,tier})
        })
   
        } catch (error) {
           return res.status(500).json(error.message)
        }
    }
    static async update(req, res){
        try {
        const { user } = req.session
        if (!user) return res.status(401).json({error: "Inicia sesión para guardar o publicar tu tierMaker"})
        let body = ""
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            body = JSON.parse(body)
            const { id } = body
            console.log(body)
            const tier = await prisma.tier.findUnique({
                where: {
                    id: id
                }
            })
            if (!tier) return res.status(400).json({error: "Ranking no encontrado"})
            let status = false
            if (body.status == true && tier.status == false) status = true
            if (tier.status == true) status = true
            const rowsString = JSON.stringify(body.rows)
            const picturesString = body.pictures ? JSON.stringify(body.pictures) : ""

            const tierUpdated = await prisma.tier.update({
                where: {
                    id: id
                },
                data: {
                    name: body.name,
                    description: body.description,
                    image: body.image,
                    rows: rowsString,
                    pictures: picturesString,
                    status: status
                }
            })
            return res.json({message: "Ranking actualizado con éxito", tierUpdated})
        })
        } catch (error) {
            return res.status(500).json("Ha ocurrido un error")
        }
    }
    static async delete(req, res){
        try {
        const { user } = req.session
        if (!user) return res.status(401).json({error: "Acción no autorizada"})
           let body = ""
           req.on("data", chunk => {
                body += chunk.toString()
           })
           req.on("end", async () => {
            body = JSON.parse(body)
            const  { id } = body
            const tier = await prisma.tier.delete({
                where: {
                    id: id
                }
            })
            if (tier) {
                return res.json({message: "Ranking eliminado con éxito", tier})
            }
            return res.status(401).json({error: "Ha ocurrido un error"})
           })
        } catch (error) {
            return res.json({error: "Ha ocurrido un error"})
        }
    }
}