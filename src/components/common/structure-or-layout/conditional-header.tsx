"use client";

import { usePathname } from "next/navigation";

import Header from "./header";

const ConditionalHeader = () => {
  const pathname = usePathname();
  if (pathname === "/checkout") {
    return (
      <>
        <div className="py-2"></div>
      </>
    );
  }
  if (pathname === "/authentication" || pathname === "/identificacao") {
    return <Header withCart={false} />;
  }
  return <Header withCart={true} />;
};

export default ConditionalHeader;
