import { NextResponse } from "next/server";

export const response = (success, statesCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statesCode,
    message,
    data,
  });
};

export const catchError = (error, customeMessage) => {
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(".");
    error.message = `Duplicate field: ${keys}.These fields value must be unique.`;
  }

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message || "An error occurred",
      error,
    };
  } else {
    errorObj = {
      message: customeMessage || "Internal Server Error",
      error,
    };
  }

  const statusCode =
    error.code && typeof error.code === "number" ? error.code : 500;

  return NextResponse.json({
    success: false,
    statusCode: error.code,
    ...errorObj,
  });
};


export const generateOTP = ()=>{
  const otp = Math.floor(100000 + Math.random()*900000).toString()
  return otp
}