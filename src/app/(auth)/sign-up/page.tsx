"use client";
import { signUpValidation } from "@/app/schemas/signUpSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpValidation>) => {
    console.log("data while submitting form", data);

    try {
      setLoading(true);
      const res = await axios.post<apiResponse>("/api/sign-up", data);
      toast.success(res.data.message);
      router.replace("/dashboard");
    } catch (error) {
      const err = error as AxiosError<apiResponse>;
      toast.error(err.response?.data.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="bg-zinc-100 w-full h-screen flex justify-center items-center flex-col gap-10 ">
        <h1 className="text-zinc-900 text-4xl tracking-tighter font-bold">
          Sign Up
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Johndoe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="px-12" disabled={loading} type="submit">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-zinc-700">
          <span className="opacity-40">already have an account?</span>{" "}
          <Link className="font-bold opacity-100" href="/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
