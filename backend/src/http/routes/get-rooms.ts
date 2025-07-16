import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"
import { count, eq } from "drizzle-orm"

export const GetRoomsRoute: FastifyPluginCallbackZod = async (app) => {
    app.get('/rooms', async () => {
        const results = await db.select({
            id: schema.rooms.id,
            name: schema.rooms.name,
            description: schema.rooms.description,
            questionsCount: count(schema.questions.id),
            createdAt: schema.rooms.createdAt
        })
            .from(schema.rooms)
            .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
            .groupBy(
                schema.rooms.id,
                schema.rooms.name,
                schema.rooms.description,
                schema.rooms.createdAt
            )
            .orderBy(schema.rooms.createdAt)
        return results
    })
}