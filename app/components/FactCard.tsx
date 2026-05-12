"use client";

import { supabase } from "@/lib/supabase";

import { useState, useRef, useEffect } from "react";

type FactStatus =
  | "learned"
  | "knew_it"
  | "interesting"
  | "unclear"
  | "not_interesting";

interface StatusOption {
  id: FactStatus;
  label: string;
  icon: React.ReactNode;
}

// Sincronizado con la tabla public.facts
type Fact = {
  id: number;
  created_at: string;
  category: string | null;
  sub_category: string | null;
  fact: string | null;
  original_author: string | null;
  date_learned: string | null;
  link: string | null;
  status: FactStatus | string | null;
  created_by: string | null;
  importance: number | null; // smallint
  tag_1: string | null;
  tag_2: string | null;
  tag_3: string | null;
};

export default function FactCard({ fact }: { fact: Fact }) {
  const [status, setStatus] = useState<FactStatus>(
    (fact.status as FactStatus) || "interesting",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAriel = fact.created_by === "Ariel";
  const rotation = isAriel ? "-rotate-1" : "rotate-1";

  const updateStatus = async (newStatus: FactStatus) => {
    // 1. Cambio optimista en la UI
    const previousStatus = status;
    setStatus(newStatus);
    setIsMenuOpen(false);

    // 2. Llamada a Supabase
    const { error } = await supabase
      .from("facts")
      .update({ status: newStatus })
      .eq("id", fact.id);

    if (error) {
      console.error("Error updating status:", error.message);
      // 3. Revertir si hay error
      setStatus(previousStatus);
      alert("No se pudo actualizar el estado en la base de datos.");
    }
  };

  const userStyles = isAriel
    ? "bg-[var(--color-ariel-bg)] border-[var(--color-ariel-border)] text-[var(--color-ariel-text)]"
    : "bg-[var(--color-pamela-bg)] border-[var(--color-pamela-border)] text-[var(--color-pamela-text)]";

  const statusOptions: StatusOption[] = [
    {
      id: "learned",
      label: "Learned",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 9.333a2 2 0 00-.8 1z" />
        </svg>
      ),
    },
    {
      id: "knew_it",
      label: "Knew it",
      icon: <span className="text-sm">🤓</span>,
    },
    {
      id: "interesting",
      label: "Cool",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
    {
      id: "unclear",
      label: "Huh?",
      icon: <span className="text-sm font-bold">?</span>,
    },
    {
      id: "not_interesting",
      label: "Meh",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.2-1.6a2 2 0 00.8-1z" />
        </svg>
      ),
    },
  ];

  const currentStatus = statusOptions.find((opt) => opt.id === status);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative border-2 p-6 rounded-2xl transition-all hover:rotate-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] ${rotation} ${userStyles} border-slate-500`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          <span className="self-start text-[10px] font-black uppercase tracking-tighter bg-slate-900 text-white px-2 py-0.5 rounded">
            {fact.category || "General"}
          </span>
          <div className="flex gap-1">
            {[fact.tag_1, fact.tag_2, fact.tag_3].map(
              (tag, i) =>
                tag && (
                  <span
                    key={i}
                    className="text-[9px] bg-white/10 border border-white/20 px-1.5 py-0.5 rounded uppercase font-mono"
                  >
                    {tag}
                  </span>
                ),
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-mono opacity-50 mb-1 tracking-widest lowercase">
            {fact.date_learned || "no-date"}
          </span>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-[9px] font-mono uppercase opacity-40">
              Importance
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-3 rounded-full border border-white/20 ${i < (fact.importance || 0) ? "bg-white" : "bg-white/10"}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xl leading-snug mb-2">{fact.fact}</p>
        {fact.sub_category && (
          <span className="text-[10px] opacity-40 font-mono italic">
            — {fact.sub_category}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-black/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${isAriel ? "bg-blue-500 text-white" : "bg-pink-500 text-white"}`}
            >
              {fact.created_by ? fact.created_by[0] : "?"}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
              {fact.created_by}
            </span>
          </div>
          {fact.original_author && (
            <span className="text-[9px] opacity-40 italic ml-11">
              Source: {fact.original_author}
            </span>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center justify-center bg-black/40 rounded-xl border w-10 h-10 text-white transition-all hover:bg-black/60 ${isMenuOpen ? "border-white/50 shadow-[0_0_10px_rgba(255,255,255,0.2)]" : "border-white/10"}`}
          >
            {currentStatus?.icon}
          </button>

          {isMenuOpen && (
            <div className="absolute left-full top-0 ml-2 grid grid-cols-1 gap-1 bg-slate-900 border border-white/10 p-1.5 rounded-xl shadow-2xl z-20 w-32 animate-in fade-in slide-in-from-left-2 duration-200">
              {statusOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateStatus(opt.id)} // Llama a la nueva función
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors
      ${status === opt.id ? "bg-white/20 text-white" : "text-white/40 hover:bg-white/10 hover:text-white"}`}
                >
                  <span className="w-4 flex justify-center">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {fact.link && (
        <a
          href={fact.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity"
        >
          <svg
            className="w-3 h-3 text-white/20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
}
