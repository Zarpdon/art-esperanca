"use client";

import { usePathname } from "next/navigation";

import Footer from "./footer";

const ConditionalFooter = () => {
  const pathname = usePathname();
  if (pathname === "/checkout") {
    return (
      <>
        <div className="py-2"></div>
      </>
    );
  }
  return <Footer />;
};

export default ConditionalFooter;
