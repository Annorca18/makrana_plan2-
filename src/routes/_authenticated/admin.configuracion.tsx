import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/configuracion")({
  component: () => <AdminStub title="Configuración" description="Datos de la marca, usuarios internos y preferencias." phase="la Fase 5" />,
});
