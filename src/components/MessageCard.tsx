
import { apiResponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";
import React from "react";
import { toast } from "sonner";

// shadcn UI components for consistent design system
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// confirmation dialog for destructive action
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MessageDTO } from "@/types/message.dto";

type messageProps = {
  // full mongoose document (includes _id)
  message: MessageDTO;

  // callback to sync UI state after deletion
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: messageProps) => {
  // handles message deletion with API call + UI feedback
  const handleDelete = async () => {
    try {
      const res: apiResponse = await axios.delete(
        `/api/delete-message/${message._id}`
      );

      // update parent state after successful deletion
      onMessageDelete(message._id.toString());

      toast.success("Message deleted successfully!");
    } catch (error) {
      const err = error as AxiosError<apiResponse>;
      toast.error(err.response?.data.message || "Error deleting message");
    }
  };

  return (
    <Card className="w-full max-w-sm dark">
      {/* Card header: title + short context */}
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      {/* Card content: destructive action */}
      <CardContent className="pt-4">
        <AlertDialog>
          {/* Trigger button kept light to contrast dark dialog */}
          <AlertDialogTrigger asChild>
            <button className=" text-sm text-white bg-red-600 hover:bg-red-700  border rounded-md px-4 py-2">
              Delete Message
            </button>
          </AlertDialogTrigger>

          {/* Dark themed confirmation dialog */}
          <AlertDialogContent >
            <AlertDialogHeader>
              <AlertDialogTitle >
                Are you absolutely sure?
              </AlertDialogTitle>

              <AlertDialogDescription >
                This action cannot be undone. This will permanently delete
                your message from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Cancel vs destructive confirm actions */}
            <AlertDialogFooter>
              <AlertDialogCancel >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 "
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
