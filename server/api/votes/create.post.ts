import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Check if the user has already voted
  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_questionId: {
        userId: body.userId,
        questionId: body.questionId,
      },
    },
  });

  // If same vote already exists, do nothing
  if (existingVote && existingVote.type === body.type) {
    return {
      success: true,
      message: "Already voted",
    };
  }

  // If changing vote (UPVOTE -> DOWNVOTE or vice versa)
  if (existingVote) {
    await prisma.vote.update({
      where: {
        id: existingVote.id,
      },
      data: {
        type: body.type,
      },
    });

    if (body.type === "UPVOTE") {
      await prisma.question.update({
        where: { id: body.questionId },
        data: {
          upvotes: { increment: 1 },
          downvotes: { decrement: 1 },
        },
      });
    } else {
      await prisma.question.update({
        where: { id: body.questionId },
        data: {
          downvotes: { increment: 1 },
          upvotes: { decrement: 1 },
        },
      });
    }

    return { success: true };
  }

  // First vote
  await prisma.vote.create({
    data: {
      type: body.type,
      userId: body.userId,
      questionId: body.questionId,
    },
  });

  if (body.type === "UPVOTE") {
    await prisma.question.update({
      where: { id: body.questionId },
      data: {
        upvotes: { increment: 1 },
      },
    });
  } else {
    await prisma.question.update({
      where: { id: body.questionId },
      data: {
        downvotes: { increment: 1 },
      },
    });
  }

  return {
    success: true,
  };
});