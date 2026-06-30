import { connectDB } from "@/lib/databaseConnection";
import { NextResponse } from "next/server";


export async function GET() {
   connectDB();
  return NextResponse.json({
    success: true,
    message: "Connection success",
  });
}
