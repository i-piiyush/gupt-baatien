import { userModel } from "@/app/models/user.model";
import { connectToDb } from "@/db/db";

import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  await connectToDb();
  try {
    const { username, password, email } = await request.json();

    const existingUserWithSameUsername = await userModel.findOne({
      username
     
    });

    if (existingUserWithSameUsername) {
      return Response.json(
        {
          success: false,
          message: "user with same usernanme already exists",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserWithSameEmail = await userModel.findOne({
      email,
 
    });

    if (existingUserWithSameEmail) {
      return Response.json(
        {
          success: false,
          message: "user with same email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      password: hashedPassword,
      email,

      messages: [],
    });

    newUser.save();

    return Response.json(
      {
        success: true,
        message: "user signed up successfully",
        user: newUser,
      },

      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error signing up: ", error);
    return Response.json(
      {
        success: false,
        message: "error signing up:",
      },
      {
        status: 500,
      }
    );
  }
};
