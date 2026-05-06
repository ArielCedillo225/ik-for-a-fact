"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import FactCard from "./components/FactCard";
import FactModal from "./components/FactModal";
import FactFilters from "./components/FactFilter";

export default function Home() {
  const [facts, setFacts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    author: "",
    importance: "0",
    date: "",
  });

  async function fetchFacts() {
    const { data } = await supabase
      .from("facts")
      .select("*")
      .order("date_learned", { ascending: false });
    if (data) setFacts(data);
  }

  useEffect(() => {
    fetchFacts();
  }, []);

  // Lógica de filtrado en cliente
  const filteredFacts = useMemo(() => {
    return facts.filter((fact) => {
      const matchesSearch =
        !filters.search ||
        [fact.tag_1, fact.tag_2, fact.tag_3, fact.fact].some((field) =>
          field?.toLowerCase().includes(filters.search.toLowerCase()),
        );
      const matchesCategory =
        !filters.category || fact.category === filters.category;
      const matchesAuthor =
        !filters.author || fact.created_by === filters.author;
      const matchesImportance = fact.importance >= parseInt(filters.importance);
      const matchesDate =
        !filters.date ||
        (fact.date_learned && fact.date_learned >= filters.date);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAuthor &&
        matchesImportance &&
        matchesDate
      );
    });
  }, [facts, filters]);

  // Extraer valores únicos para los selectores
  const categories = Array.from(
    new Set(facts.map((f) => f.category).filter(Boolean)),
  );
  const authors = Array.from(
    new Set(facts.map((f) => f.created_by).filter(Boolean)),
  );

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter mb-2">
            I Know For A Fact...!
          </h1>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-pink-500"></div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 shadow-xl"
        >
          + NEW ENTRY
        </button>
      </header>

      <FactFilters
        onFilterChange={setFilters}
        categories={categories}
        authors={authors}
      />

      {filteredFacts.length > 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredFacts.map((fact) => (
            <div key={fact.id} className="break-inside-avoid">
              <FactCard fact={fact} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-3xl">
          <p className="text-slate-500 font-mono italic">
            No facts match your current filters.
          </p>
        </div>
      )}

      <FactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFacts}
      />
    </main>
  );
}
