'use client';

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { createUser } from "@/services/userService";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { FormError } from "@/components/FormError";
import { useService } from "@/hooks/useService";

const Page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TAuthCredentialsValidator>({ resolver: zodResolver(AuthCredentialsValidator) });
  const { error, loading, successMessage, execute } = useService(() => createUser(email, password))

  useEffect(() => {
    if (!email || !password) return;
    execute();
  }, [email, password])

  useEffect(() => {
    if (!successMessage) return;
    toast('Verification email sent! 🦉')
    reset();
  }, [successMessage]);

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    setEmail(email);
    setPassword(password);
  }

  return (
    <section className="flex flex-col items-center justify-center pt-20 gap-10">
      <div>
        <Icons.logo className="w-28 h-28"/>
      </div>
      <span className="text-3xl font-bold">Create an account</span>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-10 w-[80%] md:w-[40%]">
        <div className="flex flex-col items-start gap-3 w-full">
          <Label htmlFor="email">
            Email
          </Label>
          <Input
          {...register('email')}
          id="email"
          placeholder="you@example.com"
          className={`${errors.email ? 'border-red-500' : ''}`}
          autoComplete="on"
          />
        </div>
        <div className="flex flex-col items-start gap-3 w-full">
          <Label htmlFor="password">
            Password
          </Label>
          <Input
          {...register('password')}
          type="password"
          id="password"
          placeholder="Password"
          className={`${errors.password ? 'border-red-500' : ''}`}
          autoComplete="on"
          />
        </div>
        <Button className="w-full dark:bg-dark-title" type="submit">Sign Up</Button>
        <Link 
        href='/auth/log-in'
        className='text-blue-500 font-semibold pointer'
        >Already have an account? Log in
        </Link>
      </form>
      <ClipLoader loading={loading} />
      {
        error && <FormError message={error} />
      }
      <Toaster />
    </section>
  )
}

export default Page;
