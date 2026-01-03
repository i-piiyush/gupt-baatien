"use client";

import { MessageDocument } from "@/app/models/message.model";
import { acceptMessageValidation } from "@/app/schemas/acceptMessageSchema";
import MessageCard from "@/components/MessageCard";
import Navbar from "@/components/Navbar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { apiResponse } from "@/types/apiResponse";
import { MessageDTO } from "@/types/message.dto";
import { zodResolver } from "@hookform/resolvers/zod";

import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const Dashboard = () => {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const session = useSession();

  const { register, watch, setValue } = useForm<
    z.infer<typeof acceptMessageValidation>
  >({
    resolver: zodResolver(acceptMessageValidation),
  });
  const isAcceptingMessage = watch("isAcceptingMessages");

  const fetchIsAcceptingMessages = useCallback(async () => {
    try {
      const res = await axios.get("/api/accept-message");
      console.log(res.data);
      setValue("isAcceptingMessages", res.data.isAcceptingMessages);
    } catch (error) {
      const err = error as AxiosError<apiResponse>;
      console.log(err.response?.data.message);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get("/api/get-message");
      console.log(res.data);
      setMessages(res.data.messages ?? [] )
    } catch (error) {
      const err = error as AxiosError<apiResponse>;
      console.log(err.response?.data.message);
    }
  }, []);
  const onMessageDelete = (messageId: string) => {
    return setMessages((prev) =>
      prev.filter((message) => message._id.toString() !== messageId)
    );
  };
  useEffect(() => {
    try {
      if(session.status === "authenticated"){

         fetchMessages();
      fetchIsAcceptingMessages();
      }
     
    } catch (error) {
      console.log(
        "error while fetching messages or accepting messages status ",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [session.status, fetchMessages, fetchIsAcceptingMessages]);

  return (
    <div>
      <Navbar />
      <div className="w-full px-10 py-5 ">
        <div className="flex items-center space-x-2">
          <Switch
            checked={isAcceptingMessage}
            onCheckedChange={(value) =>
              setValue("isAcceptingMessages", value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
          <Label htmlFor="isAcceptingMessages">Accept Messages</Label>
        </div>
        <h1 className="text-4xl tracking-tighter font-bold mb-7">
          Your Messages
        </h1>
        {messages.length <= 0 ? (
          <h1 className="tracking-tighter">No messages found!</h1>
        ) : (
          <div className="grid gap-4">
            {messages.map((message) => (
              <MessageCard
                key={message._id.toString()}
                message={message}
                onMessageDelete={onMessageDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
