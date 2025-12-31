import { Message } from "@/app/models/message.model"
import { userModel } from "@/app/models/user.model"
import { connectToDb } from "@/db/db"



export async function POST(request: Request) {
    await connectToDb()

    const {username, content} = await request.json()

    try {
        const user = await userModel.findOne({username})
        if(!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status : 404}
            )
        }

        //is user accepting the messages
        if(!user.isAcceptingMessages) {
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting the messages"
                },
                { status : 403}
            )
        }

        const newMessage = {content, createdAt: new Date()}

        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json(
            {
                success: true,
                message: "message sent successfully"
            },
            { status : 201}
        )

    } catch (error) {
        console.error("Error sending messages:", error);
        return Response.json(
        {
            success: false,
            message: "Server error while sending messages",
        },
        { status: 500 }
        );
    }
}