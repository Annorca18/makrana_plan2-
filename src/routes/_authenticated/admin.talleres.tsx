import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/talleres")({
  component: () => <AdminStub title="Talleres y cursos" description="Gestionar talleres, cursos e inscripciones." phase="la Fase 4" />,
});
