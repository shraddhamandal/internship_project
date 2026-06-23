import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const notification = await prisma.notification.create({
    data: {
      type: body.type,
      message: body.message,
      userId: body.userId,
      questionId: body.questionId
    }
  });

  return {
    success: true,
    notification
  };
});