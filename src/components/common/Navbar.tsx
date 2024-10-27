'use client';

import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { NavbarUserProfile } from "./NavbarUserProfile";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Cart from "./cart/Cart";
import { getCart } from "@/services/cartService";
import { updateCart } from "@/store/slices/cartSlice";
import { useService } from "@/hooks/useService";
import { CartState } from "@/types/cart";


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { isLogged, email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { execute, result } = useService<CartState>(() => getCart(email));

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  useEffect(() => {
  if (!email || !isLogged) return;
    execute();
  }, [email]);

  useEffect(() => {
    if (!result) return;
    dispatch(updateCart(result));
  }, [result]);

  return (
    <div className={`bg-white sticky z-50 top-0 inset-x-0 h-16 border-b-2 border-gray-200 shadow-md`}>
      <header className="relative bg-white dark:bg-navbar-bg">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between h-16">
            <div onClick={() => router.push('/')} className="cursor-pointer">
              <Icons.logo className="w-14 h-14" />
            </div>

            <div className="flex items-center gap-4">
              {isLogged ? (
                <NavbarUserProfile darkMode={darkMode}/>
              ) : (
                <Link href="/auth/log-in" className="text-sm font-medium text-gray-600 dark:text-dark-text">
                  Log in
                </Link>
              )}
              <DarkModeSwitch
              checked={darkMode}
              onChange={toggleDarkMode}
              size={20}
              color={`${darkMode ? '#eeeeee' : '#94a3b8'}`}
              />
              <Cart />
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}

export default Navbar;
