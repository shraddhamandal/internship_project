import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const questionTag = await prisma.questionTag.create({
    data: {
      questionId: body.questionId,
      tagId: body.tagId
    }
  });

  return {
    success: true,
    questionTag
  };
});