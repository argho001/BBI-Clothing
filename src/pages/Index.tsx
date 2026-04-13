import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS, SIZES } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, ShieldCheck, Truck, RotateCcw, Star, Phone, MessageCircle, Play, Minus, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const Index = () => {
  const { cart, updateQty } = useCart();
  const orderRef = useRef<HTMLDivElement>(null);

  const scrollToOrder = () => {
    orderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const FACEBOOK_VIDEOS = [
    {
      url: "https://www.facebook.com/watch/?v=1501443084931734",
      title: "প্রিমিয়াম কোয়ালিটি রিভিউ ১"
    },
    {
      url: "https://www.facebook.com/watch/?v=1088978070110059",
      title: "প্রিমিয়াম কোয়ালিটি রিভিউ ২"
    },
    {
      url: "https://fb.watch/GrogzskXmu/",
      title: "প্রিমিয়াম কোয়ালিটি রিভিউ ৩"
    }
  ];

  return (
    <PageTransition>
      <div className="flex flex-col overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-slate-950 px-4 pt-20 text-white">
          <div className="absolute inset-0 z-0">
            <div className="absolute h-full w-full bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.2),_transparent_50%)]"></div>
            <img
              src="/assets/hero_image.jpeg"
              alt="Premium Casual Wear"
              className="h-full w-full object-cover opacity-70"
            />
          </div>

          <div className="container relative z-10 mx-auto">
            <ScrollReveal animation="slide-up">
              <div className="max-w-3xl space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400">এক্সপোর্ট কোয়ালিটি গ্যারান্টি</span>
                </div>

                <h1 className="text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl">
                  নতুন স্টাইল <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500 italic">কালেকশন</span>
                </h1>

                <p className="max-w-lg text-lg text-slate-400 md:text-xl">
                  অরিজিনাল এক্সপোর্টেড গেস ট্রাউজার এবং প্রিমিয়াম ক্লোথিং। ১০০% চায়না ডবি ফেব্রিক — হালকা ও আরামদায়ক।
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button asChild size="lg" className="h-14 rounded-full px-10 text-lg font-black shadow-2xl shadow-blue-500/20">
                    <Link to="/shop">কালেকশন দেখুন</Link>
                  </Button>
                  <Button onClick={scrollToOrder} variant="outline" size="lg" className="h-14 rounded-full border-2 border-white/20 px-10 text-lg font-black text-blue-400 hover:bg-white hover:text-slate-950">
                    অফার দেখুন
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-10 text-slate-500">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">১০০%</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">কালার গ্যারান্টি</span>
                  </div>
                  <div className="h-10 w-px bg-slate-800"></div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">৪.৯/৫</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">কাস্টমার রেটিং</span>
                  </div>
                  <div className="h-10 w-px bg-slate-800"></div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">২৪ঘণ্টা</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">দ্রুত ডেলিভারি</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="container mx-auto px-4 py-24">
          <ScrollReveal>
            <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
              <div className="text-center md:text-left">
                <h2 className="text-xs font-black uppercase tracking-widest text-primary">লেটেস্ট কালেকশন</h2>
                <h3 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">আমাদের পছন্দের আইটেম</h3>
              </div>
              <Button asChild variant="link" className="group text-lg font-bold">
                <Link to="/shop">
                  সবগুলো দেখুন <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {PRODUCTS.slice(0, 8).map((p, idx) => {
              const qty = cart[p.id] || 0;
              return (
                <ScrollReveal key={p.id} animation="scale" delay={idx * 0.1}>
                  <div className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border bg-card transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-primary/20">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <Link to={`/product/${p.id}`} className="block h-full w-full">
                        <img
                          src={p.img}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />

                        {/* Top Badges */}
                        <div className="absolute left-4 top-4 flex flex-col gap-2">
                          <span className="rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white shadow-xl">
                            Premium
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <Link to={`/product/${p.id}`} className="text-left mb-4 block">
                        <h4 className="font-bold text-sm md:text-base line-clamp-1 mb-2">
                          {p.name} <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-1">({p.code})</span>
                        </h4>

                        <div className="flex items-center justify-start gap-2">
                          <span className="text-xl font-black text-primary">৳{p.price}</span>
                          <span className="text-[10px] text-muted-foreground line-through opacity-50">৳{p.price + 200}</span>
                        </div>
                      </Link>

                      {/* Action Buttons */}
                      <div className="mt-auto flex gap-2">
                        <Button asChild className="flex-1 rounded-2xl h-11 font-black text-sm uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                          <Link to={`/product/${p.id}`}>অর্ডার দিন</Link>
                        </Button>
                        
                        {qty > 0 ? (
                          <div className="flex w-1/4 min-w-[3rem] items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-2">
                            <button onClick={(e) => { e.preventDefault(); updateQty(p.id, -1); }} className="text-primary hover:text-primary/70 p-1">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-black text-primary">{qty}</span>
                            <button onClick={(e) => { e.preventDefault(); updateQty(p.id, 1); }} className="text-primary hover:text-primary/70 p-1">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              updateQty(p.id, 1, true);
                            }} 
                            variant="outline" 
                            className="w-1/4 min-w-[3rem] h-11 rounded-2xl border-2 border-primary/20 text-primary hover:bg-primary/10 px-0 shadow-sm"
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Facebook Video Section */}
        <section className="bg-slate-50 py-24">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-primary">ভিডিও রিভিউ</h3>
              <h4 className="mb-12 text-4xl font-black">আমাদের কাজ দেখে নিন</h4>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {FACEBOOK_VIDEOS.map((video, index) => (
                <ScrollReveal key={index} animation="slide-up" delay={index * 0.1}>
                  <div className="group relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl transition-transform hover:-translate-y-2">
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=0&width=500`}
                      className="absolute inset-0 h-full w-full border-none"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen={true}
                    ></iframe>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-6 text-left pointer-events-none">
                      <p className="text-sm font-bold text-white">{video.title}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-950 py-24 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <ScrollReveal delay={0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h4 className="mb-4 text-2xl font-bold">সেরা ফেব্রিক</h4>
                  <p className="text-slate-400">আমরা ১০০% চায়না ডবি ফেব্রিক ব্যবহার করি, যা দীর্ঘস্থায়ী এবং আরামদায়ক.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
                    <Truck className="h-8 w-8" />
                  </div>
                  <h4 className="mb-4 text-2xl font-bold">দ্রুত ডেলিভারি</h4>
                  <p className="text-slate-400">ঢাকার ভিতরে ২৪-৪৮ ঘণ্টা এবং বাইরে ৭২ ঘণ্টার মধ্যে ডেলিভারি।</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <RotateCcw className="h-8 w-8" />
                  </div>
                  <h4 className="mb-4 text-2xl font-bold">সহজ রিটার্ন</h4>
                  <p className="text-slate-400">সাইজ সমস্যা বা অন্য কোনো কারণে সহজে পণ্য পরিবর্তনের সুযোগ।</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Size Guide */}
        <section ref={orderRef} className="container mx-auto px-4 py-24">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="lg:w-1/2">
              <ScrollReveal animation="slide-right">
                <h3 className="text-4xl font-black">সঠিক সাইজ বেছে নিন</h3>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  আমাদের ট্রাউজারগুলো ইন্টারন্যাশনাল সাইজ অনুযায়ী তৈরি। আপনি যদি সাইজ নিয়ে নিশ্চিত না হন, তবে আমাদের সাথে হোয়াটসঅ্যাপে যোগাযোগ করুন।
                </p>
                <div className="mt-10 flex gap-4">
                  <Button asChild variant="outline" className="rounded-full shadow-lg">
                    <a href="https://wa.me/8801765568317"><MessageCircle className="mr-2 h-5 w-5 text-green-500" /> হোয়াটসঅ্যাপে জানুন</a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:w-1/2">
              <ScrollReveal animation="slide-left">
                <div className="overflow-hidden rounded-3xl border shadow-2xl">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-950 text-white hover:bg-slate-950">
                        <TableHead className="font-bold text-white">সাইজ</TableHead>
                        <TableHead className="font-bold text-white">কোমর (ইঞ্চি)</TableHead>
                        <TableHead className="font-bold text-white">লম্বা (ইঞ্চি)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SIZES.map((s) => (
                        <TableRow key={s.size} className="hover:bg-slate-50">
                          <TableCell className="text-lg font-black">{s.size}</TableCell>
                          <TableCell className="text-slate-600 font-bold">{s.waist}</TableCell>
                          <TableCell className="text-slate-600 font-bold">{s.length}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="container mx-auto px-4 pb-24">
          <ScrollReveal animation="scale">
            <div className="relative overflow-hidden rounded-[4rem] bg-blue-600 px-8 py-20 text-center text-white">
              <h2 className="relative z-10 text-4xl font-black md:text-6xl uppercase">অর্ডার করতে চান?</h2>
              <p className="relative z-10 mx-auto mt-6 max-w-xl text-lg text-blue-100 font-medium">
                ৩০,০০০+ খুশি গ্রাহকের তালিকায় আপনিও যোগ দিন।
              </p>
              <Button asChild size="lg" variant="secondary" className="relative z-10 mt-10 h-16 rounded-full px-12 text-xl font-black shadow-2xl">
                <Link to="/shop">শপিং শুরু করুন</Link>
              </Button>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
