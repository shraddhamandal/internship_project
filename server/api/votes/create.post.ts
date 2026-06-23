import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const vote = await prisma.vote.create({
    data: {
      type: body.type,
      userId: body.userId,
      questionId: body.questionId
    }
  });

  if (body.type === "UPVOTE") {
    await prisma.question.update({
      where: {
        id: body.questionId
      },
      data: {
        upvotes: {
          increment: 1
        }
      }
    });
  }

  if (body.type === "DOWNVOTE") {
    await prisma.question.update({
      where: {
        id: body.questionId
      },
      data: {
        downvotes: {
          increment: 1
        }
      }
    });
  }

  return {
    success: true,
    vote
  };
});