import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook, Instagram, Phone, MessageCircle, MapPin, Mail,
  ShieldCheck, Truck, RotateCcw, ArrowRight, Youtube, Zap
} from "lucide-react";

const QUICK_LINKS = [
  { label: "হোম", to: "/" },
  { label: "শপ কালেকশন", to: "/shop" },
  { label: "আমাদের সম্পর্কে", to: "/about" },
  { label: "যোগাযোগ", to: "/contact" },
  { label: "অর্ডার ট্র্যাক করুন", to: "/track-order" },
];

const ACCOUNT_LINKS = [
  { label: "আমার অ্যাকাউন্ট", to: "/account" },
  { label: "আমার অর্ডার", to: "/account" },
  { label: "লগইন / নিবন্ধন", to: "/login" },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "১০০% অরিজিনাল", color: "text-blue-400" },
  { icon: Truck, label: "দ্রুত ডেলিভারি", color: "text-primary" },
  { icon: RotateCcw, label: "৭ দিনের রিটার্ন", color: "text-emerald-400" },
];

const FooterExpanded = () => {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-rose-500/5 blur-[100px]" />

      {/* Trust Strip */}
      <div className="relative border-b border-white/5">
        <div className="container mx-auto grid grid-cols-1 divide-y divide-white/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 px-4">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center justify-center gap-3 py-5">
              <b.icon className={`h-5 w-5 ${b.color}`} />
              <span className="text-sm font-black text-slate-300">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* Brand column — wider */}
          <div className="flex flex-col gap-7 lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/assets/logo.jpg" alt="BBI Clothing" className="h-11 w-auto rounded-xl shadow-lg shadow-primary/20" />
              <span className="text-2xl font-black tracking-tight text-white">BBI Clothing</span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-slate-400 font-medium">
              প্রিমিয়াম এক্সপোর্ট কোয়ালিটি পোশাকের বিশ্বস্ত অনলাইন শপ। ২০২০ সাল থেকে
              <span className="font-bold text-slate-300"> ৩০,০০০+ সন্তুষ্ট গ্রাহককে</span> সেবা দিয়ে আসছি।
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank" rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 hover:-translate-y-1"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank" rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400 hover:-translate-y-1"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank" rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 hover:-translate-y-1"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/8801765568317"
                target="_blank" rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-7 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">পেজসমূহ</h4>
            <ul className="flex flex-col gap-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm font-bold text-slate-400 transition-all hover:text-primary"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h4 className="mb-7 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">অ্যাকাউন্ট</h4>
            <ul className="flex flex-col gap-4">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm font-bold text-slate-400 transition-all hover:text-primary"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + WhatsApp CTA */}
          <div className="lg:col-span-4">
            <h4 className="mb-7 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">যোগাযোগ করুন</h4>
            <ul className="flex flex-col gap-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-slate-400 font-bold">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                মিরপুর-১২, ঢাকা, বাংলাদেশ
              </li>
              <li>
                <a href="tel:+8801765568317" className="flex items-center gap-3 text-sm text-slate-400 font-bold transition-colors hover:text-primary">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  +880 1765-568317
                </a>
              </li>
              <li>
                <a href="mailto:support@bbiclothing.com" className="flex items-center gap-3 text-sm text-slate-400 font-bold transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  support@bbiclothing.com
                </a>
              </li>
            </ul>

            {/* WhatsApp quick CTA */}
            <a
              href="https://wa.me/8801765568317"
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3.5 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/15 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-xs font-black text-emerald-400">WhatsApp-এ মেসেজ করুন</p>
                <p className="text-[10px] font-medium text-emerald-500/70">সাথে সাথে উত্তর পাবেন</p>
              </div>
              <ArrowRight className="ml-1 h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Order tracking quick access */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03]">
          <div className="flex flex-col items-center justify-between gap-4 px-8 py-7 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-black text-white">আপনার অর্ডার নিয়ে চিন্তিত?</p>
                <p className="text-sm text-slate-400 font-medium">অর্ডার আইডি দিয়ে এখনই ট্র্যাক করুন</p>
              </div>
            </div>
            <Link
              to="/track-order"
              className="group flex shrink-0 items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-black text-primary transition-all hover:bg-primary/20 hover:-translate-y-0.5"
            >
              অর্ডার ট্র্যাক করুন
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-10 sm:flex-row">
          <p className="text-xs font-bold text-slate-600">
            © {new Date().getFullYear()} BBI Clothing. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["প্রাইভেসি পলিসি", "শর্তাবলী", "রিটার্ন পলিসি"].map((item) => (
              <span key={item} className="cursor-pointer text-xs font-bold text-slate-600 transition-colors hover:text-primary">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterExpanded;
