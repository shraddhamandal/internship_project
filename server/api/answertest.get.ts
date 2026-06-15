import prisma from "../utils/prisma";

export default defineEventHandler(async () => {
  const answer = await prisma.answer.create({
    data: {
      content: "Nuxt is a full-stack framework built on Vue.js",
      userId: 1,
      questionId: 1
    }
  });

  return answer;
});