import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const tag = await prisma.tag.create({
    data: {
      name: body.name,
      description: body.description
    }
  });

  return {
    success: true,
    tag
  };
});