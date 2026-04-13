import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const Contact = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-24">
        <ScrollReveal animation="slide-up">
          <div className="mb-20 text-center">
             <h1 className="text-4xl font-black md:text-7xl uppercase tracking-tighter">যোগাযোগ করুন</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground font-medium">
              আমাদের পণ্য বা অর্ডার সম্পর্কে কোনো প্রশ্ন থাকলে সরাসরি যোগাযোগ করুন। আমরা আপনাকে সাহায্য করতে সর্বদা প্রস্তুত।
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <ScrollReveal animation="slide-right">
            <div className="rounded-[3rem] border bg-card p-8 shadow-2xl md:p-16 border-primary/5">
              <h2 className="mb-10 text-3xl font-black">মেসেজ পাঠান</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="first-name" className="font-bold ml-2">প্রথম নাম</Label>
                    <Input id="first-name" placeholder="আপনার নাম" className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-medium focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="font-bold ml-2">ফোন নম্বর</Label>
                    <Input id="phone" placeholder="০১XXXXXXXXX" className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-medium focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="font-bold ml-2">ইমেইল (ঐচ্ছিক)</Label>
                  <Input id="email" type="email" placeholder="email@example.com" className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-medium focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="message" className="font-bold ml-2">আপনার মেসেজ</Label>
                  <Textarea id="message" placeholder="আমরা আপনাকে কীভাবে সাহায্য করতে পারি?" className="min-h-[160px] rounded-[2rem] bg-slate-50 border-none p-6 font-medium focus:ring-2 focus:ring-primary" />
                </div>
                <Button className="w-full rounded-full h-16 text-xl font-black shadow-2xl shadow-primary/20 transition-all active:scale-95">
                  <Send className="mr-3 h-6 w-6" /> মেসেজ পাঠান
                </Button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-12">
            <ScrollReveal animation="slide-left" delay={0.1}>
              <div>
                <h2 className="mb-10 text-3xl font-black">আমাদের তথ্য</h2>
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Phone className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-widest text-muted-foreground">ফোন করুন</p>
                      <p className="text-2xl font-black mt-1">+8801765568317</p>
                      <p className="text-sm text-muted-foreground font-medium">প্রতিদিন সকাল ১০টা - রাত ১০টা</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Mail className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-widest text-muted-foreground">ইমেইল করুন</p>
                      <p className="text-2xl font-black mt-1">support@bbiclothing.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-widest text-muted-foreground">ঠিকানা</p>
                      <p className="text-2xl font-black mt-1">মিরপুর-১২, ঢাকা, বাংলাদেশ</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-left" delay={0.2}>
              <div className="rounded-[3rem] bg-slate-900 p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                <h3 className="mb-6 text-xl font-black relative z-10">সোশ্যাল মিডিয়ায় যোগাযোগ</h3>
                <p className="mb-10 text-slate-400 font-medium relative z-10 leading-relaxed">দ্রুত উত্তরের জন্য আমাদের হোয়াটসঅ্যাপ বা মেসেঞ্জারে নক দিন।</p>
                <div className="flex flex-wrap gap-4 relative z-10">
                  <Button asChild variant="secondary" className="rounded-full h-14 px-8 font-black">
                    <a href="https://wa.me/8801765568317" target="_blank" rel="noreferrer">
                      <MessageCircle className="mr-3 h-5 w-5 text-green-500" /> WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="secondary" className="rounded-full h-14 px-8 font-black">
                    <a href="https://m.me/bbiclothing" target="_blank" rel="noreferrer">
                      <MessageCircle className="mr-3 h-5 w-5 text-blue-500" /> Messenger
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
