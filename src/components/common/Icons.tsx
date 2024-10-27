import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Icons = {
  logo: ({className} :LogoProps) => <Image width={100} height={100} src="/owlogo.webp" alt="logo" className={className}/>,
}