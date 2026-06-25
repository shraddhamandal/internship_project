import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password"
    });
  }

  if (!user.password) {
  throw createError({
    statusCode: 401,
    statusMessage: "This account uses Google Sign-In"
  });
}

const validPassword = await bcrypt.compare(
  body.password,
  user.password
);
  if (!validPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password"
    });
  }

  return {
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      reputation: user.reputation
    }
  };
});