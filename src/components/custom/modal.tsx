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
import { DialogClose } from "@radix-ui/react-dialog";

import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";

interface ModalProps {
    onClick?: () => void; // Added an onClick prop
}

const Modal = ({ onClick }: ModalProps) => {
    const [users, setUsers] = useState([
        { id: 1, name: "Peter", surname: "Robinson", checked: false },
        { id: 2, name: "Ann", surname: "Walker", checked: false },
        { id: 3, name: "4James", surname: "Allen", checked: false },
        { id: 4, name: "8James", surname: "Allen", checked: false },
        { id: 5, name: "1James", surname: "Allen", checked: false },
        { id: 6, name: "2James", surname: "Allen", checked: false },
        { id: 7, name: "3James", surname: "Allen", checked: false },
        { id: 8, name: "4James", surname: "Allen", checked: false },
        { id: 9, name: "6James", surname: "Allen", checked: false },
        { id: 10, name: "7James", surname: "Allen", checked: false },
    ]);
    // const [products, setProducts] = useState(users);
    const [searchText, setSearchText] = useState("");

    // const [products, setProducts] = useState(productList);
//   const [searchVal, setSearchVal] = useState("");

//   function handleSearchClick() {
//     if (searchVal === "") { setProducts(users); return; }
//     const filterBySearch = users.filter((item) => {
//         if (item.name.toLowerCase()
//             .includes(searchVal.toLowerCase())) { return item; }
//     })
//     setProducts(filterBySearch);
// }


    // useEffect(() => {
    //   // check if the users are not empty, if so then the
    //   // API call was successful and we can update our
    //   // filteredUsers state
    //   if (Object.keys(users).length > 0) {
    //     setFilteredUsers(users)
    //   }
    // }, [users])



    const toggleCheck = (id: number) => {
        const checkedIdx = users.findIndex((u) => u.id === id);
        if (checkedIdx === -1) return;
        const updatedUser = [...users];
        updatedUser[checkedIdx].checked = !updatedUser[checkedIdx].checked;
        setUsers(users.filter((f) => (f.id != id ? f : null)));
        console.log(users.filter((f) => (f.id != id ? f : null)));
    };

    const usersMap = users.map((elem) => {
        if (searchText === "") {
            console.log(elem.name)

            return (
                <div className="flex justify-between" key={elem.id}>
                    <h1>
                        {elem.name} {elem.surname}
                    </h1>
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={() => toggleCheck(elem.id)}
                    />
                </div>
            )
        } else if (
            elem.name.toLowerCase().includes(searchText.toLowerCase())
        ) {
            console.log(elem.name.toLowerCase())
            return   <div className="flex justify-between" key={elem.id}>
                <h1>
                    {elem.name} {elem.surname}
                </h1>
                <input
                    type="checkbox"
                    name=""
                    id=""
                    onChange={() => toggleCheck(elem.id)}
                />
            </div>;
        } else {
            console.log(elem.name.toLowerCase())

            return "";
        }
        // return (

        // );
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={onClick} // Handle onClick
                    className="py-3 px-4 flex gap-x-2 bg-card-orange text-white rounded-lg skew-x-[-20deg] bg-indigo-500 border-none ml-3"
                >
                    <LuPlus className={"size-4 skew-x-[20deg]"} />
                    <span className={"skew-x-[20deg] "}>Yaratish</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black max-h-[500px] overflow-y-auto">
                <DialogHeader className="	h-16	">
                    <DialogTitle>Yaratish</DialogTitle>
                    <DialogDescription>
                        <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
                            <Input
                                type="text"
                                placeholder="search"
                                className="h-9 shadow-md"
                                value={searchText}
                                onChange={(event) => {
                                    setSearchText(event.target.value);
                                }}
                            />

                            <Button type="submit" className="bg-indigo-500 text-white h-9	">
                                Search
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">{usersMap}</div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" className="bg-indigo-500 text-white h-9	">
                            Jo&apos;natish
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;