import { supabase } from "@/lib/supabase";
import FactCard from "./components/FactCard";

const mockFacts = [
  {
    fact: "Bananas are technically berries.",
    category: "Facts",
    subcategory: "Nature",
    created_by: "Ariel",
  },
  {
    fact: "Serendipity means finding something good without looking for it.",
    category: "Vocabulary",
    subcategory: "Advanced Words",
    created_by: "Pamela",
  },
  {
    fact: "We accept the love we think we deserve.",
    category: "Quotes",
    subcategory: "Movies",
    created_by: "Pamela",
  },
  {
    fact: "Interstellar explores time dilation near black holes.",
    category: "Media",
    subcategory: "Movies",
    created_by: "Ariel",
  },
  {
    fact: "Octopuses have three hearts.",
    category: "Facts",
    subcategory: "Biology",
    created_by: "Ariel",
  },
  {
    fact: "Ephemeral means lasting for a very short time.",
    category: "Vocabulary",
    subcategory: "English",
    created_by: "Pamela",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wide text-white">
        I Know For A Fact...!
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {mockFacts.map((fact, i) => (
          <FactCard key={i} fact={fact} />
        ))}
      </div>
    </main>
  );
}
