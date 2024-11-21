'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Field {
  name: string;
  description: string;

}

const CreateFieldPage = () => {
  const router = useRouter();

  const [fieldData, setFieldData] = useState<Field>({
    name: "",
    description: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldData({ ...fieldData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();   

    try {
      const response = await fetch("/api/fields/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
      });

      if (response.ok) {
        Toast({
          title: "Field created successfully",
          duration: 5000,
        });
        router.push("/dashboard/conferences/fields");
      } else {
        Toast({
          title: "Error creating field",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error creating field:", error);
      Toast({
        title: "Error creating field",
        duration: 5000,
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Button onClick={() => router.back()}>Back</Button>
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter field name"
            name="name"
            value={fieldData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            placeholder="Enter field description"
            name="description"
            value={fieldData.description}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" className="bg-indigo-500">Create Field</Button>
      </Form>
    </div>
  );
};

export default CreateFieldPage;