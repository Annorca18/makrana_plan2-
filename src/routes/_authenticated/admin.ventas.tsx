import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/ventas")({
  component: () => <AdminStub title="Ventas" description="Registrar ventas, descontar stock del almacén y generar comprobante." phase="la Fase 3" />,
});
