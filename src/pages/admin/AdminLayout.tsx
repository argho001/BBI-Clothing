import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard, ShoppingBag, Package, LogOut, Menu, X, ChevronRight, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_PASSWORD = "bbiadmin2024"; // Simple client-side guard — replace with real auth later

const NAV_ITEMS = [
  { path: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard, exact: true },
  { path: "/admin/orders", label: "অর্ডার", icon: ShoppingBag },
  { path: "/admin/products", label: "পণ্য তালিকা", icon: Package },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("bbi_admin_auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("bbi_admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("bbi_admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary mx-auto">
              <BarChart3 className="h-9 w-9" />
            </div>
            <h1 className="text-3xl font-black text-white">Admin Panel</h1>
            <p className="mt-2 text-slate-400 font-medium">BBI Clothing ব্যবস্থাপনা</p>
          </div>
          <form onSubmit={handleLogin} className="rounded-[2rem] border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <div className="mb-5">
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-400">পাসওয়ার্ড</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="এডমিন পাসওয়ার্ড লিখুন"
                className="h-12 w-full rounded-xl border border-white/10 bg-slate-800 px-4 font-medium text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
              />
            </div>
            {error && <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-bold text-red-400">{error}</p>}
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-primary font-black text-base text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-primary/30"
            >
              প্রবেশ করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 shadow-2xl transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex h-20 items-center gap-4 border-b border-white/10 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-black text-lg">B</div>
          <div>
            <p className="font-black text-white text-lg leading-none">BBI Admin</p>
            <p className="text-xs text-slate-400 font-medium">ব্যবস্থাপনা প্যানেল</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="ml-auto text-slate-400 hover:text-white lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-4">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.label}
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            লগ আউট
          </button>
          <Link
            to="/"
            target="_blank"
            className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-400 transition-all hover:bg-white/5 hover:text-white"
          >
            <Package className="h-5 w-5" />
            ওয়েবসাইট দেখুন ↗
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            {NAV_ITEMS.find((n) =>
              n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path)
            )?.label ?? "Admin"}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-black text-primary text-sm">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
