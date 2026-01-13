"use client";

import React, { useState } from "react";
import { FoundersSection } from "@/components/FoundersSection";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phno: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage(result.message);
        setFormData({ name: "", email: "", phno: "", subject: "", message: "" });
      } else {
        setResponseMessage(result.message);
      }
    } catch {
      setResponseMessage("An error occurred while sending the message.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-neutral-900 to-black text-white relative overflow-hidden">
      {/* Decorative blur blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24 relative">
        {/* 2-column on md+, stacked on mobile */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left: Intro / copy */}
          <section className="flex flex-col justify-center space-y-6">
            <h1
              className="font-rubik
                text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                leading-[0.9]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400">
                Contact Us
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300">
              Got a question or proposal? We&apos;d love to hear from you. Share a few
              details and we&apos;ll get back to you ASAP.
            </p>

            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-center gap-3">
                <span className="text-cyan-400">•</span>
                <span>Typical response time: within 1-2 business days</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400">•</span>
                <span>Prefer email? Use the form or write to us directly</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-400">•</span>
                <span>Phone optional - add if you want a call-back</span>
              </li>
            </ul>
          </section>

          {/* Right: Form */}
          <section className="rounded-2xl border border-neutral-700/50 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Responsive two-up for name/email on md+ */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  label="Name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone + Subject side-by-side on md+ */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputField
                  label="Phone Number"
                  id="phno"
                  type="tel"
                  value={formData.phno}
                  onChange={handleChange}
                />
                <InputField
                  label="Subject"
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <TextareaField
                label="Message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {responseMessage && (
                <p className="text-center mt-3 text-sm text-white/90">{responseMessage}</p>
              )}
            </form>
          </section>
        </div>
      </div>

      {/* Founders Section */}
      <FoundersSection />
    </main>
  );
}

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  required = false,
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium text-white/90">
      {label} {required && <span className="text-teal-400" aria-hidden>*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-white/50
                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      placeholder={label}
    />
  </div>
);

interface TextareaFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  id,
  value,
  onChange,
  required = false,
}) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium text-white/90">
      {label} {required && <span className="text-teal-400" aria-hidden>*</span>}
    </label>
    <textarea
      id={id}
      rows={6}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-white/50
                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      placeholder="Type your message…"
    />
  </div>
);
