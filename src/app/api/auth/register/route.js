import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail"; // ✅ টাইপো ফিক্স করে 'sendMail' করা হয়েছে
import { baseRegisterSchema } from "@/lib/zodschema"; // ✅ জড এরর এড়াতে baseRegisterSchema ইম্পোর্ট করা হয়েছে
import userModel from "../../../../../models/User.model";
import { SignJWT } from "jose";
import { emailVerificationLink } from "../../../../../email/emailVerificationLink";

export async function POST(request) {
  try {
    await connectDB();

    const validationSchema = baseRegisterSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();

    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return responce(
        false,
        401,
        "Invalid or Missing Input fields",
        validatedData.error,
      );
    }

    const { name, email, password } = validatedData.data;

    const CheckUser = await userModel.exists({ email });
    if (CheckUser) {
      return responce(false, 409, "User Already Registered");
    }

    const newRegistration = new userModel({
      name,
      email,
      password,
    });
    await newRegistration.save();

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: newRegistration._id })
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
      true,
      200,
      "Registration Success. Please verify your email address",
    );
  } catch (error) {
    return catchError(error);
  }
}
