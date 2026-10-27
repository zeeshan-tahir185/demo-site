"use client";

import { useState } from "react";

export function Avatar({ src, name, className = "" }: { src: string; name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  if (failed) {
    return (
      <span className={`grid place-items-center bg-gradient-to-br from-navy-700 to-navy-900 font-semibold text-gold-300 ${className}`}>
        {initials}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={name} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
