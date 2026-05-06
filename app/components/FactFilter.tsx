"use client";

type FactFiltersProps = {
  onFilterChange: (filters: any) => void;
  categories: string[];
  authors: string[];
};

export default function FactFilters({
  onFilterChange,
  categories,
  authors,
}: FactFiltersProps) {
  const handleChange = (field: string, value: string) => {
    onFilterChange((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl mb-12 backdrop-blur-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Búsqueda por Tags / Texto */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
            Search Tags
          </label>
          <input
            type="text"
            placeholder="e.g. biology"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm outline-none focus:border-blue-500"
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        {/* Categoría */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
            Category
          </label>
          <select
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm outline-none"
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Autor */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
            Created By
          </label>
          <select
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm outline-none"
            onChange={(e) => handleChange("author", e.target.value)}
          >
            <option value="">Everyone</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Intensidad (Importance) */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
            Min Importance
          </label>
          <select
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm outline-none"
            onChange={(e) => handleChange("importance", e.target.value)}
          >
            <option value="0">All Levels</option>
            <option value="5">Level 5 Only</option>
            <option value="4">Level 4+</option>
            <option value="3">Level 3+</option>
          </select>
        </div>

        {/* Fecha */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
            Learned After
          </label>
          <input
            type="date"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm outline-none"
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
