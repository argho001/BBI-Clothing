import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, Phone, MessageCircle, User, LogOut, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartSheet from "./CartSheet";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "হোম", path: "/" },
    { name: "শপ", path: "/shop" },
    { name: "আমাদের সম্পর্কে", path: "/about" },
    { name: "যোগাযোগ", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast.success("সফলভাবে লগআউট হয়েছেন।");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.jpg" alt="BBI Clothing" className="h-8 w-auto rounded-sm md:h-10 text-primary" />
          <span className="hidden text-xl font-black tracking-tight text-primary sm:inline-block">
            BBI Clothing
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold transition-colors hover:text-primary ${
                isActive(link.path) ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* User account button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl">
                <div className="px-3 py-3 mb-1">
                  <p className="font-black text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground font-medium">{user.phone}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl font-bold cursor-pointer hover:bg-primary/10 hover:text-primary">
                  <Link to="/account" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> আমার অ্যাকাউন্ট
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl font-bold cursor-pointer hover:bg-primary/10 hover:text-primary">
                  <Link to="/account" className="flex items-center gap-2" onClick={() => {}}>
                    <Package className="h-4 w-4" /> আমার অর্ডার
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl font-bold cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" /> লগআউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10"
            >
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10 relative group"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-lg font-bold transition-colors hover:text-primary ${
                        isActive(link.path) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  {user ? (
                    <>
                      <Link to="/account" className="flex items-center gap-2 text-base font-bold hover:text-primary">
                        <User className="h-4 w-4 text-primary" /> আমার অ্যাকাউন্ট
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-2 text-base font-bold text-red-500 hover:text-red-600">
                        <LogOut className="h-4 w-4" /> লগআউট
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="flex items-center gap-2 text-base font-bold text-primary hover:underline">
                      <User className="h-4 w-4" /> লগইন / নিবন্ধন
                    </Link>
                  )}
                  <hr className="my-2" />
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">যোগাযোগ করুন</p>
                    <a href="tel:+8801765568317" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="h-4 w-4 text-primary" /> +8801765568317
                    </a>
                    <a href="https://wa.me/8801765568317" className="flex items-center gap-2 text-sm font-medium">
                      <MessageCircle className="h-4 w-4 text-green-500" /> WhatsApp
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950 pt-20 animate-in fade-in duration-300">
          <div className="container max-w-2xl px-4 animate-in slide-in-from-top-10 duration-500">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="আপনার পছন্দের পোশাক খুঁজুন..."
                  className="h-14 w-full rounded-2xl border-none bg-background shadow-2xl pl-12 pr-4 text-lg outline-none ring-2 ring-primary/20 focus:ring-primary"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const q = (e.target as HTMLInputElement).value;
                      if (q) { navigate(`/shop?q=${q}`); setIsSearchOpen(false); }
                    }
                  }}
                />
              </div>
              <Button variant="destructive" size="icon" className="rounded-full h-14 w-14 shadow-2xl" onClick={() => setIsSearchOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              <p className="col-span-full text-xs font-black uppercase tracking-[0.2em] text-white/70">জনপ্রিয় সার্চ</p>
              {["গেস ট্রাউজার", "এক্সপোর্ট কোয়ালিটি", "কম্বো অফার", "চায়না ডবি"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => { navigate(`/shop`); setIsSearchOpen(false); }}
                  className="rounded-xl bg-slate-900 border border-white/5 px-4 py-3 text-left text-sm text-white font-bold transition hover:bg-primary hover:text-white hover:border-primary"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <CartSheet />
    </nav>
  );
};

export default Navbar;
