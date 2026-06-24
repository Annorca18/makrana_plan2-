import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/materiales")({
  component: () => <AdminStub title="Materiales" description="Inventario de materiales con presentaciones (unidad, metro, rollo, docena, ciento...)." phase="la Fase 2" />,
});
