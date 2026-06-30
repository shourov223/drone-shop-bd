import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { loginSchema } from "@/lib/zodschema";
import z, { success } from "zod";
import userModel from "../../../../../models/User.model";
import { SignJWT } from "jose";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "../../../../../email/emailVerificationLink";
import OTPModel from "../../../../../models/Otp.model";
import { otpEmail } from "../../../../../email/otpEmail";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    const validationSchema = loginSchema
      .pick({
        email: true,
      })
      .extend({
        password: z.string(),
      });

    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalide or missing input field",
        validatedData.error,
      );
    }

    const { email, password } = validatedData.data;

    const getUser = await userModel
      .findOne({ deletedAt: null, email })
      .select("+password");

    if (!getUser) {
      return response(false, 404, "Invalide login data");
    }

    if (!getUser.isEmailVerified) {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT({
        userId: getUser._id.toString(),
      })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      await sendMail(
        "Email Verification request from Shourov",
        email,
        emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verifyEmail/${token}`,
        ),
      );

      return response(
        false,
        401,
        "Your Email is not verified. Please verify your Email",
      );
    }

    const isPasswordVerified = await getUser.comparePassword(password);

    if (!isPasswordVerified) {
      return response(false, 400, "Invalid Login Info");
    }

    await OTPModel.deleteMany({ email });

    const otp = generateOTP();

    const newOtpData = new OTPModel({
      email,
      otp,
    });

    await newOtpData.save();

    const otpEmailStatus = await sendMail(
      "Your login verification code",
      email,
      otpEmail(otp),
    );

    if (!otpEmailStatus.success) {
      return response(false, 400, "Faild to send OTP");
    }

    return response(true, 200, "Please verify your device.");
  } catch (error) {
    return catchError(error);
  }
}
