// ============================================================
// MOCK API LAYER — src/lib/api.ts
// This file simulates a real backend using localStorage.
// When Supabase/Firebase credentials are ready, replace the
// body of these functions with real API calls. All types stay
// the same; no other file needs to change.
// ============================================================

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  division: string;
  deliveryType: "inside" | "outside";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string; // ISO string
}

const ORDERS_KEY = "bbi_orders";

const generateOrderId = (): string => {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `BBI-${num}`;
};

// ── Save a new order ──────────────────────────────────────────
export const saveOrder = async (orderData: Omit<Order, "orderId" | "createdAt" | "status">): Promise<Order> => {
  const existing = getAllOrdersSync();
  const newOrder: Order = {
    ...orderData,
    orderId: generateOrderId(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(ORDERS_KEY, JSON.stringify([newOrder, ...existing]));
  return newOrder;
};

// ── Get single order by ID ────────────────────────────────────
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const all = getAllOrdersSync();
  return all.find((o) => o.orderId === orderId) ?? null;
};

// ── Get all orders (for admin) ────────────────────────────────
export const getAllOrders = async (): Promise<Order[]> => {
  return getAllOrdersSync();
};

// ── Update order status (admin action) ───────────────────────
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  const all = getAllOrdersSync();
  const updated = all.map((o) => (o.orderId === orderId ? { ...o, status } : o));
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
};

// ── Internal helper (sync) ────────────────────────────────────
const getAllOrdersSync = (): Order[] => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
