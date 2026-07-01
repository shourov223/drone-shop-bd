import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { otpSchema } from "@/lib/zodschema";
import userModel from "../../../../../models/User.model";
import OTPModel from "../../../../../models/Otp.model";
import { sendMail } from "@/lib/sendMail";
import { otpEmail } from "../../../../../email/otpEmail";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();
    const validationSchema = otpSchema.pick({ email: true });
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input fields",
        validatedData.error,
      );
    }

    // 🛠️ মহাগুরুত্বপূর্ণ ফিক্স: ভ্যালিডেটেড ডাটা থেকে email বের করা হলো
    const { email } = validatedData.data;

    const getUser = await userModel.findOne({ email });
    if (!getUser) {
      return response(false, 404, "User not found");
    }

    await OTPModel.deleteMany({ email });
    const otp = generateOTP();
    const newOtpData = new OTPModel({
      email,
      otp,
    });
    await newOtpData.save();
    
    // বানান ঠিক করা হয়েছে (verification)
    const otpSendStatus = await sendMail(
      "Your login verification code.",
      email,
      otpEmail(otp)
    );

    if (!otpSendStatus.success) {
      return response(false, 400, "Failed to resend OTP"); // বানান ঠিক করা হয়েছে
    }

    return response(true, 200, "OTP Send successful"); // বানান ঠিক করা হয়েছে

  } catch (error) {
    return catchError(error);
  }
}