import ConferencesCards from "@/components/layout/conferences-cards";

export default function Home() {
  return (
    <div className="">
      <div className="py-40 bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="container">
         <ConferencesCards />
        </div>
      </div>
    </div>
  );
}
