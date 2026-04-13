// ============================================================
// MOCK AUTH LAYER — src/lib/auth.ts
// Simulates user registration/login using localStorage.
// Replace the bodies of these functions with Supabase Auth
// calls when credentials are ready. All types stay the same.
// ============================================================

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
}

const USERS_KEY = "bbi_users";
const SESSION_KEY = "bbi_current_user";

// ── Register ──────────────────────────────────────────────────
export const registerUser = async (
  name: string,
  phone: string,
  password: string,
  email?: string
): Promise<{ user: User | null; error: string | null }> => {
  const users = getAllUsers();

  if (users.find((u) => u.phone === phone)) {
    return { user: null, error: "এই ফোন নম্বরটি ইতিমধ্যেই ব্যবহৃত হয়েছে।" };
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    name,
    phone,
    email,
    createdAt: new Date().toISOString(),
  };

  // Store password separately (hashed in real world)
  const userData = { ...newUser, password };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users.map(u => getUserWithPassword(u.id)), userData]));

  // Auto-login after register
  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  return { user: newUser, error: null };
};

// ── Login ─────────────────────────────────────────────────────
export const loginUser = async (
  phone: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  const raw = localStorage.getItem(USERS_KEY);
  const users: (User & { password: string })[] = raw ? JSON.parse(raw) : [];
  const found = users.find((u) => u.phone === phone && u.password === password);

  if (!found) {
    return { user: null, error: "ফোন নম্বর বা পাসওয়ার্ড ভুল।" };
  }

  const { password: _, ...user } = found;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { user, error: null };
};

// ── Logout ────────────────────────────────────────────────────
export const logoutUser = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

// ── Get current session ───────────────────────────────────────
export const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
};

// ── Update profile ────────────────────────────────────────────
export const updateProfile = async (
  userId: string,
  data: Partial<Pick<User, "name" | "email">>
): Promise<User | null> => {
  const raw = localStorage.getItem(USERS_KEY);
  const users: (User & { password: string })[] = raw ? JSON.parse(raw) : [];
  const updated = users.map((u) => (u.id === userId ? { ...u, ...data } : u));
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));

  // Update session
  const current = getCurrentUser();
  if (current && current.id === userId) {
    const newUser = { ...current, ...data };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return newUser;
  }
  return null;
};

// ── Helpers ───────────────────────────────────────────────────
const getAllUsers = (): User[] => {
  const raw = localStorage.getItem(USERS_KEY);
  const users: (User & { password?: string })[] = raw ? JSON.parse(raw) : [];
  return users.map(({ password: _, ...u }) => u);
};

const getUserWithPassword = (id: string): User & { password: string } => {
  const raw = localStorage.getItem(USERS_KEY);
  const users: (User & { password: string })[] = raw ? JSON.parse(raw) : [];
  return users.find((u) => u.id === id)!;
};
