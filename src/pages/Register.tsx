import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { registerUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Phone, Lock, User, Mail, Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "সঠিক নাম দিন (কমপক্ষে ২ অক্ষর)"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "বৈধ মোবাইল নম্বর দিন (01XXXXXXXXX)"),
  email: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal("")),
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "পাসওয়ার্ড মিলছে না",
  path: ["confirmPassword"],
});
type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    const { user, error: err } = await registerUser(data.name, data.phone, data.password, data.email || undefined);
    if (err || !user) {
      setError(err ?? "নিবন্ধন ব্যর্থ হয়েছে।");
      return;
    }
    login(user);
    toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে! স্বাগতম!");
    navigate("/account");
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tight uppercase">নিবন্ধন</h1>
          <p className="mt-3 text-muted-foreground font-medium">
            একটি নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[2.5rem] border bg-card p-8 shadow-xl">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-sm font-bold text-red-700">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest">পূর্ণ নাম</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input {...field} placeholder="আপনার পূর্ণ নাম" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium" />
                      </div>
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
                    <FormLabel className="text-xs font-black uppercase tracking-widest">মোবাইল নম্বর</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input {...field} placeholder="01XXXXXXXXX" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest">ইমেইল (ঐচ্ছিক)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input {...field} type="email" placeholder="example@email.com" className="h-12 rounded-xl bg-slate-50 pl-10 font-medium" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest">পাসওয়ার্ড</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPass ? "text" : "password"}
                          placeholder="কমপক্ষে ৬ অক্ষর"
                          className="h-12 rounded-xl bg-slate-50 pl-10 pr-11 font-medium"
                        />
                        <button type="button" onClick={() => setShowPass((p) => !p)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest">পাসওয়ার্ড নিশ্চিত করুন</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPass ? "text" : "password"}
                          placeholder="আবার পাসওয়ার্ড লিখুন"
                          className="h-12 rounded-xl bg-slate-50 pl-10 font-medium"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="h-14 w-full rounded-2xl text-lg font-black shadow-2xl shadow-primary/20"
                >
                  {form.formState.isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> প্রক্রিয়াজাত হচ্ছে...</>
                  ) : (
                    <><ArrowRight className="mr-2 h-5 w-5" /> অ্যাকাউন্ট তৈরি করুন</>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              ইতিমধ্যেই অ্যাকাউন্ট আছে?{" "}
              <Link to="/login" className="font-black text-primary hover:underline">
                লগইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
