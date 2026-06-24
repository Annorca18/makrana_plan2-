import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/comprobantes")({
  component: () => <AdminStub title="Comprobantes" description="Notas de venta internas con correlativo MKR-000001." phase="la Fase 3" />,
});
