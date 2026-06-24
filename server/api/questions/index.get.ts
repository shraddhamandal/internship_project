import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const questions = await prisma.question.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          reputation: true
        }
      },

      questionTags: {
        include: {
          tag: true
        }
      },

      answers: true
    },

    orderBy: {
      createdAt: "desc"
    }
  });

  return {
    success: true,
    questions
  };
});