import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {AiFillDashboard} from "react-icons/ai";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {UserType} from "@/types";
import {removeCookie} from "@/lib/actions/auth.action";
import Link from "next/link";

const UserCard = async ({ user }: {user: UserType}) => {

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className="flex flex-row items-center justify-center gap-3 text-mainindigo py-[5px] px-[10px] rounded-md border-[2px] border-solid border-mainindigo">
                        <div className="flex flex-col text-xs font-medium w-24">
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
                    {/*<Sheet>*/}
                    {/*    <SheetTrigger asChild>*/}
                    {/*        <Button className="p-2.5 rounded text-sm flex flex-row justify-between bg-mainindigo text-mainwhite hover:bg-mainindigo/85 transition-all duration-200 ease-in-out w-full">*/}
                    {/*            Profile*/}
                    {/*            <FaUser className="w-5 h-4" />*/}
                    {/*        </Button>*/}
                    {/*    </SheetTrigger>*/}
                    {/*    <SheetContent>*/}
                    {/*        <SheetHeader>*/}
                    {/*            <SheetTitle>Profilni tahrirlash</SheetTitle>*/}
                    {/*            <SheetDescription>*/}
                    {/*                Bu yerda profilingizga oʻzgartirishlar kiriting.*/}
                    {/*                Ishingiz tugagach, saqlash tugmasini bosing.*/}
                    {/*            </SheetDescription>*/}
                    {/*        </SheetHeader>*/}
                    {/*        <div className="grid gap-4 py-4">*/}
                    {/*            <div className="flex flex-row justify-between items-center gap-x-2">*/}
                    {/*                <Label htmlFor="name" className="text-right">*/}
                    {/*                    F.I.SH*/}
                    {/*                </Label>*/}
                    {/*                <Input*/}
                    {/*                    placeholder="Yo'nalish nomi"*/}
                    {/*                    defaultValue={user?.fullName}*/}
                    {/*                    onChange={(event) =>*/}
                    {/*                        setEditedName(event.target.value)*/}
                    {/*                    }*/}
                    {/*                    className="w-full"*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <SheetFooter>*/}
                    {/*            <SheetClose asChild>*/}
                    {/*                <div className="w-full flex justify-end">*/}
                    {/*                    <Button*/}
                    {/*                        className="p-2.5 rounded text-sm flex flex-row justify-between bg-typegreen text-mainwhite hover:bg-typegreen/85 transition-all duration-200 ease-in-out w-fit"*/}
                    {/*                        type="submit"*/}
                    {/*                        onClick={handleUpdateName}*/}
                    {/*                    >*/}
                    {/*                        Saqlash*/}
                    {/*                    </Button>*/}
                    {/*                </div>*/}
                    {/*            </SheetClose>*/}
                    {/*        </SheetFooter>*/}
                    {/*    </SheetContent>*/}
                    {/*</Sheet>*/}
                    {(user.role.length > 0 && user.role === "SUPER_ADMIN") ||
                    (user.role.length > 0 && user.role === "REVIEWER") ? (
                        <Link href="/dashboard">
                            <Button
                                className="p-2.5 rounded text-sm flex flex-row gap-x-2 bg-mainindigo text-mainwhite hover:bg-mainindigo/85 transition-all duration-200 ease-in-out w-fit"
                            >
                                Dashboard
                                <AiFillDashboard className="w-5 h-4"/>
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
                            className="p-2.5 rounded text-sm flex flex-row justify-between bg-typered text-mainwhite hover:bg-typered/85 transition-all duration-200 ease-in-out w-fit"
                        >
                            Chiqish
                            <ArrowRight className="w-5 h-4"/>
                        </Button>
                    </form>
                </PopoverContent>
            </Popover>
        </>
)
}

export default UserCard