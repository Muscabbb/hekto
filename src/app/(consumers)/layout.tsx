import React from "react";

import ClientNavBar from "./components/ClientNavBar";

export default function ConsumersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ClientNavBar />
      <div>{children}</div>
    </>
  );
}
