import React, { useEffect, useState, useMemo } from "react";
import { getAllOrders, updateOrderStatus, type Order, type OrderStatus } from "@/lib/api";
import { Search, Filter, RefreshCw, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string }[] = [
  { value: "pending",    label: "পেন্ডিং",         color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { value: "processing", label: "প্রক্রিয়াজাত",  color: "bg-blue-100 text-blue-800 border-blue-200" },
  { value: "shipped",    label: "শিপড",             color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  { value: "delivered",  label: "ডেলিভারড",        color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  { value: "cancelled",  label: "বাতিল",            color: "bg-red-100 text-red-800 border-red-200" },
];

const getStatusCfg = (status: string) =>
  STATUS_OPTIONS.find((o) => o.value === status) ?? STATUS_OPTIONS[0];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setOrders(await getAllOrders());
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = useMemo(() => {
    return orders
      .filter((o) => filterStatus === "all" || o.status === filterStatus)
      .filter((o) =>
        !searchQuery ||
        o.orderId.includes(searchQuery.toUpperCase()) ||
        o.name.includes(searchQuery) ||
        o.phone.includes(searchQuery)
      );
  }, [orders, searchQuery, filterStatus]);

  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, status);
    setOrders((prev) => prev.map((o) => (o.orderId === orderId ? { ...o, status } : o)));
    if (selectedOrder?.orderId === orderId) setSelectedOrder((prev) => prev ? { ...prev, status } : null);
    setUpdatingId(null);
    toast.success(`অর্ডার ${orderId} আপডেট হয়েছে!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">অর্ডার ব্যবস্থাপনা</h1>
          <p className="mt-1 text-muted-foreground font-medium">{filtered.length} টি অর্ডার পাওয়া গেছে</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 rounded-2xl border bg-white px-5 py-2.5 text-sm font-black shadow-sm hover:border-primary/30 hover:bg-primary/5 transition-colors"
        >
          <RefreshCw className="h-4 w-4" /> রিফ্রেশ
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="অর্ডার আইডি, নাম বা ফোন দিয়ে খুঁজুন..."
            className="h-11 rounded-2xl border-slate-200 bg-white pl-10 font-medium"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-11 w-full rounded-2xl border-slate-200 bg-white font-bold sm:w-52">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-bold">সব অর্ডার</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value} className="font-bold">{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-[2rem] border bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="space-y-4 p-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 w-full animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
            <p className="font-bold text-lg">কোনো অর্ডার পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-black uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 text-left">অর্ডার আইডি</th>
                  <th className="px-6 py-4 text-left">গ্রাহক</th>
                  <th className="px-6 py-4 text-left">বিভাগ</th>
                  <th className="px-6 py-4 text-right">মোট</th>
                  <th className="px-6 py-4 text-center">স্ট্যাটাস পরিবর্তন</th>
                  <th className="px-6 py-4 text-center">বিবরণ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((order) => {
                  const cfg = getStatusCfg(order.status);
                  return (
                    <tr key={order.orderId} className="transition-colors hover:bg-slate-50">
                      <td className="px-6 py-4 font-black text-primary tracking-wider">{order.orderId}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold">{order.name}</p>
                        <p className="text-xs text-muted-foreground">{order.phone}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-muted-foreground">{order.division}</td>
                      <td className="px-6 py-4 text-right font-black">৳{order.total}</td>
                      <td className="px-6 py-4">
                        <Select
                          value={order.status}
                          onValueChange={(v) => handleStatusUpdate(order.orderId, v as OrderStatus)}
                          disabled={updatingId === order.orderId}
                        >
                          <SelectTrigger className={`h-9 rounded-full border text-xs font-black px-3 ${cfg.color}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((s) => (
                              <SelectItem key={s.value} value={s.value} className="font-bold text-sm">{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-xl border bg-white px-3 py-1.5 text-xs font-black shadow-sm transition-all hover:border-primary/30 hover:text-primary"
                        >
                          দেখুন
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg rounded-[2rem]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl font-black">
                  {selectedOrder.orderId}
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getStatusCfg(selectedOrder.status).color}`}>
                    {getStatusCfg(selectedOrder.status).label}
                  </span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-5 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">গ্রাহকের নাম</p>
                    <p className="mt-1 font-bold">{selectedOrder.name}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ফোন নম্বর</p>
                    <p className="mt-1 font-bold">{selectedOrder.phone}</p>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ডেলিভারি ঠিকানা</p>
                    <p className="mt-1 font-bold">{selectedOrder.division}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.address}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="mb-3 text-xs font-black uppercase tracking-widest text-muted-foreground">অর্ডারকৃত পণ্য</p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5">
                        <div>
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">× {item.qty}</p>
                        </div>
                        <p className="font-black text-primary">৳{item.price * item.qty}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between rounded-2xl bg-primary/5 px-5 py-4">
                  <span className="font-black text-lg">সর্বমোট</span>
                  <span className="font-black text-2xl text-primary">৳{selectedOrder.total}</span>
                </div>
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-widest text-muted-foreground">স্ট্যাটাস আপডেট করুন</p>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(v) => handleStatusUpdate(selectedOrder.orderId, v as OrderStatus)}
                  >
                    <SelectTrigger className="h-12 w-full rounded-2xl font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s.value} value={s.value} className="font-bold">{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
