

# BBI Clothing — Landing Page Rebuild

## Overview
Rebuild the BBI Clothing landing page with a clean, light-themed design while keeping all the core functionality from their current site. Content will be primarily in Bengali as per their existing site.

## Sections (top to bottom)

### 1. Hero Section
- BBI Clothing logo (sourced from their site) centered at top
- Featured product headline: "Original Exported Guess Trouser" with Bengali description
- "100% China Dobbi Fabric — lite and Comfortable" tagline
- CTA button "অডার করতে চাই" (Order Now) scrolling to the order section
- Light, warm background with subtle gradient

### 2. Product Gallery
- Grid of 4 product images showing the trouser colors (Ash, Olive, Khaki, Black)
- Each card shows color name and product code (G301-G304)
- Clean card design with soft shadows on light background
- Images sourced from their current website

### 3. Pricing & Offers
- Offer pricing display in Bengali:
  - ১ পিস - 850৳ / ২ পিস - 1600৳ / ৩ পিস - 2350৳ / ৪ পিস - 3050৳
- Product features/details section with Bengali descriptions (export quality, China dobby fabrics, etc.)

### 4. Size Guide
- Clean table showing sizes L through 4XL with কোমর (waist) and লেন্থ (length) measurements

### 5. Order / Cart Section (Key Feature)
- Product cards with quantity selectors (+/−) for:
  - 4 single items (850৳ each)
  - 6 combo options (1,600৳ each, original 1,700৳ crossed out)
- Running subtotal calculation
- **Billing form**: নাম, ঠিকানা, ফোন নাম্বার, সাইজ dropdown
- **Shipping options**: ঢাকার মধ্যে (70৳) / বাইরে (130৳)
- **Order summary table** showing selected items, subtotal, shipping, and total
- "Cash on Delivery" payment option
- "অর্ডার করুন" (Place Order) button

### 6. Footer
- BBI Clothing logo
- "লেটেস্ট আপডেট পেতে আমাদের সাথে কানেক্ট থাকুন"
- WhatsApp & Messenger contact links
- Phone number: +8801765568317

## Design Direction
- **Light, warm color scheme**: Off-white/cream background (#FAFAF7), soft sage green accents (from their brand green), warm grays for text
- **Typography**: Clean, modern — Hind Siliguri or similar Bengali-supporting font
- **Cards**: White with subtle rounded corners and soft box shadows
- **Buttons**: Soft green primary CTA, rounded
- **Mobile-first responsive layout**

## Technical Notes
- All product images referenced from bbiclothing.com CDN
- Cart logic is client-side state (React useState) — no backend needed
- Order form is display-only (no actual submission endpoint for now)
- Bengali text throughout matching existing site content

