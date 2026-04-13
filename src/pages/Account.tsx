import React, { useEffect, useState } from "react";
import { getAllOrders, type Order } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag, User, LogOut, Package, MapPin, ChevronRight,
  Phone, Mail, Edit3, Check, X, Loader2, Truck
} from "lucide-react";
import { updateProfile } from "@/lib/auth";
import { toast } from "sonner";

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};
const STATUS_BN: Record<string, string> = {
  pending: "পেন্ডিং", processing: "প্রক্রিয়াজাত",
  shipped: "শিপড", delivered: "ডেলিভারড", cancelled: "বাতিল",
};
const NAV_ITEMS = [
  { label: "অ্যাকাউন্ট ওভারভিউ", section: "overview", icon: User },
  { label: "আমার অর্ডার", section: "orders", icon: ShoppingBag },
  { label: "প্রোফাইল সম্পাদনা", section: "profile", icon: Edit3 },
];

const Account = () => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Profile edit state
  const [editName, setEditName] = useState(user?.name ?? "");
  const [editEmail, setEditEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    getAllOrders().then((all) => {
      // Filter orders belonging to this user's phone number
      setOrders(all.filter((o) => o.phone === user.phone));
      setLoading(false);
    });
  }, [user, navigate]);

  useEffect(() => {
    setEditName(user?.name ?? "");
    setEditEmail(user?.email ?? "");
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success("সফলভাবে লগআউট হয়েছেন।");
    navigate("/");
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    await updateProfile(user.id, { name: editName, email: editEmail });
    refreshUser();
    setSaving(false);
    toast.success("প্রোফাইল আপডেট হয়েছে!");
  };

  if (!user) return null;

  const totalSpent = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* ── Sidebar ─────────── */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-2">
            {/* User card */}
            <div className="rounded-[2rem] border bg-card p-6 shadow-sm text-center mb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-black">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <p className="font-black text-lg">{user.name}</p>
              <p className="text-sm text-muted-foreground font-medium">{user.phone}</p>
            </div>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                onClick={() => setActiveSection(item.section)}
                className={`flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-black transition-all ${
                  activeSection === item.section
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {activeSection === item.section && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-black text-muted-foreground transition-all hover:bg-red-50 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" /> লগআউট
            </button>
          </div>
        </aside>

        {/* ── Main content ──────── */}
        <main className="lg:col-span-3 space-y-6">

          {/* ── Overview ── */}
          {activeSection === "overview" && (
            <>
              <div>
                <h1 className="text-3xl font-black tracking-tight">স্বাগতম, {user.name}!</h1>
                <p className="mt-1 text-muted-foreground font-medium">আপনার অ্যাকাউন্টের সারসংক্ষেপ</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { label: "মোট অর্ডার", value: orders.length, icon: Package, color: "text-primary bg-primary/10" },
                  { label: "মোট ব্যয়", value: `৳${totalSpent}`, icon: ShoppingBag, color: "text-indigo-600 bg-indigo-100" },
                  { label: "সক্রিয় অর্ডার", value: orders.filter(o => !["delivered","cancelled"].includes(o.status)).length, icon: Truck, color: "text-emerald-600 bg-emerald-100" },
                ].map((card) => (
                  <div key={card.label} className="rounded-[2rem] border bg-card p-6 shadow-sm">
                    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${card.color}`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{card.label}</p>
                    <p className="mt-1 text-3xl font-black">{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="rounded-[2rem] border bg-card shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b px-6 py-5">
                  <h2 className="font-black text-lg">সাম্প্রতিক অর্ডার</h2>
                  <button onClick={() => setActiveSection("orders")} className="text-sm font-black text-primary hover:underline">সব দেখুন</button>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <ShoppingBag className="mb-4 h-10 w-10 text-muted-foreground opacity-30" />
                    <p className="font-bold">এখনো কোনো অর্ডার নেই</p>
                    <Button asChild variant="link" className="font-black mt-2"><Link to="/shop">শপিং শুরু করুন</Link></Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.orderId} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="font-black text-primary">{order.orderId}</p>
                          <p className="text-sm text-muted-foreground">{order.items.length} টি পণ্য · ৳{order.total}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${STATUS_BADGE[order.status]}`}>
                          {STATUS_BN[order.status]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── My Orders ── */}
          {activeSection === "orders" && (
            <>
              <div>
                <h1 className="text-3xl font-black tracking-tight">আমার অর্ডার</h1>
                <p className="mt-1 text-muted-foreground font-medium">{orders.length} টি অর্ডার পাওয়া গেছে</p>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[2rem] border bg-card py-24 text-center shadow-sm">
                  <ShoppingBag className="mb-5 h-14 w-14 text-muted-foreground opacity-30" />
                  <h3 className="text-xl font-black">কোনো অর্ডার নেই</h3>
                  <p className="mt-2 text-muted-foreground font-medium">আপনি এখনো কোনো অর্ডার করেননি।</p>
                  <Button asChild className="mt-6 rounded-2xl px-10 h-12 font-black"><Link to="/shop">শপিং শুরু করুন</Link></Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.orderId} className="rounded-[2rem] border bg-card shadow-sm overflow-hidden">
                      {/* Order header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-slate-50/50 px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">অর্ডার আইডি</p>
                            <p className="font-black text-primary text-lg">{order.orderId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`rounded-full border px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${STATUS_BADGE[order.status]}`}>
                            {STATUS_BN[order.status]}
                          </span>
                          <Link
                            to={`/track-order?id=${order.orderId}`}
                            className="rounded-xl border border-primary/20 bg-white px-4 py-2 text-xs font-black text-primary shadow-sm hover:bg-primary/5 transition-colors"
                          >
                            ট্র্যাক করুন
                          </Link>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3 px-6 py-5">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground font-medium">× {item.qty}</p>
                            </div>
                            <p className="font-black text-primary">৳{item.price * item.qty}</p>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t bg-slate-50/50 px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <MapPin className="h-4 w-4" /> {order.division}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground font-bold">সর্বমোট:</span>
                          <span className="text-xl font-black text-primary">৳{order.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Profile Edit ── */}
          {activeSection === "profile" && (
            <>
              <div>
                <h1 className="text-3xl font-black tracking-tight">প্রোফাইল</h1>
                <p className="mt-1 text-muted-foreground font-medium">আপনার তথ্য সম্পাদনা করুন</p>
              </div>
              <div className="rounded-[2rem] border bg-card p-8 shadow-sm">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-widest text-muted-foreground">পূর্ণ নাম</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-12 rounded-2xl bg-slate-50 pl-10 font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-widest text-muted-foreground">মোবাইল নম্বর (পরিবর্তন যোগ্য নয়)</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input value={user.phone} disabled className="h-12 rounded-2xl bg-slate-100 pl-10 font-medium opacity-60" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-widest text-muted-foreground">ইমেইল (ঐচ্ছিক)</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        type="email"
                        placeholder="example@email.com"
                        className="h-12 rounded-2xl bg-slate-50 pl-10 font-medium"
                      />
                    </div>
                  </div>
                </div>
                <Separator className="my-7" />
                <Button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  size="lg"
                  className="h-14 rounded-2xl px-10 font-black shadow-lg"
                >
                  {saving ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> সংরক্ষণ হচ্ছে...</> : <><Check className="mr-2 h-5 w-5" /> পরিবর্তন সংরক্ষণ করুন</>}
                </Button>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
};

export default Account;
