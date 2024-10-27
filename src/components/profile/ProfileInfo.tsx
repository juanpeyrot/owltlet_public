'use client';

import { RootState } from "@/store/store";
import { CircleUserRound } from "lucide-react"
import { useSelector } from "react-redux";


export const ProfileInfo = () => {
  
  const { email } = useSelector((state: RootState) => state.user);

  const name = email.split('@')[0];

  return (
    <article className="w-full flex flex-col items-center gap-10">
      <div className="w-40 h-40 rounded-full text-center">
          {
            <CircleUserRound
            className="text-[#94a3b8] darsk:text-[#eeeeee] h-full w-full"
            />
          }
      </div>
      <span className="font-bold text-4xl text-pretty"
      >{name}
      </span>
    </article>
  )
}
