import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const badges = [
  { icon: Truck,        title: "Free Delivery",    subtitle: "On orders above ₹499"  },
  { icon: RotateCcw,    title: "Easy Returns",      subtitle: "7-day return policy"    },
  { icon: ShieldCheck,  title: "Secure Payments",  subtitle: "100% safe & secure"     },
  { icon: Headphones,   title: "24/7 Support",      subtitle: "Dedicated support"      },
];

const Features = () => {
  return (
    <section className="w-full px-3 sm:px-4 lg:px-6 mb-6 sm:mb-10 lg:mb-12">
      <div className="bg-[#f8f8f8] rounded-2xl sm:rounded-[28px] py-5 sm:py-7 px-4 sm:px-6 lg:px-10 border border-gray-100">

        {/*
          Mobile  : 2×2 grid, everything centered
          Tablet+ : single row of 4, each item centered
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-5 sm:gap-6">
          {badges.map(({ icon: Icon, title, subtitle }, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-2 sm:gap-3"
            >
              {/* Icon circle */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#dbeafe] bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Icon className="text-[#2563eb]" size={22} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[13px] sm:text-[15px] font-semibold text-[#1f1729]">
                  {title}
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
