"use client";
import { signInValidation } from "@/app/schemas/signInSchema";

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

import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInValidation>) => {
    

   try {
     setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    

    if (!result || result?.error) {
     return toast.error("username or password incorrect");
      
    } 
      router.replace("/dashboard");
     
    
   } catch (error) {
    toast.error("Some unexpected error occurred! please try again later")
    console.log(error)
   }
   finally{
    setLoading(false)
   }
  };
  return (
    <>
      <div className="bg-zinc-100 w-full h-screen flex justify-center items-center flex-col gap-10 ">
        <h1 className="text-zinc-900 text-4xl tracking-tighter font-bold">
          Sign In
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
                  Signing In
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-zinc-700">
          <span className="opacity-40">do not have an account?</span>{" "}
          <Link className="font-bold opacity-100" href="/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignIn;
