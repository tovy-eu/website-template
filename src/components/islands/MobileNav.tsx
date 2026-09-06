import { useState } from 'react';

interface Props {
  navLinks: { label: string; href: string }[];
  altLocale: { label: string; href: string };
}

export default function MobileNav({ navLinks, altLocale }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 text-sm">
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <ul className="absolute left-0 right-0 top-full border-b border-gray-200 bg-white px-4 py-4 space-y-2">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="block text-sm py-1">{label}</a>
            </li>
          ))}
          <li>
            <a href={altLocale.href} className="inline-block border border-gray-300 px-2 py-1 text-xs font-semibold">{altLocale.label}</a>
          </li>
        </ul>
      )}
    </div>
  );
}
