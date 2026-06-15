import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const question = await prisma.question.create({
    data: {
      title: body.title,
      description: body.description,
      userId: body.userId,
    },
  });

  return question;
});