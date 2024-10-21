import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import React from "react";

interface AddButtonProps {
  link?: string;
  onClick?: () => void; // Added an onClick prop
}

export function AddButton({ link, onClick }: AddButtonProps) {
  return link ? (
    <Link href={link}>
      <Button className="py-3 px-4 flex gap-x-2 bg-indigo-500 text-white rounded-lg">
        <LuPlus />
        <span>Yaratish</span>
      </Button>
    </Link>
  ) : (
    <Button
      onClick={onClick} // Handle onClick
      className="py-3 px-4 flex gap-x-2 bg-indigo-500 text-white rounded-lg"
    >
      <LuPlus />
      <span>Yaratish</span>
    </Button>
  );
}
