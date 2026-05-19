import { useState } from "react";
import { ArrowUp } from "lucide-react";

const footerLinks = [
  "Contact Us",
  "Shipping & Returns",
  "FAQs",
  "Order Tracking",
  "Size Guide",
];

// Custom SVG icons to avoid lucide-react compatibility issues
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.138-1.868 3.138-4.566 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.314-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);

const socialIcons = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: YoutubeIcon, label: "YouTube" },
  { icon: PinterestIcon, label: "Pinterest" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#0f1623] text-gray-300 text-sm">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-red-500 tracking-wide">Ostra</h2>
          <p className="text-gray-400 leading-relaxed">
            Powering Your World with the Best in Electronics.
          </p>
          <div className="text-gray-400 space-y-1 pt-1">
            <p>123 Electronics St, Style City, NY 10001</p>
            <p>Email: support@Zaptro.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Customer Service */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-base">Customer Service</h3>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-base">Follow Us</h3>
          <div className="flex items-center gap-4 pt-1">
            {socialIcons.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-base">Stay in the Loop</h3>
          <p className="text-gray-400 leading-relaxed">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <div className="flex mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 min-w-0 px-3 py-2 bg-white text-gray-800 text-sm placeholder-gray-400 outline-none rounded-l"
            />
            <button className="bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white px-4 py-2 text-sm font-medium rounded-r whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center relative">
          <p className="text-gray-500 text-xs text-center">
            © 2025{" "}
            <span className="text-red-500 font-medium">Zaptro</span>. All rights
            reserved
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="absolute right-6 bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white p-2 rounded"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
