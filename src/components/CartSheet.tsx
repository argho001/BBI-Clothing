import React from "react";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS, COMBOS } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingBag, X, Truck, ShieldCheck, RotateCcw, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const CartSheet = () => {
  const { cart, updateQty, removeFromCart, subtotal, isCartOpen, setCartOpen } = useCart();

  const getProduct = (id: string) => {
    return PRODUCTS.find((p) => p.id === id) || COMBOS.find((c) => c.id === id);
  };

  const cartItems = Object.entries(cart);

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="left" className="flex w-full flex-col p-0 sm:max-w-md">
        <SheetHeader className="border-b p-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-2xl font-black">
              <ShoppingBag className="h-6 w-6 text-primary" />
              আপনার কার্ট
            </SheetTitle>
          </div>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">কার্ট এখন খালি</h3>
            <p className="text-muted-foreground">আপনার পছন্দের পণ্যগুলো কার্টে যোগ করুন।</p>
            <Button asChild onClick={() => setCartOpen(false)} className="mt-4 rounded-full px-8">
              <Link to="/shop">শপিং শুরু করুন</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col gap-6 py-6">
                {cartItems.map(([id, qty]) => {
                  const item = getProduct(id);
                  if (!item) return null;

                  return (
                    <div key={id} className="flex gap-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border bg-muted">
                        <img
                          src={item.img || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold line-clamp-1">{item.name}</h4>
                          <p className="text-sm font-black text-primary">৳{item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border bg-muted/50 p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => updateQty(id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-bold">{qty}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => updateQty(id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Custom Footer implementation to avoid SheetFooter's responsive row collapse */}
            <div className="mt-auto flex flex-col border-t bg-muted/5 p-6 pb-10">
              <div className="mb-6 flex w-full flex-col gap-4">
                {/* Shipping Progress */}
                {subtotal > 0 && (
                  <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm border border-primary/10">
                    <div className="flex items-center justify-between text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Truck className="h-4 w-4" />
                        </div>
                        <span>ফ্রি ডেলিভারি লক্ষ্য</span>
                      </div>
                      <span className="text-primary font-black">
                        {subtotal >= 2000 
                          ? "প্রাপ্ত" 
                          : `আর ৳${2000 - subtotal}`}
                      </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div 
                        className="h-full bg-primary transition-all duration-500 ease-out" 
                        style={{ width: `${Math.min((subtotal / 2000) * 100, 100)}%` }}
                      />
                    </div>
                    {subtotal < 2000 ? (
                      <p className="text-[10px] text-muted-foreground text-center font-medium">
                        ৳২০০০ এর বেশি অর্ডার করলে ডেলিভারি চার্জ একদম ফ্রি!
                      </p>
                    ) : (
                      <div className="flex items-center justify-center gap-1 text-[10px] text-green-600 font-bold">
                        <CheckCircle2 className="h-3 w-3" />
                        অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন
                      </div>
                    )}
                  </div>
                )}
 
                {/* Price Breakdown */}
                <div className="space-y-3 px-1">
                  <div className="flex justify-between text-sm font-bold text-muted-foreground/70">
                    <span>সাব-টোটাল</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-muted-foreground/70">
                    <div className="flex items-center gap-1">
                      <span>ডেলিভারি চার্জ</span>
                      <span className="text-[9px] bg-primary/5 text-primary px-2 py-0.5 rounded-full border border-primary/10">অটোমেটিক</span>
                    </div>
                    <span className={subtotal >= 2000 ? "text-green-600" : ""}>
                      {subtotal >= 2000 ? "ফ্রি" : "অর্ডার অনুযায়ী"}
                    </span>
                  </div>
                  <Separator className="bg-primary/5" />
                  <div className="flex justify-between items-center py-1">
                    <span className="text-lg font-black tracking-tight">সর্বমোট</span>
                    <div className="text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-3xl font-black text-primary">৳{subtotal}</span>
                      </div>
                      <p className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground font-bold">
                        <Lock className="h-2.5 w-2.5" />
                        ব্যক্তিগত তথ্য সুরক্ষিত
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="relative group/btn">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur-md opacity-20 group-hover/btn:opacity-40 transition duration-500"></div>
                <Button asChild size="lg" className="relative h-14 w-full rounded-2xl text-lg font-black shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
                  <Link to="/checkout" onClick={() => setCartOpen(false)} className="flex items-center justify-center gap-2">
                    অর্ডার কনফার্ম করুন
                    <ArrowRight className="h-5 w-5 animate-pulse" />
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-3 gap-0 border-t border-primary/5 pt-6 bg-primary/[0.01] -mx-6 px-6">
                <div className="flex flex-col items-center gap-2.5 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 shadow-sm group-hover:bg-primary/10 transition-colors">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black leading-none text-foreground">নিরাপদ</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-tight">পেমেন্ট</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2.5 text-center border-x border-primary/5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 shadow-sm">
                    <RotateCcw className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black leading-none text-foreground">৭ দিন</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-tight">রিটার্ন</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2.5 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 shadow-sm">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black leading-none text-foreground">দ্রুত</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-tight">ডেলিভারি</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-3">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary/10" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/30">Premium Experience</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary/10" />
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
