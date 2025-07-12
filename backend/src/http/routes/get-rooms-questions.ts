import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { eq } from "drizzle-orm"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"
import { z } from "zod/v4"

export const GetRoomsQuestionsRoute: FastifyPluginCallbackZod = async (app) => {
    app.get('/questions/:roomId',
        {
            schema: {
                params: z.object({
                    roomId: z.string(),
                })
            }
        }
        , async (request) => {
            const { roomId } = request.params;
            const results = await db.select().from(schema.questions).where(
                eq(schema.questions.roomId, roomId)
            ).orderBy(schema.questions.createdAt)
            return results
        })
}