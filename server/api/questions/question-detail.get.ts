import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const question = await prisma.question.findUnique({
    where: {
      id: Number(query.id)
    },

    include: {
      user: true,

      questionTags: {
        include: {
          tag: true
        }
      },

      answers: {
        include: {
          user: true
        },

        orderBy: {
          isAccepted: "desc"
        }
      }
    }
  });

  return {
    success: true,
    question
  };
});