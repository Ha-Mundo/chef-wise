import { Outlet } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout.tsx";

export default function App() {
  return (
    <DefaultLayout>
      <Outlet /> {/* This will render the page based on the current route */}
    </DefaultLayout>
  );
}
