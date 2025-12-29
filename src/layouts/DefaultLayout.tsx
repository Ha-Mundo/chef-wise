import { ReactNode } from "react";
import Header from "@/components/Header";
import "@/styles/DefaultLayout.css";

type DefaultLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">{children}</main>
    </div>
  );
}
