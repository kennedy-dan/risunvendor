import { NextComponentType } from "next";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/public/images/MyArtStock_Logo.png";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={LogoDark} alt="logo" className="w-[240px]" />
    </Link>
  );
};

export default Logo;
