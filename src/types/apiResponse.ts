import { Message } from "@/app/models/message.model";

export interface apiResponse{
    success:boolean,
    message:string,
    isAcceptingMessages?:string,
    messages?:Array<Message>
}