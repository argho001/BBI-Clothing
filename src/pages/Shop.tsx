import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Plus, Minus, Filter, ChevronDown, Search, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const Shop = () => {
  const { cart, updateQty } = useCart();
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  const displayedItems = useMemo(() => {
    let items = PRODUCTS.filter(item =>
      filter === "All" ? true : item.category === filter
    );
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q)
      );
    }
    if (sort === "asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "desc") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [filter, search, sort]);

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const categoryLabels: Record<string, string> = {
    "All": "সবগুলো",
    "Trousers": "ট্রাউজার",
    "Combos": "কম্বো অফার",
    "Premium": "প্রিমিয়াম কালেকশন",
    "Casual": "ক্যাজুয়াল",
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <header className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <ScrollReveal animation="slide-right">
            <h1 className="text-4xl font-black tracking-tight md:text-6xl uppercase">আমাদের শপ</h1>
            <p className="mt-2 text-muted-foreground font-medium">{displayedItems.length} টি পণ্য পাওয়া গেছে</p>
          </ScrollReveal>
        </header>

        {/* Search + Filters */}
        <ScrollReveal animation="slide-up">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="পণ্যের নাম বা কোড দিয়ে খুঁজুন..."
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 font-medium text-base shadow-sm"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-2xl px-6 font-bold shadow-sm whitespace-nowrap">
                  <Filter className="mr-2 h-4 w-4" />
                  {categoryLabels[filter] || filter}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px] rounded-2xl p-2 shadow-2xl">
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`rounded-xl px-4 py-3 font-bold cursor-pointer hover:bg-primary/10 ${filter === cat ? "text-primary" : ""}`}
                  >
                    {categoryLabels[cat] || cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-2xl px-6 font-bold shadow-sm whitespace-nowrap">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  {sort === "asc" ? "সস্তা আগে" : sort === "desc" ? "দামি আগে" : "ক্রম"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] rounded-2xl p-2 shadow-2xl">
                <DropdownMenuItem onClick={() => setSort("default")} className="rounded-xl px-4 py-3 font-bold cursor-pointer hover:bg-primary/10">ডিফল্ট</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("asc")} className="rounded-xl px-4 py-3 font-bold cursor-pointer hover:bg-primary/10">দাম: কম থেকে বেশি</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort("desc")} className="rounded-xl px-4 py-3 font-bold cursor-pointer hover:bg-primary/10">দাম: বেশি থেকে কম</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ScrollReveal>

        <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
          <AnimatePresence>
            {displayedItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="group flex flex-col overflow-hidden rounded-[2.5rem] border bg-card transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-primary/20">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Link to={`/product/${item.id}`} className="block h-full w-full">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      {/* Badges */}
                      <div className="absolute left-6 top-6 flex flex-col gap-2">
                        {item.category === "Combos" && (
                          <span className="rounded-full bg-primary px-4 py-1.5 text-[10px] font-black text-primary-foreground shadow-lg uppercase tracking-widest">
                            অফার
                          </span>
                        )}
                        <span className="rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white shadow-xl">
                          Premium Quality
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <Link to={`/product/${item.id}`} className="text-left mb-4 block">
                      <h4 className="font-bold text-sm md:text-base line-clamp-1 mb-2">
                        {item.name} <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-1">({item.code})</span>
                      </h4>

                      <div className="flex items-center justify-start gap-2">
                        <span className="text-xl font-black text-primary">৳{item.price}</span>
                        <span className="text-[10px] text-muted-foreground line-through opacity-50">৳{item.price + 200}</span>
                      </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="mt-auto flex gap-2">
                      <Button asChild className="flex-1 rounded-2xl h-12 font-black text-sm uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                        <Link to={`/product/${item.id}`}>অর্ডার দিন</Link>
                      </Button>
                      
                      {(cart[item.id] || 0) > 0 ? (
                        <div className="flex w-1/4 min-w-[3.5rem] items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-2">
                          <button onClick={(e) => { e.preventDefault(); updateQty(item.id, -1); }} className="text-primary hover:text-primary/70 p-1">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-black text-primary">{cart[item.id]}</span>
                          <button onClick={(e) => { e.preventDefault(); updateQty(item.id, 1); }} className="text-primary hover:text-primary/70 p-1">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <Button 
                          onClick={(e) => {
                            e.preventDefault();
                            updateQty(item.id, 1, true);
                          }} 
                          variant="outline" 
                          className="w-1/4 min-w-[3.5rem] h-12 rounded-2xl border-2 border-primary/20 text-primary hover:bg-primary/10 px-0 shadow-sm"
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {displayedItems.length === 0 && (
          <ScrollReveal>
            <div className="flex min-h-[400px] flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground opacity-30" />
              <p className="text-2xl font-black text-muted-foreground">কোনো পণ্য পাওয়া যায়নি।</p>
              <Button
                variant="link"
                onClick={() => { setFilter("All"); setSearch(""); setSort("default"); }}
                className="mt-4 font-bold text-primary"
              >
                সব পণ্য দেখুন
              </Button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </PageTransition>
  );
};

export default Shop;
