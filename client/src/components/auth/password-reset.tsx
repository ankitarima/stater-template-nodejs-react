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
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/lib/axios";

const FormSchema = z
  .object({
    hash: z.string().min(1, "Reset token is missing"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormValues = z.infer<typeof FormSchema>;

export default function PasswordReset() {
  const params = useParams<Record<string, string | undefined>>();
  const navigate = useNavigate();
  const [error_message, set_error_message] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hash: params.hash || "",
      new_password: "",
      confirm_password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: ({ confirm_password: _confirm, ...data }: FormValues) =>
      fetchApi.post(`/auth/password-reset`, data),
  });

  const onSubmit = (data: FormValues) => {
    set_error_message("");
    mutation.mutate(data, {
      onSuccess: ({ data }) => {
        if (data.success) {
          navigate("/auth/login");
        } else {
          set_error_message(data.message);
        }
      },
      onError: (error) => set_error_message(error.message),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter a new password for your account.
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
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            Reset password <Spinner isLoading={mutation.isPending} />
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
