import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const id = Number(query.id);

  const question = await prisma.question.findUnique({
    where: {
      id
    },
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
      answers: {
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
    question
  };
});