import prisma from "../utils/prisma";

export default defineEventHandler(async () => {
  const question = await prisma.question.create({
    data: {
      title: "What is Nuxt?",
      description: "I want to learn Nuxt.js",
      userId: 1
    }
  });

  return question;
});