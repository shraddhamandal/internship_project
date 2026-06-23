import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const notification = await prisma.notification.update({
    where: {
      id: body.notificationId
    },
    data: {
      isRead: true
    }
  });

  return {
    success: true,
    notification
  };
});