import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"
import { z } from "zod/v4"
import { generateAnswer, generateEmbeddings } from "../../services/gemini.ts"
import { and, eq, sql } from "drizzle-orm"

export const CreateQuestionRoute: FastifyPluginCallbackZod = async (app) => {
    app.post('/questions/:roomId', {
        schema: {
            params: z.object({
                roomId: z.string(),
            }),
            body: z.object({
                question: z.string().min(1),
            })
        }
    }, async (request, response) => {
        const { roomId } = request.params
        const { question } = request.body

        const embeddings = await generateEmbeddings(question);

        const questionEmbeddings = `[${embeddings.join(',')}]`

        const chunks = await db.select({
            id: schema.audioChunks.id,
            transcript: schema.audioChunks.transcript,
            similarity: sql`1 - (${schema.audioChunks.embeddings} <=> ${questionEmbeddings})`
        })
            .from(schema.audioChunks)
            .where(and(
                eq(schema.audioChunks.roomId, roomId),
                sql`1 - (${schema.audioChunks.embeddings} <=> ${questionEmbeddings}) > 0.7`
            ))
            .orderBy(sql`${schema.audioChunks.embeddings} <=> ${questionEmbeddings}`)
            .limit(6)


        let answer: string | null = null;

        if (chunks.length > 0) {
            const transcriptions = chunks.map(chunk => chunk.transcript)
            answer = await generateAnswer(question, transcriptions)
        }

        const newQuestion = await db.insert(schema.questions).values({
            question: question,
            roomId: roomId,
            answer
        }).returning();;

        if (!newQuestion[0]) {
            throw new Error('Falha ao criar nova pergunta')
        }

        return response.status(201).send({ message: "Question created" });
    })
}