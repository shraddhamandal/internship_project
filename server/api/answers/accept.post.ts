import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await prisma.answer.update({
    where: {
      id: body.answerId
    },
    data: {
      isAccepted: true
    }
  });

  return {
    success: true
  };
});