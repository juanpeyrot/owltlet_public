'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppDispatch } from "@/store/store";
import { logoutAndClearCart } from "@/store/thunks/logoutAndClearCart";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const NavbarUserProfile = ({ darkMode } : { darkMode: boolean }) => {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUserRound
          color={`${darkMode ? "#eeeeee" : "#94a3b8"}`}
          className="cursor-pointer"
          />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(logoutAndClearCart())}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
