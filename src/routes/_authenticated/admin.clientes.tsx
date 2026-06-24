import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/clientes")({
  component: () => <AdminStub title="Clientes" description="Administrar clientes y su historial." phase="la Fase 3" />,
});
