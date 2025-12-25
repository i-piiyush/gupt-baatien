import * as React from "react";

interface EmailTemplateProps {
  username: string;
  verifyCode: string;
}

export function emailTemplate({ username, verifyCode }: EmailTemplateProps) {
  return (
    <div className="w-full bg-gray-100 py-10">
      <div className="mx-auto max-w-md rounded-xl bg-white px-6 py-8 shadow-sm">
        {/* Header */}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 font-[Inter]">
          Verify your email
        </h1>

        {/* Greeting */}
        <p className="mt-4 text-sm text-gray-600 font-[Inter]">
          Hi <span className="font-medium text-gray-900">{username}</span>,
        </p>

        {/* Message */}
        <p className="mt-3 text-sm leading-relaxed text-gray-600 font-[Inter]">
          Use the verification code below to complete your sign-in. This code is
          valid for a limited time.
        </p>

        {/* OTP Box */}
        <div className="mt-6 flex justify-center">
          <div className="rounded-lg bg-gray-900 px-6 py-3">
            <span className="text-2xl font-semibold tracking-[0.3em] text-white font-[Inter]">
              {verifyCode}
            </span>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-xs text-gray-500 font-[Inter]">
          If you didn’t request this, you can safely ignore this email.
        </p>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gray-200" />

        {/* Footer */}
        <p className="text-xs text-gray-400 font-[Inter]">
          © {new Date().getFullYear()} Gupt Baatien. All rights reserved.
        </p>
      </div>
    </div>
  );
}
