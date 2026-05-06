import { supabase } from "@/lib/supabase";
import FactCard from "./components/FactCard";

type FactStatus =
  | "learned"
  | "knew_it"
  | "interesting"
  | "unclear"
  | "not_interesting";

type Fact = {
  id: number;
  fact: string;
  category: string;
  subcategory?: string;
  created_by: string;
  tags?: string[];
  status: FactStatus;
  intensity: number;
  learning_date: string;
};

const mockFacts: Fact[] = [
  {
    id: 1,
    fact: "Bananas are technically berries.",
    category: "Facts",
    subcategory: "Nature",
    created_by: "Ariel",
    tags: ["botany", "fruit", "food"],
    status: "learned",
    intensity: 3,
    learning_date: "2026-05-01",
  },
  {
    id: 2,
    fact: "Serendipity means finding something good without looking for it.",
    category: "Vocabulary",
    subcategory: "Advanced Words",
    created_by: "Pamela",
    tags: ["english", "meaning", "wisdom"],
    status: "interesting",
    intensity: 2,
    learning_date: "2026-05-02",
  },
  {
    id: 3,
    fact: "We accept the love we think we deserve.",
    category: "Quotes",
    subcategory: "Movies",
    created_by: "Pamela",
    tags: ["perks", "philosophy", "emotion"],
    status: "learned",
    intensity: 5,
    learning_date: "2026-05-03",
  },
  {
    id: 4,
    fact: "Interstellar explores time dilation near black holes.",
    category: "Media",
    subcategory: "Movies",
    created_by: "Ariel",
    tags: ["sci-fi", "physics", "nolan"],
    status: "interesting",
    intensity: 5,
    learning_date: "2026-05-04",
  },
  {
    id: 5,
    fact: "Octopuses have three hearts.",
    category: "Facts",
    subcategory: "Biology",
    created_by: "Ariel",
    tags: ["marine", "animals", "anatomy"],
    status: "knew_it",
    intensity: 4,
    learning_date: "2026-05-05",
  },
  {
    id: 6,
    fact: "Ephemeral means lasting for a very short time.",
    category: "Vocabulary",
    subcategory: "English",
    created_by: "Pamela",
    tags: ["adjective", "time", "literary"],
    status: "learned",
    intensity: 3,
    learning_date: "2026-05-05",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-6xl font-black text-white tracking-tighter mb-2">
          I KNOW FOR A FACT...!
        </h1>
        <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-pink-500"></div>
        <p className="mt-4 text-slate-400 font-mono text-sm uppercase tracking-widest">
          Shared Learning Journal / Ariel & (Once in every year) Pamela
        </p>
      </header>

      <div className="columns-1 md:columns-2 gap-8 space-y-8">
        {mockFacts.map((fact, i) => (
          <div key={i} className="break-inside-avoid">
            <FactCard fact={fact} />
          </div>
        ))}
      </div>
    </main>
  );
}
