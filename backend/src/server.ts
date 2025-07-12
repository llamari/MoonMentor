import fastify from "fastify";
import { fastifyMultipart } from "@fastify/multipart"
import { } from './db/connection.ts';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import { env } from "./env.ts";
import { GetRoomsRoute } from "./http/routes/get-rooms.ts";
import { CreateRoomRoute } from "./http/routes/create-room.ts";
import { GetRoomsQuestionsRoute } from "./http/routes/get-rooms-questions.ts";
import { CreateQuestionRoute } from "./http/routes/create-question.ts";
import { UploadAudioRoute } from "./http/routes/upload-audio.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler)

app.get('/', () => {
    return ('Servidor rodando!')
})

app.register(fastifyMultipart);

app.register(GetRoomsRoute)

app.register(CreateRoomRoute)

app.register(GetRoomsQuestionsRoute)

app.register(CreateQuestionRoute)

app.register(UploadAudioRoute)

app.listen({ port: env.PORT }).then(() => {
    console.log("Servidor rodando!");
})