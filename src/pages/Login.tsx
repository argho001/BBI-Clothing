import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Phone, Lock, Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  phone: z.string().regex(/^01[3-9]\d{8}$/, "বৈধ মোবাইল নম্বর দিন (01XXXXXXXXX)"),
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
});
type FormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { phone: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    const { user, error: err } = await loginUser(data.phone, data.password);
    if (err || !user) {
      setError(err ?? "লগইন ব্যর্থ হয়েছে।");
      return;
    }
    login(user);
    toast.success(`স্বাগতম, ${user.name}!`);
    navigate("/account");
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tight uppercase">লগইন</h1>
          <p className="mt-3 text-muted-foreground font-medium">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-black uppercase tracking-widest">মোবাইল নম্বর</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input {...field} placeholder="01XXXXXXXXX" className="h-13 rounded-xl bg-slate-50 pl-10 font-medium text-base" />
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
                          placeholder="পাসওয়ার্ড লিখুন"
                          className="h-13 rounded-xl bg-slate-50 pl-10 pr-11 font-medium text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass((p) => !p)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
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
                    <><ArrowRight className="mr-2 h-5 w-5" /> লগইন করুন</>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              অ্যাকাউন্ট নেই?{" "}
              <Link to="/register" className="font-black text-primary hover:underline">
                নিবন্ধন করুন
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground font-medium">
          অর্ডার ট্র্যাক করতে চান?{" "}
          <Link to="/track-order" className="font-black text-primary hover:underline">
            এখানে ক্লিক করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
