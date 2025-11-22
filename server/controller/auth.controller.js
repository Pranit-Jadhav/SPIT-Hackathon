import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  signupSchema,
  signinSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
} from "../schemas/auth.schema.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export const signup = async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { loginId, email, password, name } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ loginId }, { email }] },
    });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Login ID or email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { loginId, email, name, passwordHash },
    });

    return res
      .status(201)
      .json({
        message: "Signup successful",
        user: { id: user.id, loginId: user.loginId, email: user.email },
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  try {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.flatten() });

    const { loginId, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { loginId } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, loginId: user.loginId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: { id: user.id, loginId: user.loginId, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Request password reset (generate OTP)
export const requestPasswordReset = async (req, res) => {
  try {
    const parsed = passwordResetRequestSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.flatten() });

    const { email } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(200)
        .json({
          message: "If an account with that email exists, an OTP has been sent",
        });

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

    await prisma.passwordResetOtp.create({
      data: { userId: user.id, otp, expiresAt },
    });

    // TODO: send OTP via email. For now return OTP for dev/testing (remove in production)
    return res.json({ message: "OTP generated", otp });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Confirm OTP and reset password
export const confirmPasswordReset = async (req, res) => {
  try {
    const parsed = passwordResetConfirmSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.flatten() });

    const { email, otp, newPassword } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid request" });

    const otpRow = await prisma.passwordResetOtp.findFirst({
      where: { userId: user.id, otp, used: false },
      orderBy: { createdAt: "desc" },
    });
    if (!otpRow)
      return res.status(400).json({ message: "Invalid or expired OTP" });
    if (otpRow.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });
    await prisma.passwordResetOtp.update({
      where: { id: otpRow.id },
      data: { used: true },
    });

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
