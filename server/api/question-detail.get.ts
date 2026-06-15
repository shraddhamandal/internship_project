import prisma from "../utils/prisma";

export default defineEventHandler(async () => {
  const question = await prisma.question.findUnique({
    where: {
      id: 1
    },
    include: {
      user: true,
      answers: {
        include: {
          user: true
        }
      }
    }
  });

  return question;
});