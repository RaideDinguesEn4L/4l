import type { Metadata } from "next";
import AdminApp from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Administration — Raid Dingues en 4L",
  // Page de saisie : elle n'a rien à faire dans les résultats de recherche.
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
