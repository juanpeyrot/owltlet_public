import { RiZzzFill } from "react-icons/ri";

export const CartNoContent = () => {
  return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        <RiZzzFill className="w-32 h-32 text-slate-300 transform rotate-6"/>
        <span className="text-slate-500 text-pretty font-extrabold text-2xl">Looks like nothing is in the nest...</span>
        <span className="text-slate-400 text-pretty font-bold text-xl">Add your products and come back!</span>
      </div>  
  )
}
