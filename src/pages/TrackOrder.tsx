import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getOrderById, type Order } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Truck, Search, Package, Phone, MapPin, CheckCircle2, Clock,
  AlertCircle, XCircle, Loader2, ArrowRight
} from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ElementType; description: string }> = {
  pending: {
    label: "পেন্ডিং",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    description: "আপনার অর্ডার পাওয়া গেছে এবং প্রক্রিয়াকরণের অপেক্ষায় রয়েছে।",
  },
  processing: {
    label: "প্রক্রিয়াজাত হচ্ছে",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Package,
    description: "আপনার পণ্য প্যাক করা হচ্ছে এবং শীঘ্রই পাঠানো হবে।",
  },
  shipped: {
    label: "শিপড",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    icon: Truck,
    description: "আপনার পণ্য পথে রয়েছে। শীঘ্রই পৌঁছে যাবে।",
  },
  delivered: {
    label: "ডেলিভারড",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle2,
    description: "আপনার পণ্য সফলভাবে ডেলিভারি হয়েছে। ধন্যবাদ!",
  },
  cancelled: {
    label: "বাতিল",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    description: "আপনার অর্ডারটি বাতিল করা হয়েছে।",
  },
};

const TRACK_STEPS = ["pending", "processing", "shipped", "delivered"] as const;

const TrackOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputId, setInputId] = useState(searchParams.get("id") ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputId.trim()) return;
    setLoading(true);
    setNotFound(false);
    setOrder(null);
    const found = await getOrderById(inputId.trim().toUpperCase());
    setLoading(false);
    if (found) {
      setOrder(found);
      setSearchParams({ id: found.orderId });
    } else {
      setNotFound(true);
    }
  };

  // Auto-search if URL has order ID
  React.useEffect(() => {
    const id = searchParams.get("id");
    if (id) handleSearch();
  }, []);

  const statusConfig = order ? STATUS_CONFIG[order.status as OrderStatus] : null;
  const currentStepIndex = order ? TRACK_STEPS.indexOf(order.status as any) : -1;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
            <Truck className="h-9 w-9" />
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase md:text-5xl">অর্ডার ট্র্যাক</h1>
          <p className="mt-4 text-muted-foreground font-medium">
            আপনার অর্ডার আইডি দিন এবং সর্বশেষ স্ট্যাটাস জানুন।
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={inputId}
                onChange={(e) => setInputId(e.target.value.toUpperCase())}
                placeholder="অর্ডার আইডি লিখুন (যেমন: BBI-12345)"
                className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 font-bold text-base tracking-widest focus:border-primary"
              />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="h-14 rounded-2xl px-8 font-black">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "খুঁজুন"}
            </Button>
          </div>
        </form>

        {/* Not Found */}
        {notFound && (
          <div className="flex flex-col items-center rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center">
            <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
            <h3 className="text-xl font-black text-red-800">অর্ডার খুঁজে পাওয়া যায়নি</h3>
            <p className="mt-2 text-red-600 font-medium">
              "{inputId}" আইডি দিয়ে কোনো অর্ডার পাওয়া যায়নি। সঠিক আইডি লিখুন।
            </p>
          </div>
        )}

        {/* Found Order */}
        {order && statusConfig && (
          <div className="space-y-6">
            {/* Status Banner */}
            <div className={`flex items-center gap-5 rounded-[2rem] border-2 p-7 ${statusConfig.color}`}>
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/50">
                <statusConfig.icon className="h-9 w-9" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-black">{order.orderId}</p>
                  <Badge className={`text-xs font-black uppercase tracking-widest border ${statusConfig.color}`}>
                    {statusConfig.label}
                  </Badge>
                </div>
                <p className="mt-1 font-medium">{statusConfig.description}</p>
              </div>
            </div>

            {/* Progress Tracker */}
            {order.status !== "cancelled" && (
              <div className="rounded-[2rem] border bg-card p-8 shadow-md">
                <h3 className="mb-6 font-black text-lg">ডেলিভারি প্রগতি</h3>
                <div className="flex items-start">
                  {TRACK_STEPS.map((step, i) => {
                    const cfg = STATUS_CONFIG[step];
                    const isCompleted = i <= currentStepIndex;
                    const isCurrent = i === currentStepIndex;
                    return (
                      <div key={step} className="flex flex-1 flex-col items-center relative">
                        {i < TRACK_STEPS.length - 1 && (
                          <div className={`absolute left-1/2 top-5 h-0.5 w-full transition-colors ${i < currentStepIndex ? "bg-primary" : "bg-slate-200"}`} />
                        )}
                        <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                          isCompleted ? "border-primary bg-primary text-white" : "border-slate-200 bg-white"
                        } ${isCurrent ? "shadow-lg shadow-primary/30 scale-110" : ""}`}>
                          {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-xs font-black text-slate-400">{i + 1}</span>}
                        </div>
                        <p className={`mt-3 text-center text-xs font-black ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                          {cfg.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Order Details */}
            <div className="rounded-[2rem] border bg-card p-8 shadow-md">
              <h3 className="mb-5 font-black text-lg">অর্ডার বিবরণ</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <Phone className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">গ্রাহক</p>
                    <p className="font-bold">{order.name}</p>
                    <p className="text-sm text-muted-foreground">{order.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <MapPin className="mt-0.5 h-4 w-4 text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ঠিকানা</p>
                    <p className="font-bold">{order.division}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{order.address}</p>
                  </div>
                </div>
              </div>
              <Separator className="my-5" />
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">× {item.qty}</p>
                    </div>
                    <p className="font-black text-primary">৳{item.price * item.qty}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-black text-xl">
                  <span>সর্বমোট</span>
                  <span className="text-primary">৳{order.total}</span>
                </div>
              </div>
            </div>

            <Button asChild variant="outline" size="lg" className="w-full h-14 rounded-2xl font-black">
              <Link to="/shop" className="flex items-center justify-center gap-2">
                আরও কেনাকাটা করুন <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
