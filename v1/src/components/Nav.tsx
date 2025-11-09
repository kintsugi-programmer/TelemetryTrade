'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import Link from 'next/link';
import { motion, type Variants, type Transition } from 'framer-motion';
import { FiMenu, FiArrowRight } from 'react-icons/fi';
import { createPortal } from 'react-dom';
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
const navLinks = (rawNavLinks as NavItem[]) ?? [];

/* Transitions / Variants */
const spring: Transition = { type: 'spring', stiffness: 300, damping: 28, mass: 0.6 };

const menuVariants: Variants = {
  open: { scaleY: 1, opacity: 1, transition: { ...spring, when: 'beforeChildren', staggerChildren: 0.06 } },
  closed: { scaleY: 0.95, opacity: 0, transition: { ...spring, when: 'afterChildren', staggerChildren: 0.04 } },
};

const itemVariants: Variants = {
  open: { y: 0, opacity: 1, transition: spring },
  closed: { y: -8, opacity: 0, transition: spring },
};

/* ---------------- Small Portal helper ---------------- */

function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

/* ---------------- Root Nav ---------------- */

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav
      className="sticky top-0 z-[60] w-full border-b border-zinc-800
                 bg-[rgb(8,10,14)]/85 backdrop-blur supports-[backdrop-filter]:bg-[rgb(8,10,14)]/65"
      role="navigation"
      aria-label="Main"
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          <NavLeft setIsOpen={setIsOpen} />
          <NavRight />
        </div>
      </div>

      {/* Mobile menu + backdrop, rendered in a portal so no parent can clip/hide it */}
      <Portal>
        {isOpen && (
          <>
            {/* Backdrop */}
            <button
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[95] bg-black/30"
            />

            {/* Dropdown panel (positioned under the navbar) */}
            <motion.div
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              variants={menuVariants}
              style={{ transformOrigin: 'top' }}
              className="fixed left-0 right-0 top-[56px] z-[100] mx-auto max-w-7xl px-4"
            >
              <div className="origin-top overflow-hidden transform-gpu will-change-transform
                              bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl
                              px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2
                                 text-lg font-medium text-zinc-300 hover:bg-zinc-800/60
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
                    >
                      <FiArrowRight className="h-[22px] w-[22px] text-zinc-500 group-hover:text-teal-400 transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </Portal>
    </nav>
  );
};

export default Nav;

/* ---------------- Subcomponents ---------------- */

const NavLeft = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => (
  <div className="flex items-center gap-2 sm:gap-6">
    {/* Hamburger (mobile only) */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="block lg:hidden text-zinc-200 text-2xl rounded-lg p-2
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
      aria-label="Toggle menu"
      onClick={() => setIsOpen((v) => !v)}
    >
      <FiMenu />
    </motion.button>

    {/* Logo */}
    <Link href="/" className="font-rubik text-2xl">
      Telemetry
    </Link>

    {/* Desktop links */}
    <div className="hidden lg:flex items-center gap-2">
      {navLinks.map((link) => (
        <NavLink key={link.href} text={link.label} links={link.href} />
      ))}
    </div>
  </div>
);

type NavLinkProps = { text: string; links: string };

const NavLink = ({ text, links }: NavLinkProps) => (
  <Link
    href={links}
    className="group relative h-[30px] overflow-hidden font-medium
               rounded-md px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
    aria-label={text}
  >
    <motion.div whileHover={{ y: -30 }}>
      <span className="flex items-center h-[30px] text-zinc-400 transition-colors duration-200">
        {text}
      </span>
      <span className="flex items-center h-[30px] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400">
        {text}
      </span>
    </motion.div>
    <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />
  </Link>
);

const NavRight = () => (
  <div className="flex items-center gap-2 sm:gap-4">
    <header className="flex justify-end items-center gap-2 sm:gap-3 h-5">
      <SignedOut>
        <SignInButton>
          <button className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
            Login
          </button>
        </SignInButton>

        <SignUpButton>
          <button className="bg-teal-950 text-teal-400 border border-teal-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
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
