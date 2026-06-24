import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/productos")({
  component: () => <AdminStub title="Productos" description="Gestión de productos terminados, kits y materiales." phase="la Fase 2" />,
});
