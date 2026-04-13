import React, { useEffect, useState } from "react";
import { getAllOrders, type Order } from "@/lib/api";
import { ShoppingBag, TrendingUp, Users, Package, ArrowUp } from "lucide-react";

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders().then((o) => {
      setOrders(o);
      setLoading(false);
    });
  }, []);

  const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const uniqueCustomers = new Set(orders.map((o) => o.phone)).size;

  const STATUS_BADGE: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const STATUS_BN: Record<string, string> = {
    pending: "পেন্ডিং",
    processing: "প্রক্রিয়াজাত",
    shipped: "শিপড",
    delivered: "ডেলিভারড",
    cancelled: "বাতিল",
  };

  const STAT_CARDS = [
    { label: "মোট রেভেনিউ", value: `৳${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
    { label: "মোট অর্ডার", value: totalOrders, icon: ShoppingBag, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "পেন্ডিং অর্ডার", value: pendingOrders, icon: Package, color: "text-yellow-600", bg: "bg-yellow-100" },
    { label: "গ্রাহক সংখ্যা", value: uniqueCustomers, icon: Users, color: "text-emerald-600", bg: "bg-emerald-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">ড্যাশবোর্ড</h1>
        <p className="mt-1 text-muted-foreground font-medium">BBI Clothing — সামগ্রিক পরিসংখ্যান</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((card, i) => (
          <div key={i} className="rounded-[2rem] border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${card.bg} ${card.color}`}>
              <card.icon className="h-6 w-6" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{card.label}</p>
            {loading ? (
              <div className="mt-2 h-8 w-24 animate-pulse rounded-lg bg-slate-100" />
            ) : (
              <p className="mt-1 text-3xl font-black">{card.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-[2rem] border bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b px-8 py-5">
          <h2 className="font-black text-xl">সাম্প্রতিক অর্ডার</h2>
          <a href="/admin/orders" className="text-sm font-black text-primary hover:underline flex items-center gap-1">
            সব দেখুন <ArrowUp className="h-4 w-4 rotate-45" />
          </a>
        </div>
        {loading ? (
          <div className="space-y-4 p-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 w-full animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <ShoppingBag className="mb-4 h-12 w-12 opacity-30" />
            <p className="font-bold">এখনো কোনো অর্ডার নেই</p>
            <p className="text-sm mt-1">গ্রাহকরা অর্ডার দিলে এখানে দেখা যাবে</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-black uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 text-left">অর্ডার আইডি</th>
                  <th className="px-6 py-4 text-left">গ্রাহক</th>
                  <th className="px-6 py-4 text-left">পণ্য</th>
                  <th className="px-6 py-4 text-right">মোট</th>
                  <th className="px-6 py-4 text-center">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.slice(0, 8).map((order) => (
                  <tr key={order.orderId} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 font-black text-primary">{order.orderId}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold">{order.name}</p>
                      <p className="text-muted-foreground">{order.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{order.items.length} টি পণ্য</td>
                    <td className="px-6 py-4 text-right font-black">৳{order.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${STATUS_BADGE[order.status]}`}>
                        {STATUS_BN[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
