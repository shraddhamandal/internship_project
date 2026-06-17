import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: body.email },
                { username: body.username }
            ]
        }
    });

    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
        data: {
            name: body.name,
            username: body.username,
            email: body.email,
            password: hashedPassword
        }
    });

    return {
        message: "User registered successfully",
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            reputation: user.reputation
        }
    };

});