import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS, COMBOS, getItemPrice, getItemName } from "@/data/products";
import { saveOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, MapPin, Phone, User, ChevronRight, Lock, Truck, ShieldCheck, Loader2 } from "lucide-react";

const DIVISIONS = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল", "সিলেট", "রংপুর", "ময়মনসিংহ",
];

const checkoutSchema = z.object({
  name: z.string().min(2, "সঠিক নাম দিন (কমপক্ষে ২ অক্ষর)"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "বৈধ বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)"),
  address: z.string().min(10, "সম্পূর্ণ ঠিকানা দিন (কমপক্ষে ১০ অক্ষর)"),
  division: z.string().min(1, "বিভাগ নির্বাচন করুন"),
  note: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const DHAKA_INSIDE_FEE = 60;
const DHAKA_OUTSIDE_FEE = 120;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", phone: "", address: "", division: "", note: "" },
  });

  const selectedDivision = form.watch("division");
  const isInsideDhaka = selectedDivision === "ঢাকা";
  const deliveryFee = subtotal >= 2000 ? 0 : isInsideDhaka ? DHAKA_INSIDE_FEE : DHAKA_OUTSIDE_FEE;
  const total = subtotal + deliveryFee;

  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    id,
    name: getItemName(id),
    price: getItemPrice(id),
    qty,
  }));

  const onSubmit = async (data: CheckoutFormData) => {
    if (cartItems.length === 0) return;
    setIsSubmitting(true);
    try {
      const order = await saveOrder({
        name: data.name,
        phone: data.phone,
        address: data.address,
        division: data.division,
        deliveryType: isInsideDhaka ? "inside" : "outside",
        items: cartItems,
        subtotal,
        deliveryFee,
        total,
      });
      clearCart();
      navigate(`/order-success/${order.orderId}`);
    } catch (err) {
      console.error("Order failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-black">কার্ট এখন খালি</h2>
        <p className="text-muted-foreground">চেকআউট করার আগে কার্টে পণ্য যোগ করুন।</p>
        <Button asChild className="rounded-full px-10 h-14 text-lg font-black">
          <Link to="/shop">শপে যান</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Checkout</span>
      </nav>

      <h1 className="mb-10 text-4xl font-black tracking-tight uppercase md:text-5xl">চেকআউট</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* ─── LEFT: Form ─────────────────────────────────── */}
        <div className="lg:col-span-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Customer Info Card */}
              <div className="rounded-[2rem] border bg-card p-8 shadow-md">
                <h2 className="mb-6 flex items-center gap-3 text-xl font-black">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </span>
                  আপনার তথ্য
                </h2>
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">পূর্ণ নাম</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="আপনার পূর্ণ নাম লিখুন"
                            className="h-13 rounded-xl border-slate-200 bg-slate-50 font-medium text-base focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">মোবাইল নম্বর</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              {...field}
                              placeholder="01XXXXXXXXX"
                              className="h-13 rounded-xl border-slate-200 bg-slate-50 font-medium text-base pl-10 focus:border-primary"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Delivery Address Card */}
              <div className="rounded-[2rem] border bg-card p-8 shadow-md">
                <h2 className="mb-6 flex items-center gap-3 text-xl font-black">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                    <MapPin className="h-5 w-5" />
                  </span>
                  ডেলিভারি ঠিকানা
                </h2>
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">বিভাগ</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-13 rounded-xl border-slate-200 bg-slate-50 font-medium text-base focus:border-primary">
                              <SelectValue placeholder="আপনার বিভাগ নির্বাচন করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DIVISIONS.map((d) => (
                              <SelectItem key={d} value={d} className="font-medium">{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">সম্পূর্ণ ঠিকানা</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="বাড়ি নম্বর, রাস্তা, এলাকা, থানা লিখুন..."
                            className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50 font-medium text-base resize-none focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">বিশেষ নোট (ঐচ্ছিক)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="যেমন: রং বা সাইজ সম্পর্কিত নির্দেশনা"
                            className="h-13 rounded-xl border-slate-200 bg-slate-50 font-medium text-base focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="rounded-[2rem] border bg-card p-8 shadow-md">
                <h2 className="mb-6 flex items-center gap-3 text-xl font-black">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  পেমেন্ট পদ্ধতি
                </h2>
                <div className="flex items-center gap-4 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-2xl font-black text-primary">৳</div>
                  <div>
                    <p className="font-black text-lg">ক্যাশ অন ডেলিভারি</p>
                    <p className="text-sm text-muted-foreground font-medium">পণ্য হাতে পেয়ে টাকা দিন</p>
                  </div>
                  <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-primary">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl blur opacity-20" />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="relative h-16 w-full rounded-2xl text-xl font-black shadow-2xl"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> প্রক্রিয়াজাত হচ্ছে...</>
                  ) : (
                    <><Lock className="mr-2 h-5 w-5" /> অর্ডার কনফার্ম করুন — ৳{total}</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* ─── RIGHT: Order Summary ───────────────────────── */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-[2rem] border bg-card p-8 shadow-md">
            <h2 className="mb-6 text-xl font-black flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              অর্ডার সারসংক্ষেপ
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-bold text-sm line-clamp-2">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">পরিমাণ: {item.qty}</p>
                  </div>
                  <span className="font-black text-primary whitespace-nowrap">৳{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold text-muted-foreground">
                <span>সাব-টোটাল</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>ডেলিভারি চার্জ</span>
                </div>
                <span className={deliveryFee === 0 ? "text-emerald-600 font-black" : ""}>
                  {deliveryFee === 0 ? "ফ্রি!" : `৳${deliveryFee}`}
                </span>
              </div>
              {selectedDivision && (
                <p className="text-xs text-muted-foreground bg-slate-50 rounded-xl px-3 py-2 font-medium">
                  {isInsideDhaka ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"} ডেলিভারি চার্জ প্রযোজ্য
                </p>
              )}
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-lg font-black">সর্বমোট</span>
                <span className="text-3xl font-black text-primary">৳{total}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                ১০০% নিরাপদ অর্ডার প্রক্রিয়া
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                <Truck className="h-3.5 w-3.5 text-blue-500" />
                দ্রুততম ডেলিভারি নিশ্চিত
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
