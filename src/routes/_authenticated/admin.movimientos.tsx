import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/movimientos")({
  component: () => <AdminStub title="Movimientos de stock" description="Entradas, salidas, transferencias, ajustes y ventas." phase="la Fase 2" />,
});
