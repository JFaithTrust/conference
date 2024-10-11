"use client";
import React, { useEffect, useState } from "react";
import $auth from "@/http/auth";
import CountDownConference from "../custom/CountDownConference";
import { ConferenceType } from "@/types";
import { Button } from "../ui/button";
export const TaskTodayCard = () => {

  // const [data, setData] = useState<ConferenceType[] | []>([]);

  // useEffect(() => {
  //   $auth
  //     .get("/conference/all")
  //     .then((res) => console.log(res.data))
  //     .catch((error) => console.log(error));
  // }, []);

  const data = [
    {
      id: 1,
      name: "International Conference on Web Development",
      startsAt: "2024-12-10T09:00:00Z",
      endsAt: "2024-12-12T17:00:00Z",
      deadlineForThesis: "2024-10-01",
      cost: "150",
      description:
        "This conference focuses on the latest trends and technologies in web development.",
      address: "123 Web St, Tech City, TX 75001",
      requirements: "Participants should submit a thesis for consideration.",
      newApplicationsCount: 5,
      images:
        "https://www.shutterstock.com/image-photo/speaker-giving-talk-conference-hall-600nw-2321303215.jpg",
      owner: {
        id: 1,
        fullName: "Alice Smith",
        email: "alice.smith@example.com",
        username: "alice_smith",
        role: "Organizer",
        phoneNumber: "123-456-7890",
      },
    },
    {
      id: 2,
      name: "Annual AI and Machine Learning Summit",
      startsAt: "2024-12-10T09:00:00Z",
      endsAt: "2024-12-12T17:00:00Z",
      deadlineForThesis: "2024-11-15",
      cost: "200",
      description:
        "An annual gathering of AI and ML enthusiasts, researchers, and professionals.",
      address: "456 AI Ave, Innovation Hub, CA 90001",
      requirements:
        "Submit a project or thesis related to AI or Machine Learning.",
      newApplicationsCount: 10,
      images:
        "https://www.shutterstock.com/image-photo/speaker-giving-talk-conference-hall-600nw-2321303215.jpg",
      owner: {
        id: 2,
        fullName: "Bob Johnson",
        email: "bob.johnson@example.com",
        username: "bob_johnson",
        role: "Chair",
        phoneNumber: "987-654-3210",
      },
    },
    {
      id: 3,
      name: "Tech Innovations Expo 2024",
      startsAt: "2024-12-10T09:00:00Z",
      endsAt: "2024-12-12T17:00:00Z",
      deadlineForThesis: "2024-08-30",
      cost: "100",
      description:
        "A showcase of the latest innovations in technology and startups.",
      address: "789 Startup Blvd, Silicon Valley, CA 94043",
      requirements: "Open for all tech startups and innovators.",
      newApplicationsCount: 8,
      images:
        "https://www.shutterstock.com/image-photo/speaker-giving-talk-conference-hall-600nw-2321303215.jpg",
      owner: {
        id: 3,
        fullName: "Charlie Brown",
        email: "charlie.brown@example.com",
        username: "charlie_brown",
        role: "Coordinator",
        phoneNumber: "555-123-4567",
      },
    },
  ];
  return (
    <div className="space-y-4">
      {data?.map((item) => (
        <div
          key={item?.id}
          className="bg-primary-50 rounded-md overflow-hidden border-[2px]"
        >
          <img src={item?.images} alt="" className="w-full h-[180px]" />
          <div className="p-2">
            <div className=" flex justify-end opacity-80 pb-2 border-b mb-2">
              {<CountDownConference targetDate={item?.deadlineForThesis} />}
            </div>
            <p className="text-base font-medium text-wrap">{item?.name}</p>
            <p className="text-base font-normal mb-4">
              {item?.description.slice(0, 110)}
              ...
            </p>
            <Button className="bg-primary hover:bg-primary/75 w-full" variant={"default"}>Ko'proq ko'rish</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
