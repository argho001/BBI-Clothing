import React from "react";
import Navbar from "./Navbar";
import FooterExpanded from "./FooterExpanded";
import WhatsAppWidget from "./WhatsAppWidget";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterExpanded />
      <WhatsAppWidget />
    </div>
  );
};

export default Layout;
