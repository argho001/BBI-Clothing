import React, { useState, useMemo } from "react";
import { PRODUCTS, COMBOS } from "@/data/products";
import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_ITEMS = [
  ...PRODUCTS.map((p) => ({ ...p, img: p.img })),
  ...COMBOS.map((c) => ({ id: c.id, name: c.name, code: c.id.toUpperCase(), price: c.price, img: "", category: "Combos" })),
];

const CATEGORIES = ["All", ...Array.from(new Set(ALL_ITEMS.map((p) => p.category)))];

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const CATEGORY_BN: Record<string, string> = {
    All: "সব ক্যাটাগরি",
    Trousers: "ট্রাউজার",
    Premium: "প্রিমিয়াম",
    Casual: "ক্যাজুয়াল",
    Combos: "কম্বো",
  };

  const filtered = useMemo(
    () =>
      ALL_ITEMS.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (!search ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.code.toLowerCase().includes(search.toLowerCase()))
      ),
    [search, category]
  );

  const categoryCounts = useMemo(
    () =>
      CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
        acc[cat] = cat === "All" ? ALL_ITEMS.length : ALL_ITEMS.filter((p) => p.category === cat).length;
        return acc;
      }, {}),
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">পণ্য তালিকা</h1>
          <p className="mt-1 text-muted-foreground font-medium">{filtered.length} টি পণ্য</p>
        </div>
        <div className="rounded-2xl border bg-amber-50 border-amber-200 p-4 text-sm font-medium text-amber-800 max-w-xs">
          💡 পণ্য যোগ/সম্পাদনার সুবিধা ডেটাবেস সংযোগের পর সক্রিয় হবে।
        </div>
      </div>

      {/* Category summary */}
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-black transition-all ${
              category === cat
                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary"
            }`}
          >
            {CATEGORY_BN[cat] || cat}
            <span className={`rounded-full px-2 py-0.5 text-xs font-black ${category === cat ? "bg-white/20 text-white" : "bg-slate-100 text-muted-foreground"}`}>
              {categoryCounts[cat]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="নাম বা কোড দিয়ে খুঁজুন..."
          className="h-12 rounded-2xl border-slate-200 bg-white pl-11 font-medium text-base"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
              {product.img ? (
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Package className="h-10 w-10 text-slate-300" />
                </div>
              )}
              <div className="absolute left-3 top-3">
                <Badge className={`text-[9px] font-black uppercase tracking-widest border ${
                  product.category === "Premium" ? "bg-indigo-100 text-indigo-800 border-indigo-200" :
                  product.category === "Trousers" ? "bg-slate-100 text-slate-700 border-slate-200" :
                  product.category === "Combos" ? "bg-primary/10 text-primary border-primary/20" :
                  "bg-emerald-100 text-emerald-800 border-emerald-200"
                }`}>
                  {CATEGORY_BN[product.category] || product.category}
                </Badge>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="font-bold text-sm line-clamp-1">{product.name}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">{product.code}</p>
              <p className="mt-3 text-xl font-black text-primary">৳{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
