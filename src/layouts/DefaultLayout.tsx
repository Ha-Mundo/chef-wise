import Header from "@/components/Header";
import "./DefaultLayout.css";

export default function DefaultLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">{children}</main>
    </div>
  );
}
