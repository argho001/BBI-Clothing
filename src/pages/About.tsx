import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, Award, History, Users, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const About = () => {
  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Hero Section - Upgraded with premium radial effects and removed overflow-hidden */}
        <section className="relative flex min-h-[60vh] items-center justify-center bg-slate-950 py-32 text-white text-center">
          <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.15),_transparent_50%)]"></div>
             <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_80%_70%,_rgba(244,63,94,0.1),_transparent_50%)]"></div>
             <div className="h-full w-full bg-slate-950/40 backdrop-blur-[2px]"></div>
          </div>
          <div className="container relative z-10 px-4">
            <ScrollReveal animation="slide-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Our Story</span>
              </div>
              <h1 className="mb-6 text-6xl font-black tracking-tighter md:text-8xl uppercase leading-[0.9]">
                আমাদের <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-rose-400 italic">গল্প</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl font-medium leading-relaxed">
                ২০২০ সাল থেকে BBI Clothing বাংলাদেশে এক্সপোর্ট কোয়ালিটি পোশাকের জগতে বিশ্বস্ততার সাথে কাজ করে যাচ্ছে। আমাদের লক্ষ্য প্রতিটি গ্রাহককে সেরা অভিজ্ঞতা প্রদান করা।
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats Section - Premium Glassmorphism & Fixed Clipping */}
        <section className="container relative z-20 mx-auto -mt-24 mb-32 px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {[
              { label: "বিক্রিত পণ্য", value: "৫০,০০০+", icon: Award, color: "blue" },
              { label: "খুশি গ্রাহক", value: "৩০,০০০+", icon: Users, color: "indigo" },
              { label: "অভিজ্ঞতা", value: "৮+ বছর", icon: History, color: "rose" },
              { label: "কোয়ালিটি চেক", value: "১০০%", icon: CheckCircle2, color: "emerald" },
            ].map((stat, i) => (
              <ScrollReveal key={i} animation="scale" delay={i * 0.1}>
                <div className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/80 p-10 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-primary/20 text-center dark:bg-slate-900/80">
                  <div className="absolute inset-x-0 -top-px h-px w-2/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-${stat.color}-500/10 text-${stat.color}-500 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className="h-10 w-10" />
                  </div>
                  <span className="text-4xl font-black tracking-tighter text-slate-900">{stat.value}</span>
                  <span className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Mission Section - Enhanced Layout */}
        <section className="container mx-auto px-4 py-32">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <ScrollReveal animation="slide-right">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Mission & Vision</h3>
                  <h2 className="text-5xl font-black tracking-tight uppercase leading-[1.1]">আমাদের লক্ষ্য ও <br/><span className="italic text-slate-400">দূরদৃষ্টি</span></h2>
                </div>
                <div className="space-y-6">
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    BBI Clothing-এর মূল লক্ষ্য হলো আন্তর্জাতিক মানের এক্সপোর্ট কোয়ালিটি পোশাক সাশ্রয়ী মূল্যে দেশের মানুষের কাছে পৌঁছে দেওয়া। আমরা বিশ্বাস করি, প্রতিটি মানুষেরই আরামদায়ক এবং প্রিমিয়াম পোশাক পরার অধিকার আছে।
                  </p>
                  <div className="border-l-4 border-primary/20 pl-6 py-2">
                    <p className="text-lg text-slate-500 leading-relaxed font-medium italic">
                      "আমাদের প্রতিটি পণ্য অত্যন্ত নিখুঁতভাবে তৈরি করা হয় এবং ১০০% কোয়ালিটি নিশ্চিত করার পর গ্রাহকের কাছে পাঠানো হয়।"
                    </p>
                  </div>
                </div>
                <div className="pt-6">
                  <Button asChild size="lg" className="group rounded-[2rem] px-12 h-16 text-xl font-black shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1">
                    <Link to="/shop" className="flex items-center gap-3">
                      কালেকশন দেখুন
                      <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="slide-left">
              <div className="relative">
                 <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-rose-500/20 rounded-[4rem] blur-2xl opacity-50"></div>
                 <div className="relative aspect-[4/5] rounded-[3.5rem] bg-slate-900 lg:aspect-square overflow-hidden shadow-2xl border-[12px] border-white dark:border-slate-800">
                    <img 
                       src="/assets/products/download-5.jpg" 
                       alt="Quality Craftsmanship" 
                       className="h-full w-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    />
                 </div>
                 <div className="absolute -bottom-10 -right-10 h-48 w-48 flex items-center justify-center rounded-[3rem] bg-slate-950 p-8 shadow-2xl border-4 border-white dark:border-slate-800 rotate-6 hover:rotate-0 transition-transform duration-500">
                    <div className="text-center">
                       <p className="text-5xl font-black text-white italic leading-none">১০০%</p>
                       <p className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">অরিজিনাল পণ্য</p>
                    </div>
                 </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Values - Modernized Cards */}
        <section className="bg-slate-950 px-4 py-32 text-white">
          <div className="container mx-auto text-center">
            <ScrollReveal>
              <h2 className="mb-20 text-xs font-black uppercase tracking-[0.5em] text-blue-400">Our Core Principles</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
               {[
                 { title: "সততা", desc: "আমরা যা দেখাই, তাই প্রদান করি। ১০০% অরিজিনাল এক্সপোর্ট কোয়ালিটি পণ্য।", bg: "blue" },
                 { title: "আরাম", desc: "আমাদের ফেব্রিকগুলো জলবায়ু অনুযায়ী আরামদায়ক এবং বাতাস চলাচলের উপযোগী।", bg: "indigo" },
                 { title: "স্থায়িত্ব", desc: "দীর্ঘস্থায়ী পণ্য যা বারবার ধোয়ার পরেও নতুনের মতো থাকে।", bg: "rose" },
               ].map((v, i) => (
                  <ScrollReveal key={i} animation="slide-up" delay={i * 0.2}>
                    <div className="group relative rounded-[3rem] bg-slate-900 p-16 shadow-2xl transition-all hover:-translate-y-2 border border-white/5 overflow-hidden">
                       <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-${v.bg}-500/10 blur-3xl group-hover:bg-${v.bg}-500/20 transition-colors`}></div>
                       <h3 className="relative z-10 mb-6 text-3xl font-black text-white">{v.title}</h3>
                       <p className="relative z-10 text-slate-400 font-medium leading-[1.8]">{v.desc}</p>
                    </div>
                  </ScrollReveal>
               ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
