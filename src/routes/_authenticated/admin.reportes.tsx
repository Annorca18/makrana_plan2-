import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/reportes")({
  component: () => <AdminStub title="Reportes" description="Ventas, stock, materiales más usados, talleres con más inscritos." phase="la Fase 5" />,
});
