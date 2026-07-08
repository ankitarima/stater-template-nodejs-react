import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Spinner from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/lib/axios";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine((value) => value.includes("@"), "Invalid email address"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ForgetPassword() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });
  const [error_message, set_error_message] = useState("");
  const [submitted, set_submitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: FormValues) =>
      fetchApi.post(`/auth/forgot-password`, data),
  });

  const onSubmit = (data: FormValues) => {
    set_error_message("");
    mutation.mutate(data, {
      // Always show the same confirmation to avoid account enumeration.
      onSuccess: () => set_submitted(true),
      onError: () => set_submitted(true),
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">
            Check your email
          </h1>
          <p className="text-sm text-muted-foreground">
            If an account exists for that address, we&apos;ve sent a password
            reset link.
          </p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link to="/auth/login">Back to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot your password?
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {error_message && (
            <Alert variant="destructive">
              <AlertDescription>{error_message}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            Send reset link <Spinner isLoading={mutation.isPending} />
          </Button>
          <Link
            to="/auth/login"
            className="group flex items-center justify-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft
              className="mr-1.5 transition-transform duration-300 group-hover:-translate-x-1"
              size={16}
            />
            Back to sign in
          </Link>
        </form>
      </Form>
    </div>
  );
}
