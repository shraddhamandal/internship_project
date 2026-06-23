import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const answer = await prisma.answer.create({
    data: {
      content: body.content,
      userId: body.userId,
      questionId: body.questionId
    }
  });

  return {
    success: true,
    answer
  };
});