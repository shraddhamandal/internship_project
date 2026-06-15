import prisma from "../../utils/prisma";

export default defineEventHandler(async () => {
  const questions = await prisma.question.findMany({
    include: {
      user: true
    }
  });

  return questions;
});