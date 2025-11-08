'use client';

import { motion as motionAnimation, type Variants, type Transition } from 'framer-motion';
import Link from 'next/link';
// import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { FiMenu, FiArrowRight } from 'react-icons/fi';
import rawNavLinks from '@/data/navLinks.json';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

/* ---------------- Types & Data ---------------- */

type NavItem = { href: string; label: string };
const navLinks = rawNavLinks as NavItem[];

/* Transition typing fix */
const spring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 28,
  mass: 0.6,
};

type VariantTransition = Transition & {
  when?: 'beforeChildren' | 'afterChildren';
  staggerChildren?: number;
  delayChildren?: number;
  staggerDirection?: 1 | -1;
};

/* ---------------- Root ---------------- */

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative z-50">
      <FlipNav isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div
          className="fixed inset-0 z-1000  lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}
    </div>
  );
};

/* ---------------- Shell ---------------- */

const FlipNav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav
      className="sticky top-0 w-full border-b border-zinc-800
                 bg-[rgb(8,10,14)]/85 backdrop-blur supports-[backdrop-filter]:bg-[rgb(8,10,14)]/65
                 p-4 sm:p-4"
      role="navigation"
      aria-label="Main"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <NavLeft setIsOpen={setIsOpen} />
          <NavRight />
        </div>

        {isOpen && (
          <div className="lg:hidden mt-2">
            <NavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
      </div>
    </nav>
  );
};

/* ---------------- Left ---------------- */

// const Logo = () => (
//   <Link
//     href="/"
//     className="inline-flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
//     aria-label="TelemetryTrade home"
//   >

//     <span className=" font-rubik text-2xl hidden sm:block ">
//       Telemetry<span className="">Trade</span>
//     </span>
//   </Link>
// );

const NavLeft = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => (
  <div className="flex items-center gap-2 sm:gap-6">

    <motionAnimation.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="block lg:hidden text-zinc-200 text-2xl rounded-lg p-2
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
      aria-label="Toggle menu"
      onClick={() => setIsOpen((pv) => !pv)}
    >
      <FiMenu />
      
    </motionAnimation.button>

    <div className=" font-rubik text-2xl  ">
      Telemetry
    </div>
    


    <div className="hidden lg:flex items-center gap-2">
      {navLinks.map((link) => (
        <NavLink key={link.href} text={link.label} links={link.href} />
      ))}
    </div>
  </div>
);

/* ---------------- Links ---------------- */

type NavLinkProps = { text: string; links: string };

const NavLink = ({ text, links }: NavLinkProps) => (
  <Link
    href={links}
    className="group relative h-[30px] overflow-hidden font-medium
               rounded-md px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
    aria-label={text}
  >
    <motionAnimation.div whileHover={{ y: -30 }}>
      <span className="flex items-center h-[30px] text-zinc-400 transition-colors duration-200">
        {text}
      </span>
      <span className="flex items-center h-[30px] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400">
        {text}
      </span>
    </motionAnimation.div>
    <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-300 group-hover:w-full" />
  </Link>
);

/* ---------------- Right ---------------- */

const NavRight = () => (
  <div className="flex items-center gap-2 sm:gap-4">
    <header className="flex justify-end items-center gap-2 sm:gap-3 h-5">
      <SignedOut>
        <SignInButton>
 <button className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden  relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
      <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
      Login
    </button>
        </SignInButton>

        <SignUpButton>
 <button className="bg-teal-950 text-teal-400 border border-teal-400 border-b-4 font-medium overflow-hidden  relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
      <span className="bg-teal-400 shadow-teal-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
      Sign up
    </button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: 'ring-2 ring-teal-500/40 rounded-full',
            },
          }}
        />
      </SignedIn>

    </header>
  </div>
);

/* ---------------- Mobile menu ---------------- */

const NavMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClick = () => setIsOpen(false);

  return (
    <motionAnimation.div
      variants={menuVariants}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="origin-top overflow-hidden transform-gpu will-change-transform
                 bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl
                 px-4 py-4 flex flex-col gap-1 backdrop-blur-sm"
      style={{ transformOrigin: 'top' }}
    >
      {navLinks.map((link) => (
        <MenuLink key={link.href} text={link.label} links={link.href} onClick={handleClick} />
      ))}
    </motionAnimation.div>
  );
};

const MenuLink = ({
  text,
  links,
  onClick,
}: {
  text: string;
  links: string;
  onClick: () => void;
}) => (   <> 
  <motionAnimation.a
    onClick={onClick}
    href={links}
    rel="nofollow"
    variants={menuLinkVariants}
    className="z-1000 group flex items-start gap-3 rounded-lg px-2 py-2
               text-lg font-medium text-zinc-300 hover:bg-zinc-800/60
               focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
  >
    <motionAnimation.span variants={menuLinkArrowVariants} className="pt-[2px]">
      <FiArrowRight className="h-[22px] w-[22px] text-zinc-500 transition-colors group-hover:text-teal-400" />
    </motionAnimation.span>

    <motionAnimation.div whileHover={{ y: -30 }} className="h-[30px] overflow-hidden">
      <span className="flex items-center h-[30px] text-zinc-400">{text}</span>
      <span className="flex items-center h-[30px] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400">
        {text}
      </span>
    </motionAnimation.div>
  </motionAnimation.a>
  </> 
);

export default Nav;

/* ---------------- Animation Variants ---------------- */

const menuVariants: Variants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      ...spring,
      when: 'beforeChildren',
      staggerChildren: 0.06,
    } as VariantTransition,
  },
  closed: {
    scaleY: 0.9,
    opacity: 0,
    transition: {
      ...spring,
      when: 'afterChildren',
      staggerChildren: 0.04,
    } as VariantTransition,
  },
};

const menuLinkVariants: Variants = {
  open: { y: 0, opacity: 1, transition: spring },
  closed: { y: -8, opacity: 0, transition: spring },
};

const menuLinkArrowVariants: Variants = {
  open: { x: 0, transition: spring },
  closed: { x: -4, transition: spring },
};
