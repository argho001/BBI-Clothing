import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS, COMBOS, SIZES } from "@/data/products";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  Check,
  ChevronRight,
  Heart,
  Share2,
  Lock
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Trousers": "আমাদের এই ট্রাউজারগুলো প্রিমিয়াম চায়না ডবি ফেব্রিক দিয়ে তৈরি। এটি অত্যন্ত হালকা এবং আরামদায়ক, যা দীর্ঘক্ষণ পরে থাকলেও কোনো অস্বস্তি সৃষ্টি করে না। এক্সপোর্ট কোয়ালিটির এই ট্রাউজারগুলো ক্যাজুয়াল এবং সেমি-ফরমাল উভয় লুকের জন্যই পারফেক্ট। এর কালার গ্যারান্টি এবং ফিনিশিং আপনাকে দিবে প্রিমিয়াম এক অভিজ্ঞতা।",
  "Premium": "প্রিমিয়াম কালেকশনের এই পোশাকগুলো আমাদের এক্সক্লুসিভ ডিজাইন। ফ্যাব্রিকেশন থেকে শুরু করে সেলাই পর্যন্ত প্রতিটি ধাপে সর্বোচ্চ মান বজায় রাখা হয়েছে। এটি মূলত যারা স্টাইল এবং কমফোর্ট দুটোর ওপরই সর্বোচ্চ গুরুত্ব দেন তাদের জন্য তৈরি।",
  "Casual": "প্রতিদিনের ব্যবহারের জন্য আমাদের ক্যাজুয়াল কালেকশন একদম উপযুক্ত। টেকসই ফেব্রিক এবং আধুনিক ফিটিং নিশ্চিত করবে আপনার স্মার্ট লুক। এটি সহজেই ধোয়া যায় এবং দীর্ঘস্থায়ী।",
  "Combos": "আমাদের কম্বো অফারগুলো মূলত আপনার সাশ্রয়ের কথা চিন্তা করে তৈরি। দুটি প্রিমিয়াম পণ্য একসাথে কিনুন এবং বিশেষ ছাড় উপভোগ করুন।",
  "default": "প্রিমিয়াম এক্সপোর্ট কোয়ালিটি সম্পন্ন এই পণ্যটি আপনার সংগ্রহে রাখতে পারেন। সেরা ফেব্রিক এবং চমৎকার ফিনিশিং নিশ্চিত করে BBI Clothing।"
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateQty, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id) || COMBOS.find((c) => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <h2 className="text-3xl font-black">দুঃখিত! পন্যটি পাওয়া যায়নি।</h2>
        <Button asChild className="rounded-full">
          <Link to="/shop">শপে ফিরে যান</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    updateQty(product.id, quantity, true);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    updateQty(product.id, quantity, true);
    setCartOpen(true);
  };

  const description = CATEGORY_DESCRIPTIONS[product.category] || CATEGORY_DESCRIPTIONS.default;
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border bg-card shadow-2xl">
              <img 
                src={"img" in product ? product.img : "/placeholder.svg"} 
                alt={product.name} 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute left-6 top-6">
                <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-[10px] font-black tracking-[0.2em] px-4 py-1.5 uppercase">
                  {product.category}
                </Badge>
              </div>
              <button className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all hover:bg-white hover:text-rose-500">
                <Heart className="h-6 w-6" />
              </button>
            </div>
            
            {/* Thumbnail Placeholder (if multiple images existed, we'd loop here) */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl border bg-slate-50 overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  <img 
                    src={"img" in product ? product.img : "/placeholder.svg"} 
                    alt={`${product.name} ${i}`} 
                    className="h-full w-full object-cover opacity-60 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">(১২৫+ রিভিউ)</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight md:text-5xl">{product.name}</h1>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">পণ্য কোড: {product.code || 'N/A'}</p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-primary">৳{product.price}</span>
                <span className="text-lg font-bold text-muted-foreground line-through opacity-50">৳{product.price + 200}</span>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/5 font-black uppercase tracking-tighter">সাশ্রয় ৳২০০</Badge>
              </div>

              <p className="text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>

              <Separator className="bg-slate-100" />

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black uppercase tracking-widest">সাইজ বেছে নিন:</p>
                  <button className="text-[10px] font-black text-primary uppercase underline tracking-widest">সাইজ গাইড</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {SIZES.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`h-12 min-w-[3rem] rounded-xl border-2 font-black transition-all ${
                        selectedSize === size.size
                          ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "border-slate-100 bg-slate-50 text-slate-600 hover:border-primary/50"
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 rounded-2xl border bg-slate-50 p-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-lg font-black">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className={`flex-1 h-14 rounded-2xl border-2 font-black text-base transition-all ${isAdded ? "border-emerald-500 text-emerald-600 bg-emerald-50" : ""}`}
                    onClick={handleAddToCart}
                  >
                    {isAdded ? (
                      <><Check className="mr-2 h-5 w-5" /> কার্টে যোগ হয়েছে</>
                    ) : (
                      <><ShoppingCart className="mr-2 h-5 w-5" /> কার্টে যোগ করুন</>
                    )}
                  </Button>
                </div>

                <div className="relative group/buy">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl blur opacity-20 group-hover/buy:opacity-40 transition duration-500"></div>
                  <Button 
                    onClick={handleBuyNow}
                    size="lg" 
                    className="relative w-full h-16 rounded-2xl text-xl font-black shadow-2xl hover:scale-[1.01] active:scale-[0.98] transition-all"
                  >
                    এখনই অর্ডার করুন
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  <Lock className="h-3 w-3" />
                  ব্যক্তিগত তথ্য সুরক্ষিত
                </div>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] font-black leading-tight uppercase tracking-tighter">সেরা কোয়ালিটি<br/>নিশ্চিত</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] font-black leading-tight uppercase tracking-tighter">দ্রুততম<br/>ডেলিভারি</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                    <RotateCcw className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] font-black leading-tight uppercase tracking-tighter">৭ দিন সহজ<br/>রিটার্ন</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <div className="mt-24">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-14 gap-8">
              <TabsTrigger 
                value="details" 
                className="rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                বিস্তারিত বিবরণ
              </TabsTrigger>
              <TabsTrigger 
                value="sizing" 
                className="rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                সাইজ গাইড
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-black uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
              >
                ডেলিভারি তথ্য
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-10">
              <div className="max-w-3xl space-y-6">
                <h3 className="text-2xl font-black">বিবরণ</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  BBI Clothing আপনাদের জন্য নিয়ে এসেছে সেরা মানের এক্সপোর্ট কোয়ালিটি কালেকশন। আমাদের প্রতিটি পণ্য অত্যন্ত যত্ন সহকারে চেক করা হয় যাতে আপনি পান সেরা অভিজ্ঞতা। 
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "১০০% কটন/ডবি ফেব্রিক",
                    "কালার গ্যারান্টি",
                    "উন্নতমানের সেলাই",
                    "স্টাইলিশ ও আরামদায়ক",
                    "প্রিমিয়াম ফিনিশিং",
                    "মেশিন ওয়াশযোগ্য"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-muted-foreground font-bold">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600">
                        <Check className="h-3 w-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="sizing" className="py-10">
               <div className="max-w-2xl">
                 <h3 className="text-2xl font-black mb-6">আমাদের সাইজ চার্ট</h3>
                 <div className="overflow-hidden rounded-2xl border shadow-xl">
                    <table className="w-full text-left">
                      <thead className="bg-slate-950 text-white">
                        <tr>
                          <th className="p-4 font-black">সাইজ</th>
                          <th className="p-4 font-black">কোমর (ইঞ্চি)</th>
                          <th className="p-4 font-black">লম্বা (ইঞ্চি)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {SIZES.map((s) => (
                          <tr key={s.size} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-lg font-black">{s.size}</td>
                            <td className="p-4 font-bold text-muted-foreground">{s.waist}</td>
                            <td className="p-4 font-bold text-muted-foreground">{s.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
                 <p className="mt-6 text-sm text-muted-foreground italic font-medium">
                   * সাইজ নিয়ে বিভ্রান্তি থাকলে সরাসরি আমাদের হোয়াটসঅ্যাপে নক দিন।
                 </p>
               </div>
            </TabsContent>
            <TabsContent value="shipping" className="py-10">
               <div className="max-w-2xl space-y-8">
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-2">শিপিং খরচ</h4>
                      <p className="text-muted-foreground font-medium">ঢাকার ভিতরে ৬০ টাকা, ঢাকার বাইরে ১২০ টাকা। ২,০০০ টাকার বেশি অর্ডারে ফ্রি ডেলিভারি!</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                      <RotateCcw className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-2">রিটার্ন পলিসি</h4>
                      <p className="text-muted-foreground font-medium">পণ্য হাতে পাওয়ার পর যদি কোনো সমস্যা থাকে তবে ৭ দিনের মধ্যে পরিবর্তনের সুযোগ রয়েছে।</p>
                    </div>
                  </div>
               </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-24 border-t">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary">আপনার পছন্দ হতে পারে</h2>
                <h3 className="mt-2 text-4xl font-black">সম্পর্কিত পণ্য</h3>
              </div>
              <Button asChild variant="ghost" className="font-black uppercase tracking-widest text-xs">
                <Link to="/shop">সবগুলো দেখুন</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {relatedProducts.map((p) => (
                <Link 
                  key={p.id} 
                  to={`/product/${p.id}`}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border bg-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="font-bold text-sm line-clamp-1 mb-2">{p.name}</h4>
                    <p className="text-xl font-black text-primary">৳{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
