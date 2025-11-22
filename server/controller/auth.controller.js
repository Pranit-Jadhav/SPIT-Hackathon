import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import { signupSchema } from "../schemas/auth.schema.js";



export const signup = async (req, res) => {
  try {
    // step 1: validate input
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.flatten(),
      });
    }

    const { loginId, email, password} = parsed.data;

    // step 2: check duplicates in DB
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ loginId }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Login ID or email already exists" });
    }

    // step 3: hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // step 4: create user
    await prisma.user.create({
      data: {
        loginId,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "Signup successful 🎉" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
