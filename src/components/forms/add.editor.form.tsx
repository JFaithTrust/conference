'use client'; 

import { userAddSchema } from "@/lib/validation";
import Modal from "../ui/Modal";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import useUserAddModal from "@/hook/useUserAddModal";
import { UserType } from "@/types";
import { useState } from "react";

interface UserAddFormProps {
  allReviewers: UserType[];
  setReviewersId: (ids: string[]) => void;
}

const AddEditorForm = ({
  allReviewers,
  setReviewersId,
}: UserAddFormProps) => {
  const userAddModal = useUserAddModal();

  const form = useForm<z.infer<typeof userAddSchema>>({
    resolver: zodResolver(userAddSchema),
    defaultValues: {
      users: [],
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  function onSubmit(data: z.infer<typeof userAddSchema>) {
    setReviewersId(data.users);
    userAddModal.onClose();
  }

  const body = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="users"
          render={() => (
            <FormItem>
              <div className="flex flex-row justify-between">
                <h1>Editor Tanlash</h1>
                <div>
                  <Input
                    placeholder="Enter name..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-[1px] border-solid rounded-xl border-[#E2DEDE]"
                  />
                </div>
              </div>
              {allReviewers
                .filter((user) =>
                  user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <FormField
                    key={user.id}
                    control={form.control}
                    name="users"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-y-0 p-[6px] border-[1px] border-solid rounded-xl border-[#E2DEDE]">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(user.id.toString())}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, user.id.toString()])
                                : field.onChange(field.value?.filter(value => value !== user.id.toString()));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal w-full">
                          <div className="flex flex-row justify-between">
                            <div className="p-[6px] w-[240px] flex items-center">
                              {user.fullName}
                            </div>
                            <div className="p-[6px] flex items-center">
                              {user.phoneNumber}
                            </div>
                            <Button
                              className={`py-[6px] px-[12px] rounded-xl w-[100px] ${
                                user.userStatus === "INACTIVE"
                                  ? "bg-typered hover:bg-typered/85"
                                  : "bg-typegreen hover:bg-typegreen/85"
                              }`}
                            >
                              {user.userStatus}
                            </Button>
                          </div>
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  const footer = (
    <div className="flex flex-row justify-between">
      <Button
        variant={"destructive"}
        onClick={userAddModal.onClose}
        className="px-[30px] py-[9px]"
      >
        Bekor qilish
      </Button>
      <Button
        onClick={form.handleSubmit(onSubmit)}
        className="px-[27px] py-[9px] bg-typegreen hover:bg-typegreen/85"
      >
        Saqlash
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={userAddModal.isOpen}
      onClose={userAddModal.onClose}
      classNames="w-[1000px] h-[720px] p-[18px]"
      body={body}
      bg="bg-white"
      footer={footer}
    />
  );
};

export default AddEditorForm;
