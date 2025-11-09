"use client";

import React, { useState } from "react";

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
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* 2-column on md+, stacked on mobile */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left: Intro / copy */}
          <section className="flex flex-col justify-center">
            <h1
              className="font-rubik
                text-4xl sm:text-6xl md:text-6xl lg:text-7xl
                leading-[0.9] text-white"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-300">
                Contact Us
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/80">
              Got a question or proposal? We`d love to hear from you. Share a few
              details and we`ll get back to you ASAP.
            </p>

            <ul className="mt-6 space-y-2 text-white/70 text-sm">
              <li>• Typical response time: within 1-2 business days</li>
              <li>• Prefer email? Use the form or write to us directly</li>
              <li>• Phone optional - add if you want a call-back</li>
            </ul>
          </section>

          {/* Right: Form */}
          <section className="rounded-2xl border border-white/10 bg-black/50 p-5 sm:p-6 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-4">
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
