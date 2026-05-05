type Fact = {
  fact: string;
  category: string;
  subcategory?: string;
  created_by: string;
};

export default function FactCard({ fact }: { fact: Fact }) {
  const userStyles =
    fact.created_by === "Ariel"
      ? "bg-[var(--color-ariel-bg)] text-[var(--color-ariel-text)] border-[var(--color-ariel-border)]"
      : "bg-[var(--color-pamela-bg)] text-[var(--color-pamela-text)] border-[var(--color-pamela-border)]";

  const categoryStyles: Record<string, string> = {
    Facts: "border-yellow-400",
    Vocabulary: "border-green-400",
    Quotes: "border-purple-400 italic",
    Media: "border-orange-400",
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-xl shadow-lg hover:shadow-xl transition ${userStyles} ${categoryStyles[fact.category]}`}
    >
      <p className="text-lg leading-relaxed">{fact.fact}</p>

      <div className="mt-2 text-sm opacity-70 flex justify-between">
        <span>{fact.category}</span>
        <span>{fact.created_by}</span>
      </div>

      {fact.subcategory && (
        <div className="text-xs mt-1 opacity-60">{fact.subcategory}</div>
      )}
    </div>
  );
}
