"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FactModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fact: "",
    category: "Facts",
    sub_category: "",
    original_author: "",
    date_learned: new Date().toISOString().split("T")[0],
    link: "",
    created_by: "Ariel",
    importance: 3,
    tag_1: "",
    tag_2: "",
    tag_3: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("facts").insert([
      {
        ...formData,
        status: "interesting",
      },
    ]);

    setLoading(false);
    if (!error) {
      onSuccess();
      onClose();
      setFormData({
        fact: "",
        category: "Facts",
        sub_category: "",
        original_author: "",
        date_learned: new Date().toISOString().split("T")[0],
        link: "",
        created_by: "Ariel",
        importance: 3,
        tag_1: "",
        tag_2: "",
        tag_3: "",
      });
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-slate-900 border-2 border-slate-700 w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tighter">
            ADD TO LEDGER
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
              Fact / Learning Content
            </label>
            <textarea
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none min-h-[120px] transition-colors"
              value={formData.fact}
              onChange={(e) =>
                setFormData({ ...formData, fact: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Category
                </label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none mt-1"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Facts">Facts</option>
                  <option value="Vocabulary">Vocabulary</option>
                  <option value="Quotes">Quotes</option>
                  <option value="Media">Media</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Sub Category
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none mt-1"
                  value={formData.sub_category}
                  onChange={(e) =>
                    setFormData({ ...formData, sub_category: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Reference Link
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none mt-1 text-sm"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Importance (1-5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full h-10 accent-blue-500"
                  value={formData.importance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      importance: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 pt-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Learning Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm mt-1"
                value={formData.date_learned}
                onChange={(e) =>
                  setFormData({ ...formData, date_learned: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Original Author
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm mt-1"
                value={formData.original_author}
                onChange={(e) =>
                  setFormData({ ...formData, original_author: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Created By
              </label>
              <select
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm mt-1"
                value={formData.created_by}
                onChange={(e) =>
                  setFormData({ ...formData, created_by: e.target.value })
                }
              >
                <option value="Ariel">Ariel</option>
                <option value="Pamela">Pamela</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-3">
              Tags (Limit 3)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <input
                placeholder="TAG 01"
                className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500 transition-colors"
                value={formData.tag_1}
                onChange={(e) =>
                  setFormData({ ...formData, tag_1: e.target.value })
                }
              />
              <input
                placeholder="TAG 02"
                className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500 transition-colors"
                value={formData.tag_2}
                onChange={(e) =>
                  setFormData({ ...formData, tag_2: e.target.value })
                }
              />
              <input
                placeholder="TAG 03"
                className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-pink-500 transition-colors"
                value={formData.tag_3}
                onChange={(e) =>
                  setFormData({ ...formData, tag_3: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white font-black py-5 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 shadow-xl"
          >
            {loading ? "COMMITTING TO DATABASE..." : "FINALIZE ENTRY"}
          </button>
        </form>
      </div>
    </div>
  );
}
