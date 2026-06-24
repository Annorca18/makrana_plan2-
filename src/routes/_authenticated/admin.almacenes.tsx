import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/almacenes")({
  component: () => <AdminStub title="Almacenes" description="Santa Anita, Pueblo Libre y Almacén Feriante." phase="la Fase 2" />,
});
