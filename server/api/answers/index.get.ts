import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const questionId = Number(query.questionId);

  const answers = await prisma.answer.findMany({
    where: {
      questionId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          reputation: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return {
    success: true,
    answers
  };
});