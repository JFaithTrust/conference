import { Suspense } from "react";

import Hero from "@/components/layout/hero";
import { ConferenceSection } from "@/components/sections";

export default function Home() {
  return (
    <div className={"flex flex-col"}>
      <div className="bg-primary-50 bg-dotted-pattern bg-contain">
        <Hero />
      </div>
      <div className="container my-10">
        <Suspense>
          <ConferenceSection />
        </Suspense>
      </div>
    </div>
  );
}
