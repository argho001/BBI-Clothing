import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById, type Order } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Phone, MapPin, Truck, Copy, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const STATUS_STEPS = [
  { key: "pending", label: "অর্ডার পেন্ডিং", desc: "আপনার অর্ডার পেয়েছি" },
  { key: "processing", label: "প্রক্রিয়াজাত", desc: "প্যাক করা হচ্ছে" },
  { key: "shipped", label: "শিপড", desc: "পথে আছে" },
  { key: "delivered", label: "ডেলিভারড", desc: "পৌঁছে গেছে!" },
];

const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    getOrderById(orderId).then((o) => {
      setOrder(o);
      setLoading(false);
    });
  }, [orderId]);

  const copyOrderId = () => {
    if (!orderId) return;
    navigator.clipboard.writeText(orderId);
    toast.success("অর্ডার আইডি কপি হয়েছে!");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="font-bold text-muted-foreground">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-20 text-center">
        <h2 className="text-3xl font-black">অর্ডার খুঁজে পাওয়া যায়নি</h2>
        <Button asChild className="rounded-full"><Link to="/shop">শপে ফিরুন</Link></Button>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Success Banner */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 animate-ping rounded-full bg-emerald-500/20" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-14 w-14 text-emerald-500" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">অর্ডার সম্পন্ন হয়েছে!</h1>
          <p className="mt-4 text-lg text-muted-foreground font-medium">
            ধন্যবাদ {order.name}! আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।
          </p>
        </div>

        {/* Order ID Card */}
        <div className="mb-8 flex items-center justify-between rounded-[2rem] border-2 border-primary/20 bg-primary/5 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">আপনার অর্ডার আইডি</p>
            <p className="mt-1 text-3xl font-black text-primary tracking-wider">{order.orderId}</p>
            <p className="mt-1 text-xs text-muted-foreground font-medium">
              এই আইডিটি সংরক্ষণ করুন — অর্ডার ট্র্যাক করতে কাজে লাগবে
            </p>
          </div>
          <button
            onClick={copyOrderId}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-primary/20 bg-white p-4 shadow-sm hover:bg-primary/5 transition-colors"
          >
            <Copy className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-black uppercase text-primary">কপি</span>
          </button>
        </div>

        {/* Tracking Progress */}
        <div className="mb-8 rounded-[2rem] border bg-card p-8 shadow-md">
          <h2 className="mb-6 text-xl font-black">অর্ডার স্ট্যাটাস</h2>
          <div className="flex items-start gap-0">
            {STATUS_STEPS.map((step, i) => {
              const isCompleted = i <= currentStepIndex;
              const isCurrent = i === currentStepIndex;
              return (
                <div key={step.key} className="flex flex-1 flex-col items-center relative">
                  {/* Connector line */}
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`absolute left-1/2 top-5 h-0.5 w-full ${i < currentStepIndex ? "bg-primary" : "bg-slate-200"}`} />
                  )}
                  <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    isCompleted ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-300"
                  } ${isCurrent ? "shadow-lg shadow-primary/30 scale-110" : ""}`}>
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-xs font-black">{i + 1}</span>}
                  </div>
                  <div className="mt-3 text-center">
                    <p className={`text-xs font-black ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>{step.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 hidden md:block">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-[2rem] border bg-card p-6 shadow-md">
            <h3 className="mb-4 flex items-center gap-2 font-black text-base">
              <Phone className="h-4 w-4 text-primary" /> যোগাযোগ তথ্য
            </h3>
            <p className="font-bold">{order.name}</p>
            <p className="text-muted-foreground font-medium">{order.phone}</p>
          </div>
          <div className="rounded-[2rem] border bg-card p-6 shadow-md">
            <h3 className="mb-4 flex items-center gap-2 font-black text-base">
              <MapPin className="h-4 w-4 text-orange-500" /> ডেলিভারি ঠিকানা
            </h3>
            <p className="font-bold">{order.division}</p>
            <p className="text-muted-foreground font-medium text-sm">{order.address}</p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-8 rounded-[2rem] border bg-card p-8 shadow-md">
          <h3 className="mb-6 flex items-center gap-2 font-black text-xl">
            <Package className="h-5 w-5 text-primary" /> অর্ডারকৃত পণ্য
          </h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-medium">পরিমাণ: {item.qty}</p>
                </div>
                <p className="font-black text-primary whitespace-nowrap">৳{item.price * item.qty}</p>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-muted-foreground">
              <span>সাব-টোটাল</span><span>৳{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4" /><span>ডেলিভারি</span></div>
              <span className={order.deliveryFee === 0 ? "text-emerald-600" : ""}>
                {order.deliveryFee === 0 ? "ফ্রি" : `৳${order.deliveryFee}`}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-black text-lg">সর্বমোট</span>
              <span className="font-black text-2xl text-primary">৳{order.total}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="flex-1 h-14 rounded-2xl font-black">
            <Link to={`/track-order?id=${order.orderId}`} className="flex items-center justify-center gap-2">
              <Truck className="h-5 w-5" /> অর্ডার ট্র্যাক করুন
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1 h-14 rounded-2xl font-black">
            <Link to="/shop" className="flex items-center justify-center gap-2">
              আরও শপিং করুন <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
