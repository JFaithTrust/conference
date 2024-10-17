import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import React from "react";
import { LuPlus } from "react-icons/lu";

interface ModalProps {
  onClick?: () => void; // Added an onClick prop
}

const Modal = ({ onClick }: ModalProps) => {

  const users = [
    {id:0, name:'Asdsdfs', surname:'Rsdfsfsdfsd'},
    {id:1, name:'Asdsdfs', surname:'Rsdfsfsdfsd'},
    {id:2, name:'Asdsdfs', surname:'Rsdfsfsdfsd'},
    {id:3, name:'Asdsdfs', surname:'Rsdfsfsdfsd'},
    {id:4, name:'Asdsdfs', surname:'Rsdfsfsdfsd'},
    {id:5, name:'Asdsdfs', surname:'Rsdfsfsdfsd'},
  ]

  const usersMap = users.map(u=>(
    <div className="flex justify-between" key={u.id}>
    <h1>{u.surname} {u.name}</h1>
    <Checkbox id="terms" />
  </div>
  ))



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onClick} // Handle onClick
          className="py-3 px-4 flex gap-x-2 bg-card-orange text-white rounded-lg skew-x-[-20deg] bg-black border-none"
        >
          <LuPlus className={"size-4 skew-x-[20deg]"} />
          <span className={"skew-x-[20deg]"}>Yaratish</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black ">
        <DialogHeader>
          <DialogTitle>Yaratish</DialogTitle>
          <DialogDescription>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
              <Input
                type="search"
                placeholder="search"
                className="h-9 shadow-md"
              />
              <Button type="submit" className="bg-indigo-500 text-white h-9	">
                Search
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
         {usersMap}
        </div>
        <DialogFooter>
          <Button type="submit">Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
