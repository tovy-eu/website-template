import { useState, type FormEvent } from 'react';

interface Props {
  labels: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    successMessage: string;
  };
}

export default function ContactForm({ labels }: Props) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // ponytail: wire to backend/email service when ready
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="py-8 text-center text-lg font-semibold">{labels.successMessage}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold">{labels.nameLabel}</label>
        <input id="name" name="name" type="text" required className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold">{labels.emailLabel}</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold">{labels.messageLabel}</label>
        <textarea id="message" name="message" rows={4} required className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm" />
      </div>
      <button type="submit" className="border border-gray-900 bg-gray-900 px-6 py-2 text-sm font-semibold text-white">
        {labels.submitLabel}
      </button>
    </form>
  );
}
