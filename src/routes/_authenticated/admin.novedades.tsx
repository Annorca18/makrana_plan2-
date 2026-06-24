import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/novedades")({
  component: () => <AdminStub title="Novedades" description="Crear, publicar y ocultar novedades del taller." phase="la Fase 4" />,
});
