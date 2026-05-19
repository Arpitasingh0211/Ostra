import React from 'react'
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const Features = () => {

    const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders over $100",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    subtitle: "100% protected payments",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "30-day return policy",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    subtitle: "Dedicated customer service",
  },
];


  return (
   <div className="w-full  py-16 px-4 ">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-2 md:grid-cols-4">
          {badges.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center gap-3"
            >
              <div className="shrink-0 text-gray-700">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features;