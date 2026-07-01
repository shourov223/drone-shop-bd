import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { otpSchema } from "@/lib/zodschema";
import OTPModel from "../../../../../models/Otp.model";
import userModel from "../../../../../models/User.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    
    const validationSchema = otpSchema.pick({
      otp: true,
      email: true,
    });

    const validatedData = validationSchema.safeParse(payload);
    
    // 🛠️ ফিক্স ১: !validatedData এর জায়গায় !validatedData.success ব্যবহার করা হলো
    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field",
        validatedData.error.format(), // .format() দিলে এরর রিডাবল হবে
      );
    }

    // এখন validatedData.success নিশ্চিত হওয়ায় এই লাইন সেফলি কাজ করবে
    const { email, otp } = validatedData.data;

    const getOtpData = await OTPModel.findOne({ email, otp });
    
    // 🛠️ ফিক্স ২: ওটিপি না মিললে এখানে অবশ্যই 'return' করতে হবে
    if (!getOtpData) {
      return response(false, 404, "Invalid or expired otp.");
    }

    const getUser = await userModel.findOne({ deletedAt: null, email }).lean();

    if (!getUser) {
      return response(false, 404, "User not found");
    }

    const loggedInUserData = {
      _id: getUser._id, // জেনারেলি মঙ্গোডিবিতে আইডি ছোট হাতের _id বা Id হয়, আপনার মডেল অনুযায়ী চেক করে নিয়েন
      role: getUser.role,
      name: getUser.name,
      avatar: getUser.avatar,
    };

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: token,
      httpOnly: process.env.NODE_ENV === "production",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    await getOtpData.deleteOne();

    return response(true, 200, "Login successful.", loggedInUserData);
  } catch (error) {
    return catchError(error);
  }
}