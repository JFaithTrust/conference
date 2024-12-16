import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {AiFillDashboard} from "react-icons/ai";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {removeCookie} from "@/lib/actions/auth.action";
import {UserType} from "@/types";


const UserCard = async ({ user }: {user: UserType}) => {

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className="flex flex-row items-center justify-center gap-3 rounded-md border-2 border-solid border-mainindigo px-[10px] py-[5px] text-mainindigo">
                        <div className="flex w-24 flex-col text-xs font-medium">
                            <span>{user?.fullName}</span>
                        </div>
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className={`flex flex-col gap-y-2`}
                >
                    {/* <Sheet> */}
                    {/*    <SheetTrigger asChild> */}
                    {/*        <Button className="p-2.5 rounded text-sm flex flex-row justify-between bg-mainindigo text-mainwhite hover:bg-mainindigo/85 transition-fields duration-200 ease-in-out w-full"> */}
                    {/*            Profile */}
                    {/*            <FaUser className="w-5 h-4" /> */}
                    {/*        </Button> */}
                    {/*    </SheetTrigger> */}
                    {/*    <SheetContent> */}
                    {/*        <SheetHeader> */}
                    {/*            <SheetTitle>Profilni tahrirlash</SheetTitle> */}
                    {/*            <SheetDescription> */}
                    {/*                Bu yerda profilingizga oʻzgartirishlar kiriting. */}
                    {/*                Ishingiz tugagach, saqlash tugmasini bosing. */}
                    {/*            </SheetDescription> */}
                    {/*        </SheetHeader> */}
                    {/*        <div className="grid gap-4 py-4"> */}
                    {/*            <div className="flex flex-row justify-between items-center gap-x-2"> */}
                    {/*                <Label htmlFor="name" className="text-right"> */}
                    {/*                    F.I.SH */}
                    {/*                </Label> */}
                    {/*                <Input */}
                    {/*                    placeholder="Yo'nalish nomi" */}
                    {/*                    defaultValue={user?.fullName} */}
                    {/*                    onChange={(event) => */}
                    {/*                        setEditedName(event.target.value) */}
                    {/*                    } */}
                    {/*                    className="w-full" */}
                    {/*                /> */}
                    {/*            </div> */}
                    {/*        </div> */}
                    {/*        <SheetFooter> */}
                    {/*            <SheetClose asChild> */}
                    {/*                <div className="w-full flex justify-end"> */}
                    {/*                    <Button */}
                    {/*                        className="p-2.5 rounded text-sm flex flex-row justify-between bg-typegreen text-mainwhite hover:bg-typegreen/85 transition-fields duration-200 ease-in-out w-fit" */}
                    {/*                        type="submit" */}
                    {/*                        onClick={handleUpdateName} */}
                    {/*                    > */}
                    {/*                        Saqlash */}
                    {/*                    </Button> */}
                    {/*                </div> */}
                    {/*            </SheetClose> */}
                    {/*        </SheetFooter> */}
                    {/*    </SheetContent> */}
                    {/* </Sheet> */}
                    {(user.role.length > 0 && user.role === "SUPER_ADMIN") ||
                    (user.role.length > 0 && user.role === "REVIEWER") ||
                    (user.role.length > 0 && user.role === "EDITOR") ?
                        (
                        <Link href="/dashboard">
                            <Button
                                className="flex w-fit flex-row gap-x-2 rounded bg-mainindigo p-2.5 text-sm text-mainwhite transition-all duration-200 ease-in-out hover:bg-mainindigo/85"
                            >
                                Dashboard
                                <AiFillDashboard className="h-4 w-5"/>
                            </Button>
                        </Link>
                    ) : null}
                    <form
                        action={async () => {
                            'use server';
                            await removeCookie();
                        }}
                    >
                        <Button
                            type={"submit"}
                            className="flex w-fit flex-row justify-between rounded p-2.5 text-sm text-mainwhite transition-all duration-200 ease-in-out"
                        >
                            Chiqish
                            <ArrowRight className="h-4 w-5"/>
                        </Button>
                    </form>
                </PopoverContent>
            </Popover>
        </>
)
}

export default UserCard