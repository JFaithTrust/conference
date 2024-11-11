import ConferencesCards from "@/components/layout/conferences-cards";

export default function Home() {
  return (
    <div>
      <div className="bg-primary-50 bg-dotted-pattern bg-contain py-40">
        <div className="container">
         <ConferencesCards />
        </div>
      </div>
    </div>
  );
}