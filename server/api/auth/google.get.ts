import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    console.log("Google user:", user);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: user.name || "Unknown User",
          email: user.email,
          username: user.email.split("@")[0],
          password: "GOOGLE_AUTH_USER"
        }
      });

      console.log("New Google user created");
    }

   const dbUser = existingUser || await prisma.user.findUnique({
  where: {
    email: user.email
  }
})

await setUserSession(event, {
  user: {
    id: dbUser!.id,
    name: dbUser!.name,
    email: dbUser!.email
  }
})

return sendRedirect(event, "/")
  },

  async onError(event, error) {
    console.error("Google OAuth Error:", error);

    return sendRedirect(event, "/login");
  }
});