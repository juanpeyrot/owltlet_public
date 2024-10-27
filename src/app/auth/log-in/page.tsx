'use client';

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { logInUser } from "@/services/userService";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { FormError } from "@/components/FormError";
import { StoredUser } from "@/types/user";
import { useService } from "@/hooks/useService";

const Page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TAuthCredentialsValidator>({ resolver: zodResolver(AuthCredentialsValidator) });
  
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, execute, result } = useService<StoredUser>(() => logInUser(email, password));

  useEffect(() => {
    if (!result) return reset();
    dispatch(setUser(result));
    router.push('/');
  }, [result, dispatch, router]);

  useEffect(() => {
    if (!email || !password) return;
    execute();
  }, [email, password]);

  const onSubmit = ({ email: formEmail, password: formPassword }: TAuthCredentialsValidator) => {
    setEmail(formEmail);
    setPassword(formPassword);
  };

  return (
    <section className="flex flex-col items-center justify-center pt-20 gap-10">
      <div>
        <Icons.logo className="w-28 h-28"/>
      </div>
      <span className="text-3xl font-bold">Log in</span>
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
        <Button className="w-full dark:bg-dark-title" type="submit">Log in</Button>
        <Link 
        href='/auth/sign-up'
        className='text-blue-500 font-semibold pointer'
        >Don't have an account? Sign up
        </Link>
      </form>
      <ClipLoader loading={loading} />
      {
        error && <FormError message={error} />
      }
    </section>
  )
}

export default Page;
