import { emailTemplate } from "@/template/EmailTemplate";
import { apiResponse } from "@/types/apiResponse";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  username: string,
  verifyCode: string,
  email: string
): Promise<apiResponse> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Gupt Baatien | Verification Code",
      react: emailTemplate({ username, verifyCode }),
    });

    return {
      success: true,
      message: "email sent successfully",
    };
  } catch (error) {
    console.log("error sending email: ", error);
    return {
      success: false,
      message: "error sending email",
    };
  }
};
