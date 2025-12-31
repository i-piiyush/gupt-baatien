import { connectToDb } from "@/db/db";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { userModel } from "@/app/models/user.model";
import mongoose from "mongoose";

export const GET = async (req: Request) => {
  await connectToDb();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const foundUser = await userModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    if (!foundUser || foundUser.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found or no messages",
        },
        { status: 404 }
      );
    }

    
    return Response.json(
      {
        success: true,
        messages: foundUser[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching messages ", error);
    return Response.json(
      {
        success: false,
        message: "server error",
      },
      { status: 500 }
    );
  }
};
