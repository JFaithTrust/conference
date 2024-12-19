import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Send, Users } from "lucide-react";
import HeroStatisticCard from "../cards/hero-statistic-card";
import FeatureCard from "../cards/feature-card";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-900 to-primary-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://www.mikro-makro.net/uploads/images/image_750x422_5fbfe4716eeb1.jpg"
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter">
              Revolutionize Your Conference Management
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 max-w-2xl">
              Create, send, and organize conferences with ease. Streamline your
              event planning process and deliver unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className=" h-11 bg-black" asChild>
                <Link href="/get-started">
                  Get Started <ArrowRight className="m-auto h-5 w-10" />
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline" asChild>
                <Link href="/demo">Watch Demo</Link>
              </Button> */}
            </div>
          </div>

          <div className="lg:ml-auto w-3/4">
            <HeroStatisticCard />
          </div>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Calendar className="h-10 w-10 text-primary-300" />}
            title="Easy Scheduling"
            description="Effortlessly plan and schedule your conferences with our intuitive tools."
          />
          <FeatureCard
            icon={<Send className="h-10 w-10 text-primary-300" />}
            title="Smart Invitations"
            description="Create and send personalized invitations to attendees with just a few clicks."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary-300" />}
            title="Attendee Management"
            description="Efficiently manage registrations, check-ins, and attendee engagement."
          />
        </div>
      </div>
    </section>
  );
}

// import { Button } from "@/components/ui/button";
// import { Calendar, Users, Globe, ArrowRight, Send } from "lucide-react";
// import FeatureCard from "../cards/feature-card";

// export default function Hero() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary-900 to-primary-800">
//       {/* Background with overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center z-0"
//         style={{
//           backgroundImage:
//             'url("https://www.mikro-makro.net/uploads/images/image_750x422_5fbfe4716eeb1.jpg")',
//         }}
//       >
//         <div className="absolute inset-0 bg-white/70 mix-blend-multiply" />
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="pt-32 pb-20 text-center lg:text-left">
//           <div className="lg:grid lg:grid-cols-12 lg:gap-8">
//             <div className="lg:col-span-7">
//               <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm mb-6">
//                 <span className="text-primary-foreground text-sm font-medium">
//                   🎉 Launching Conference Manager 2024
//                 </span>
//               </div>

//               <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
//                 Create & Manage Conferences with Ease
//               </h1>

//               <p className="mt-6 text-xl text-gray-300 max-w-3xl">
//                 Streamline your conference planning process with our all-in-one
//                 platform. From registration to scheduling, we've got you
//                 covered.
//               </p>

//               <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <Button
//                   size="lg"
//                   className="gap-2 h-11 bg-black text-primary-foreground hover:bg-primary/90"
//                 >
//                   Create Conference <ArrowRight className="w-4 h-4" />
//                 </Button>
//                 {/* <Button size="lg" variant="outline" className="gap-2 h-11">
//                   Explore Events
//                 </Button> */}
//               </div>

//               {/* Features */}
//               <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
//                 <FeatureCard
//                   icon={<Calendar className="h-10 w-10 text-primary-300" />}
//                   title="Easy Scheduling"
//                   description="Effortlessly plan and schedule your conferences with our intuitive tools."
//                 />
//                 <FeatureCard
//                   icon={<Send className="h-10 w-10 text-primary-300" />}
//                   title="Smart Invitations"
//                   description="Create and send personalized invitations to attendees with just a few clicks."
//                 />
//                 <FeatureCard
//                   icon={<Users className="h-10 w-10 text-primary-300" />}
//                   title="Attendee Management"
//                   description="Efficiently manage registrations, check-ins, and attendee engagement."
//                 />
//               </div>
//               {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
//                     <Calendar className="w-6 h-6 text-primary-foreground" />
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">Smart Scheduling</p>
//                     <p className="text-gray-400 text-sm">AI-powered timeline</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
//                     <Users className="w-6 h-6 text-primary-foreground" />
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">
//                       Attendee Management
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       Seamless registration
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
//                     <Globe className="w-6 h-6 text-primary-foreground" />
//                   </div>
//                   <div>
//                     <p className="text-white font-medium">Virtual Events</p>
//                     <p className="text-gray-400 text-sm">Hybrid capabilities</p>
//                   </div>
//                 </div>
//               </div> */}
//             </div>

//             {/* Stats Card */}
//             {/* <div className="mt-16 lg:mt-0 lg:col-span-5">
//               <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
//                 <div className="grid grid-cols-2 gap-8">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-white">500+</div>
//                     <div className="mt-2 text-sm text-gray-400">
//                       Events Hosted
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-white">50k+</div>
//                     <div className="mt-2 text-sm text-gray-400">Attendees</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-white">98%</div>
//                     <div className="mt-2 text-sm text-gray-400">
//                       Satisfaction
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-white">24/7</div>
//                     <div className="mt-2 text-sm text-gray-400">Support</div>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
