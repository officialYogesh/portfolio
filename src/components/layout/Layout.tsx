import React from "react";

import { PageTransition } from "../animations/PageTransition";
import { AppLoadingScreen } from "../ui/AppLoadingScreen";

import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppLoadingScreen />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
