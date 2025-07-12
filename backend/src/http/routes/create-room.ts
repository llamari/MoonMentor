import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"
import { z } from "zod/v4"

export const CreateRoomRoute: FastifyPluginCallbackZod = async (app) => {
    app.post('/rooms', {
        schema: {
            body: z.object({
                name: z.string().min(1),
                description: z.string().min(1).optional()
            })
        }
    }, async (request, response) => {
        const { name, description } = request.body
        const newRoom = await db.insert(schema.rooms).values({
            name: name,
            description: description,
        }).returning();;

        if (!newRoom[0]) {
            throw new Error('Falha ao criar nova sala')
        }

        return response.status(201).send({ message: "Room created" });
    })
}