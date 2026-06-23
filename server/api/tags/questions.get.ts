import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const tagId = Number(query.tagId);

  const questions = await prisma.questionTag.findMany({
    where: {
      tagId
    },
    include: {
      question: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              reputation: true
            }
          }
        }
      }
    }
  });

  return {
    success: true,
    questions
  };
});