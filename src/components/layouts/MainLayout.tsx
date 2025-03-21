"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

type MainLayoutProps = {
  children: ReactNode;
  showFooter?: boolean;
  withContainer?: boolean;
  containerClassName?: string;
  contentClassName?: string;
};

export default function MainLayout({
  children,
  showFooter = true,
  withContainer = true,
  containerClassName = "",
  contentClassName = "",
}: MainLayoutProps) {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  return (
    <>
      <Navbar />
      
      <motion.main
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className={`min-h-screen pt-16 ${contentClassName}`}
      >
        {withContainer ? (
          <div className={`container ${containerClassName}`}>{children}</div>
        ) : (
          children
        )}
      </motion.main>
      
      {showFooter && <Footer />}
    </>
  );
} 