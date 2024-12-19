import React from "react";

function HeroStatisticCard() {
  return (
    <div className="mt-16 lg:mt-0 lg:col-span-5">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">500+</div>
            <div className="mt-2 text-sm text-gray-400">Events Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">50k+</div>
            <div className="mt-2 text-sm text-gray-400">Attendees</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">98%</div>
            <div className="mt-2 text-sm text-gray-400">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">24/7</div>
            <div className="mt-2 text-sm text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroStatisticCard;
