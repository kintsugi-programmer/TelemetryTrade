'use client';
// import Image from 'next/image';
import Link from 'next/link';
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';
import footLinks from '@/data/footLinks.json'; // adjust path if needed

// Map of icons
const iconMap: Record<string, IconType> = {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
};

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-12 pt-20 pb-10 text-sm">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Logo + Newsletter + Social */}
        <div className="col-span-2 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-4">
            {/* <Image
              src="/Images/Logo.png"
              alt="Logo"
              width={200}
              height={80}
              className="transition-transform duration-300 hover:scale-110"
            /> */}
             <h1
          className="font-rubik 
                     sm:text-2xl md:text-8xl lg:text-5xl text-5xl
                     leading-[0.9] text-white"
        >
          
          <span className="">Telemetry</span>
        </h1>

          </Link>

          {/* Newsletter */}
          <div>
            <p className="text-base font-semibold mb-2">Subscribe to Our Newsletters</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = e.currentTarget.email.value;
                try {
                  const res = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                  });
                  const result = await res.json();
                  alert(result.message || 'Subscription successful');
                  e.currentTarget.email.value = '';
                } catch {
                  alert('Subscription failed.');
                }
              }}
              className="flex items-center border border-zinc-900 rounded-full overflow-hidden max-w-sm"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="bg-white text-black px-4 py-2 flex-1 outline-none placeholder:"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 font-bold hover:bg-teal-400 hover:text-black transition"
              >
                →
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-base font-semibold mb-2">Follow us</p>
            <div className="flex gap-4 text-xl">
              {footLinks.socialMedia.map(({ label, icon, href }) => {
                const IconComponent = iconMap[icon];
                return IconComponent ? (
                  <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
                    <IconComponent className="hover:scale-110 hover:text-teal-400 transition duration-300 cursor-pointer" />
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2 ">
            {footLinks.usefulLinks.map(({ label, href }) => (
              <li key={label} className="hover:text-purple-500 hover:translate-x-1 transition duration-200">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold mb-4">More</h4>
          <ul className="space-y-2 ">
            {footLinks.moreLinks.map(({ label, href }) => (
              <li key={label} className="hover:text-blue-500 hover:translate-x-1 transition duration-200">
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <div className=" leading-relaxed space-y-1">
            {footLinks.contact.addressLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <p className="pt-2">
              📧{' '}
              <a
                href={`mailto:${footLinks.contact.email}`}
                className="underline hover:text-teal-400 transition"
              >
                {footLinks.contact.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center  mt-12 pt-6 border-t border-zinc-900">
        &copy; {new Date().getFullYear()} {footLinks.copyright}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
